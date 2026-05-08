from django.urls import path
from .views import CartListView, CartCreateView, CartUpdateView, CartDeleteView

urlpatterns = [
    path('', CartListView.as_view()),                    
    path('add/', CartCreateView.as_view()),              
    path('update/<int:pk>/', CartUpdateView.as_view()),   
    path('delete/<int:pk>/', CartDeleteView.as_view()),   
]