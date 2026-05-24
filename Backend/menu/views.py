from rest_framework.generics import ListAPIView,RetrieveAPIView,CreateAPIView,DestroyAPIView
from .models import Category, FoodItem
from .serializers import CategorySerializer, FoodItemSerializer
from rest_framework.permissions import IsAdminUser
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.generics import UpdateAPIView
from rest_framework import generics, permissions
from django.db.models import Q

from rest_framework.response import Response
from rest_framework import status



class CreateFoodItemView(CreateAPIView):
    queryset = FoodItem.objects.all()
    serializer_class = FoodItemSerializer
    permission_classes = [IsAdminUser]
    parser_classes = (MultiPartParser, FormParser)

    def create(self, request, *args, **kwargs):
        print("REQUEST DATA:", request.data)

        serializer = self.get_serializer(data=request.data)

        if not serializer.is_valid():
            print("ERRORS:", serializer.errors)
            return Response(serializer.errors, status=400)

        serializer.save(available=True)

        return Response(serializer.data, status=201)

# get all categories
class CategoryListView(ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CreateCategoryView(generics.CreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAdminUser] 
    parser_classes = [MultiPartParser, FormParser]   


# get all food items
class FoodItemListView(ListAPIView):
    serializer_class = FoodItemSerializer
    pagination_class = None

    def get_queryset(self):
        queryset = FoodItem.objects.filter(available=True)
        category_id = self.request.query_params.get('category')
        search = self.request.query_params.get('search')

        if category_id:
            queryset = queryset.filter(category_id=category_id)

        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) |
                Q(price__icontains=search) |
                Q(category__name__icontains=search)

        )    

        return queryset


# get single food item
class FoodItemDetailView(RetrieveAPIView):
    queryset = FoodItem.objects.all()
    serializer_class = FoodItemSerializer

class UpdateFoodItemView(UpdateAPIView):
    queryset = FoodItem.objects.all()
    serializer_class = FoodItemSerializer
    permission_classes = [IsAdminUser]
    parser_classes = (MultiPartParser, FormParser)

    def perform_update(self, serializer):
        serializer.save(available=True)

class DeleteFoodItemView(DestroyAPIView):
    queryset = FoodItem.objects.all()
    serializer_class = FoodItemSerializer
    permission_classes = [IsAdminUser]