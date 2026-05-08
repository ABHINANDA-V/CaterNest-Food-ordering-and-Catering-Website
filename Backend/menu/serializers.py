from rest_framework import serializers
from .models import Category, FoodItem


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class FoodItemSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True,required=False)
    category_name = serializers.CharField(source="category.name", read_only=True)

    class Meta:
        model = FoodItem
        fields = '__all__'