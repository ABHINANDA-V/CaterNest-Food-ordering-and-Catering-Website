from rest_framework import generics, permissions
from rest_framework.permissions import IsAuthenticated
from .models import Cart
from .serializers import CartSerializer
from rest_framework.exceptions import ValidationError

#  All cart items of logged-in user
class CartListView(generics.ListAPIView):
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user)


#   add item to cart
class CartCreateView(generics.CreateAPIView):
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        food_item = serializer.validated_data.get('food_item')
        quantity = serializer.validated_data.get('quantity', 1)

        if not food_item:
            raise ValidationError({"error": "food_item is required"})

        # Check if item already exists
        cart_item, created = Cart.objects.get_or_create(
            user=self.request.user,
            food_item=food_item
        )

        if not created:
            cart_item.quantity += quantity
        else:
            cart_item.quantity = quantity

        cart_item.save()


# update quantity
class CartUpdateView(generics.UpdateAPIView):
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # ensure user can update only their cart
        return Cart.objects.filter(user=self.request.user)


#  remove item
class CartDeleteView(generics.DestroyAPIView):
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        #  ensure user can delete only their cart
        return Cart.objects.filter(user=self.request.user)