from rest_framework import serializers
from .models import Order, OrderItem
from apps.products.models import Product

# --- 1. READ SERIALIZERS (For fetching history and invoice cards) ---

class OrderItemSerializer(serializers.ModelSerializer):
    # Dynamically grabs the product title using your working model property
    product_title = serializers.CharField(source='product.title', read_only=True)

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_title', 'quantity', 'price_at_purchase']


class OrderListSerializer(serializers.ModelSerializer):
    order_number = serializers.CharField(read_only=True)
    total_items = serializers.SerializerMethodField()
    # Explicitly nests the detailed items layout when looking at individual orders
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'order_number', 'status', 'total_amount', 'created_at', 'total_items', 'items']

    def get_total_items(self, obj):
        return sum(item.quantity for item in obj.items.all())


# --- 2. WRITE SERIALIZERS (For processing incoming cart array submissions) ---

class OrderItemSubmitSerializer(serializers.ModelSerializer):
    product_id = serializers.IntegerField(write_only=True)
    quantity = serializers.IntegerField(min_value=1)

    class Meta:
        model = OrderItem
        fields = ['product_id', 'quantity']


class OrderCreateSerializer(serializers.ModelSerializer):
    items = OrderItemSubmitSerializer(many=True, write_only=True)

    class Meta:
        model = Order
        fields = ['id', 'items', 'total_amount', 'status', 'created_at']
        read_only_fields = ['id', 'total_amount', 'status', 'created_at']

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        user = self.context['request'].user

        # Initialize base order row securely
        order = Order.objects.create(user=user, status='Processing', total_amount=0.00)
        running_total = 0.00

        # Loop through cart items to snapshot live inventory prices
        for item_data in items_data:
            try:
                product = Product.objects.get(id=item_data['product_id'], is_active=True)
            except Product.DoesNotExist:
                raise serializers.ValidationError(
                    {"error": f"Product with ID {item_data['product_id']} is unavailable."}
                )

            quantity = item_data['quantity']
            item_price = product.price
            running_total += float(item_price) * quantity

            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=quantity,
                price_at_purchase=item_price
            )

        # Update final calculated order bill amount
        order.total_amount = running_total
        order.save()
        return order