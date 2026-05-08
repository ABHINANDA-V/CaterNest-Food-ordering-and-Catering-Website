from django.urls import path
from .views import PlaceOrderView, OrderListView, OrderDetailView,AdminOrderListView
from .views import AssignDeliveryView, UpdateOrderStatusView,AdminUpdateOrderStatusView

urlpatterns = [
    path('place/', PlaceOrderView.as_view(),name='place-order'),
    path('', OrderListView.as_view()),
    path('<int:pk>/', OrderDetailView.as_view()),

    path('assign/<int:pk>/', AssignDeliveryView.as_view()),
    path('status/<int:pk>/', UpdateOrderStatusView.as_view()),
    path('admin/orders/', AdminOrderListView.as_view()),
    path('admin/orders/<int:pk>/update/', AdminUpdateOrderStatusView.as_view()),
]