from django.urls import path
from apps.authentication.views import TelegramAuthView

urlpatterns = [
    path('telegram/', TelegramAuthView.as_view(), name='telegram_auth'),
]