from rest_framework import serializers
from .models import Order, OrderItem


class OrderItemSerializer(serializers.ModelSerializer):
    food_name = serializers.CharField(source='food_item.name',read_only=True)
    food_image = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = ['id', 'food_name', 'food_image', 'quantity', 'price']

    def get_food_image(self, obj):
        request = self.context.get('request')
        if obj.food_item.image:
            return request.build_absolute_uri(obj.food_item.image.url)
        return None

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    username = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = Order
        fields = '__all__'
        read_only_fields = ['user', 'total_price']