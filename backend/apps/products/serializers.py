from rest_framework import serializers
from .models import Category, Product,Wishlist

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']

class ProductSerializer(serializers.ModelSerializer):
    # 🚀 FIX: Turn this into a SerializerMethodField so the frontend doesn't break
    primary_image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        # Include all your existing product catalog fields here
        fields = [
            'id', 'category', 'title', 'description', 
            'length_inches', 'lace_type', 'price', 'stock', 
            'primary_image', 'is_active', 'created_at'
        ]

    def get_primary_image(self, obj):
        if obj.primary_image:
            request = self.context.get('request')
            if request is not None:
                return request.build_absolute_uri(obj.primary_image.url)
            return obj.primary_image.url
        return None


# Keep your working ProductSnapshotSerializer and WishlistSerializer right below this!
class ProductSnapshotSerializer(serializers.ModelSerializer):
    primary_image_url = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'title', 'price', 'primary_image_url', 'length_inches', 'lace_type']

    def get_primary_image_url(self, obj):
        if obj.primary_image:
            request = self.context.get('request')
            if request is not None:
                return request.build_absolute_uri(obj.primary_image.url)
            return obj.primary_image.url
        return None

class WishlistSerializer(serializers.ModelSerializer):
    product_details = ProductSnapshotSerializer(source='product', read_only=True)

    class Meta:
        model = Wishlist
        fields = ['id', 'product', 'product_details', 'created_at']