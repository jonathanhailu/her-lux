from django.contrib import admin
from unfold.admin import ModelAdmin
from .models import TelegramUser

@admin.register(TelegramUser)
class TelegramUserAdmin(ModelAdmin):
    list_display = ('telegram_id', 'username', 'first_name', 'is_staff', 'created_at')
    list_filter = ('is_staff', 'is_superuser', 'created_at')
    search_fields = ('telegram_id', 'username', 'first_name')
    ordering = ('-created_at',)

    fieldsets = (
        ('Telegram Identity', {
            'fields': ('telegram_id', 'username', 'first_name'),
        }),
        ('Permissions', {
            'fields': ('is_active', 'is_staff', 'is_superuser'),
        }),
    )