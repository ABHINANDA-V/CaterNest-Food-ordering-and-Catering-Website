from rest_framework import serializers
from .models import Cart
from menu.models import FoodItem


class CartSerializer(serializers.ModelSerializer):
    food_item = serializers.PrimaryKeyRelatedField(
        queryset=FoodItem.objects.all()
    )

    food_details = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'food_item', 'food_details', 'quantity']


    def get_food_details(self, obj):
        return {
            "name": obj.food_item.name,
            "price": obj.food_item.price,
            "image": obj.food_item.image.url if obj.food_item.image else None
            }   