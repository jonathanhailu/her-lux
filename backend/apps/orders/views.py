from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Order
from .serializers import OrderListSerializer, OrderCreateSerializer

class OrderViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Filters down orders strictly to the logged-in client."""
        return Order.objects.filter(user=self.request.user).order_by('-id')

    def get_serializer_class(self):
        """Smart router picking the right serializer block for the job."""
        if self.action == 'create':
            return OrderCreateSerializer
        return OrderListSerializer 

    def create(self, request, *args, **kwargs):
        """Processes shopping cart array checkouts safely."""
        serializer = self.get_serializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            order = serializer.save()
            return Response(
                {
                    "message": "Order placed successfully",
                    "order_id": order.id,
                    "order_number": order.order_number,
                    "total_amount": f"{order.total_amount} ETB"
                }, 
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)