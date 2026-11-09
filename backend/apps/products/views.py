from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Category, Product, Wishlist
from .serializers import CategorySerializer, ProductSerializer, WishlistSerializer

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Public read-only API endpoint for product categories.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Public read-only API endpoint for luxury inventory items.
    Optimized to reduce database overhead.
    """
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        # Using select_related avoids the N+1 query trap on cPanel by fetching 
        # categories and products in a single optimized JOIN statement.
        queryset = Product.objects.filter(is_active=True).select_related('category')
        
        # Simple dynamic filtering queries: e.g., /api/v1/products/?category_slug=wigs
        category_slug = self.request.query_params.get('category_slug', None)
        if category_slug is not None:
            queryset = queryset.filter(category__slug=category_slug)
            
        return queryset

class WishlistViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request):
        """Maps directly to GET /api/v1/products/wishlist/"""
        wishlist_items = Wishlist.objects.filter(user=request.user).order_by('-created_at')
        serializer = WishlistSerializer(wishlist_items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request):
        """Maps directly to POST /api/v1/products/wishlist/"""
        product_id = request.data.get('product_id')
        
        if not product_id:
            return Response({"error": "Missing product_id"}, status=status.HTTP_400_BAD_REQUEST)
            
        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

        wishlist_entry = Wishlist.objects.filter(user=request.user, product=product)

        if wishlist_entry.exists():
            wishlist_entry.delete()
            return Response({"favorited": False, "message": "Removed from wishlist"}, status=status.HTTP_200_OK)
        else:
            Wishlist.objects.create(user=request.user, product=product)
            return Response({"favorited": True, "message": "Added to wishlist"}, status=status.HTTP_201_CREATED)