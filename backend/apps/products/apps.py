from django.apps import AppConfig

class ProductsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.products'
    # 🚀 This changes the header name in your admin sidebar!
    verbose_name = 'Luxury Inventory'