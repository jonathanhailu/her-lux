from django.apps import AppConfig

class OrdersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.orders'
    # 🚀 This changes the header name in your admin sidebar!
    verbose_name = 'Client Management'