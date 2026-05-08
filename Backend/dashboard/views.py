from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser

from orders.models import Order
from users.models import User
from menu.models import FoodItem
from catering.models import CateringBooking

class AdminDashboardView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        # recent orders (latest 5)
        recent_orders = Order.objects.all().order_by("-created_at")[:5]

        # recent catering bookings (latest 5)
        recent_bookings = CateringBooking.objects.all().order_by("-created_at")[:5]

        data = {
            "total_orders": Order.objects.count(),
            "total_users": User.objects.count(),
            "total_food_items": FoodItem.objects.count(),
            "total_bookings": CateringBooking.objects.count(),

            "pending_orders": Order.objects.filter(status="Pending").count(),
            "delivered_orders": Order.objects.filter(status="Delivered").count(),

            # NEW
            "recent_orders": [
                {
                    "id": o.id,
                    "user": o.user.username,
                    "total": o.total_price,
                    "status": o.status,
                }
                for o in recent_orders
            ],

            "recent_bookings": [
                {
                    "id": b.id,
                    "user": b.user.username,
                    "event": b.event_type,
                    "date": b.event_date,
                    "status": b.status,
                }
                for b in recent_bookings
            ],

            # notification count (new bookings)
            "new_bookings": CateringBooking.objects.filter(status="Pending").count(),
        }

        return Response(data)