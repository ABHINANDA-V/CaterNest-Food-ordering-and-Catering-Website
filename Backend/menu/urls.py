from django.urls import path
from .views import CategoryListView, FoodItemListView, FoodItemDetailView,CreateFoodItemView,UpdateFoodItemView,DeleteFoodItemView,CreateCategoryView

urlpatterns = [
    path('categories/', CategoryListView.as_view()),
    path("admin/categories/create/", CreateCategoryView.as_view()),
    path('foods/', FoodItemListView.as_view()),
    path('foods/<int:pk>/', FoodItemDetailView.as_view()),
    path('admin/foods/<int:pk>/update/', UpdateFoodItemView.as_view()),

    path('admin/foods/create/', CreateFoodItemView.as_view()),

    path('admin/foods/delete/<int:pk>/', DeleteFoodItemView.as_view()),
]
