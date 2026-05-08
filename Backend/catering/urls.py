from django.urls import path
from .views import (
    CreateBookingView,
    UserBookingListView,
    AdminBookingListView,
    UpdateBookingStatusView,PackageListView,PackageListCreateView,PackageUpdateView,PackageDeleteView
)

urlpatterns = [
    # user
    path('create/', CreateBookingView.as_view()),
    path('my-bookings/', UserBookingListView.as_view()),
    path('packages/', PackageListView.as_view()),

    # admin
    path('admin/bookings/', AdminBookingListView.as_view()),
    path('admin/bookings/<int:pk>/update/', UpdateBookingStatusView.as_view()),

    path('admin/packages/', PackageListCreateView.as_view()),
    path('admin/packages/<int:pk>/update/', PackageUpdateView.as_view()),
    path('admin/packages/<int:pk>/delete/', PackageDeleteView.as_view()),

]