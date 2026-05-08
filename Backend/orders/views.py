from rest_framework import generics, permissions,status
from rest_framework.response import Response
from django.db import transaction
from rest_framework.views import APIView

from .models import Order, OrderItem
from menu.models import FoodItem
from .serializers import OrderSerializer
from cart.models import Cart
from users.models import User
from rest_framework.permissions import IsAdminUser


class PlaceOrderView(APIView):

    def post(self, request):
        user = request.user
        data = request.data
        payment_method = data.get('payment_method', 'cod')
        address = data.get('address')
        phone = data.get('phone')
        items = data.get('items', [])  

        if not items:
            return Response({'error': 'No items in order'}, status=status.HTTP_400_BAD_REQUEST)

        # calculate total price
        total_price = 0
        for item in items:
            try:
                food = FoodItem.objects.get(id=item['food_item'])
            except FoodItem.DoesNotExist:
                return Response({'error': f"Food item {item['food_item']} does not exist"}, status=status.HTTP_400_BAD_REQUEST)
            total_price += food.price * item['quantity']

        
        order_status = 'Pending'

        # create order
        order = Order.objects.create(
            user=user,
            total_price=total_price,
            payment_method=payment_method,
            status='Pending',
            address=address,
            phone=phone
        )

        # create order items
        for item in items:
            food = FoodItem.objects.get(id=item['food_item'])
            OrderItem.objects.create(
                order=order,
                food_item=food,
                quantity=item['quantity'],
                price=food.price
            )

        return Response({'message': 'Order placed successfully', 'order_id': order.id}, status=status.HTTP_201_CREATED)


class OrderListView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

    def get_serializer_context(self):
        return {'request': self.request}

class OrderDetailView(generics.RetrieveAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_context(self):
        return {'request': self.request}    

# Assign delivery boy (Admin only)
class AssignDeliveryView(generics.UpdateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAdminUser]


# Delivery boy updates status
class UpdateOrderStatusView(generics.UpdateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(delivery_boy=self.request.user)    
    

class AdminOrderListView(generics.ListAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAdminUser]

    def get_serializer_context(self):
        return {'request': self.request}
    

class AdminUpdateOrderStatusView(generics.UpdateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAdminUser]
