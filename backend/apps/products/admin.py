from django.contrib import admin
from django.utils.safestring import mark_safe
from unfold.admin import ModelAdmin
from .models import Category, Product, Wishlist

class CategoryAdmin(ModelAdmin):
    list_display = ('id', 'name', 'slug')
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name',)
    list_fullwidth = True


class ProductAdmin(ModelAdmin):
    # Custom dashboard table columns layout
    list_display = ('display_product_thumbnail', 'title', 'category', 'length_inches', 'price_display', 'stock_badge', 'is_active')
    list_filter = ('category', 'is_active', 'length_inches')
    search_fields = ('title', 'description', 'lace_type')
    list_editable = ('is_active',)
    ordering = ('-created_at',)
    
    list_fullwidth = True
    compressed_fields = True 
    warn_unsaved_form = True 
    
    # Detail View Form Segment Separation
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'category', 'description')
        }),
        ('Hair Specification Details', {
            'fields': ('length_inches', 'lace_type'),
        }),
        ('Inventory & Pricing Control', {
            'fields': ('price', 'stock')
        }),
        ('Media Asset Control', {
            'fields': ('primary_image',)
        }),
    )

    # --- Presentation Display Methods ---

    def display_product_thumbnail(self, obj):
        if obj.primary_image:
            return mark_safe(
                f'<img src="{obj.primary_image.url}" style="width: 42px; height: 42px; object-fit: cover; border-radius: 8px; border: 1px solid rgba(212,163,89,0.3);" />'
            )
        return mark_safe(
            '<div style="width: 42px; height: 42px; border-radius: 8px; background: #222; display: flex; align-items: center; justify-content: center; font-size: 10px; color: #555;">No Img</div>'
        )
    display_product_thumbnail.short_description = "Image Thumbnail"

    def price_display(self, obj):
        return mark_safe(f'<span class="text-primary-500 font-semibold">{obj.price:,.2f} ETB</span>')
    price_display.short_description = "Price"

    def stock_badge(self, obj):
        if obj.stock == 0:
            return mark_safe(
                '<span style="background: rgba(239,68,68,0.2); color: #ef4444; padding: 4px 10px; border-radius: 9999px; font-size: 11px; font-weight: 600;">Out of Stock</span>'
            )
        elif obj.stock <= 2:
            return mark_safe(
                f'<span style="background: rgba(245,158,11,0.2); color: #f59e0b; padding: 4px 10px; border-radius: 9999px; font-size: 11px; font-weight: 600;">Running Low ({obj.stock})</span>'
            )
        return mark_safe(
            f'<span style="background: rgba(16,185,129,0.2); color: #10b981; padding: 4px 10px; border-radius: 9999px; font-size: 11px; font-weight: 600;">{obj.stock} Available</span>'
        )
    stock_badge.short_description = "Stock Level"


class WishlistAdmin(ModelAdmin):
    list_display = ('user_display', 'product_title_display', 'price_display', 'created_at_display')
    list_filter = ('created_at', 'product__title')
    search_fields = ('user__username', 'product__title')
    fields = ('user', 'product')

    def get_autocomplete_fields(self, request):
        return []

    def has_change_permission(self, request, obj=None):
        return True
        
    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        form_field = super().formfield_for_foreignkey(db_field, request, **kwargs)
        if db_field.name in ['user', 'product']:
            form_field.widget.can_add_related = False
            form_field.widget.can_change_related = False
            form_field.widget.can_delete_related = False
            form_field.widget.can_view_related = False
        return form_field

    # --- Clean Grid String Mappings ---

    def user_display(self, obj):
        return obj.user.username
    user_display.short_description = 'Customer'

    def product_title_display(self, obj):
        return obj.product.title
    product_title_display.short_description = 'Luxury Product'

    def price_display(self, obj):
        return f"{obj.product.price:,.2f} ETB"
    price_display.short_description = 'Storefront Price'

    def created_at_display(self, obj):
        return obj.created_at.strftime("%B %d, %Y - %I:%M %p")
    created_at_display.short_description = 'Saved On'


# --- UNIFIED EXPLICIT REGISTRATION BLOCK ---
admin.site.register(Category, CategoryAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(Wishlist, WishlistAdmin)