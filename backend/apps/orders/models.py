from django.db import models
from django.conf import settings
from apps.products.models import Product

class Order(models.Model):
    STATUS_CHOICES = [
        ('Processing', 'Processing'),
        ('Shipped', 'Shipped'),
        ('Delivered', 'Delivered'),
        ('Cancelled', 'Cancelled'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT, related_name="orders")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Processing')
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    created_at = models.DateField(auto_now_add=True)

    @property
    def order_number(self):
        if self.id is None:
            return "ORD-PENDING"
        return f"ORD-{1000 + self.id}"

    def __str__(self):
        return f"{self.order_number} - {self.user.username} ({self.status})"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    quantity = models.PositiveIntegerField(default=1)
    
    # 💡 ALLOWS blank in the admin form, but defaults to 0.00 to protect math functions
    price_at_purchase = models.DecimalField(max_digits=10, decimal_places=2, default=0.00, blank=True)

    def save(self, *args, **kwargs):
        """🚀 AUTO-SNAPSHOT PRICE

        If left blank (or 0) in the admin panel, pull the live price directly 
        from the product catalog right before saving to the database.
        """
        if (self.price_at_purchase == 0.00 or not self.price_at_purchase) and self.product:
            # Assuming your Product model uses '.price'. Change to your exact field if different!
            self.price_at_purchase = getattr(self.product, 'price', 0.00)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.quantity}x {self.product.title if self.product else 'Deleted Product'}"