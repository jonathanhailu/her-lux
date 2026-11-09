from django.db import models
from django.conf import settings

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)  # e.g., "Wigs", "Bundles", "Lace Closures"
    slug = models.SlugField(max_length=100, unique=True, blank=True, null=True)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name


class Product(models.Model):
    category = models.ForeignKey('Category', on_delete=models.CASCADE, related_name='products')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    
    # Hair Specifics
    length_inches = models.PositiveIntegerField()
    lace_type = models.CharField(max_length=100, blank=True, null=True)
    
    # Price & Stock
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField(default=5)
    
    # Native File Assets
    primary_image = models.ImageField(upload_to='products/%Y/%m/', max_length=500)
    
    # Status Toggles
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} - {self.length_inches}\""


class Wishlist(models.Model):
    """Bridges a Telegram user to the luxury hair products they have favorited."""
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name="wishlist_items"
    )
    product = models.ForeignKey(
        'Product', 
        on_delete=models.CASCADE, 
        related_name="favorited_by"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        # Prevents a customer from adding the exact same wig to their wishlist twice
        unique_together = ('user', 'product')

    def __str__(self):
        return f"{self.user.username} favorited {self.product.title}"