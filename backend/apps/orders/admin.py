from django.contrib import admin
from django.utils.html import format_html
from unfold.admin import ModelAdmin, TabularInline
from .models import Order, OrderItem

class OrderItemInline(TabularInline):
    model = OrderItem
    extra = 0
    fields = ('product', 'quantity', 'price_at_purchase')

@admin.register(Order)
class OrderAdmin(ModelAdmin):
    list_display = ('order_number_display', 'user', 'status_badge', 'total_amount_display', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('user__username', 'id')
    
    fields = ('user', 'status', 'total_amount')
    inlines = [OrderItemInline]

    def order_number_display(self, obj):
        return obj.order_number
    order_number_display.short_description = 'Order Number'

    def total_amount_display(self, obj):
        return f"{obj.total_amount} ETB"
    total_amount_display.short_description = 'Total Amount'

    def status_badge(self, obj):
        colors = {
            'Processing': ('#1e3a8a', '#3b82f6'),
            'Shipped': ('#3b0764', '#a855f7'),
            'Delivered': ('#064e3b', '#10b981'),
            'Cancelled': ('#450a0a', '#ef4444'),
        }
        bg, text = colors.get(obj.status, ('#1f2937', '#9ca3af'))
        return format_html(
            '<span style="background: {}; color: {}; padding: 4px 10px; '
            'border-radius: 6px; font-size: 11px; font-weight: 700; text-transform: uppercase;">{}</span>',
            bg, text, obj.status
        )
    status_badge.short_description = 'Status'

    def save_related(self, request, form, formsets, change):
        super().save_related(request, form, formsets, change)
        order = form.instance
        calculated_total = sum(item.price_at_purchase * item.quantity for item in order.items.all())
        if calculated_total > 0 and order.total_amount != calculated_total:
            order.total_amount = calculated_total
            order.save()