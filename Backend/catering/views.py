from rest_framework import generics, permissions
from .models import CateringBooking,CateringPackage
from .serializers import CateringBookingSerializer,CateringPackageSerializer
from rest_framework.permissions import IsAdminUser,AllowAny

# create Booking
class CreateBookingView(generics.CreateAPIView):
    serializer_class = CateringBookingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        package = serializer.validated_data.get('package')
        guest_count = serializer.validated_data.get('guest_count')

        total_price = 0
        if package:
            total_price = package.price_per_person * guest_count

        serializer.save(
            user=self.request.user,
            total_price=total_price
        )

# view own bookings
class UserBookingListView(generics.ListAPIView):
    serializer_class = CateringBookingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return CateringBooking.objects.filter(user=self.request.user)


# view all bookings
class AdminBookingListView(generics.ListAPIView):
    serializer_class = CateringBookingSerializer
    permission_classes = [permissions.IsAdminUser]
    queryset = CateringBooking.objects.all()


# admin update status
class UpdateBookingStatusView(generics.UpdateAPIView):
    serializer_class = CateringBookingSerializer
    permission_classes = [permissions.IsAdminUser]
    queryset = CateringBooking.objects.all()


class PackageListView(generics.ListAPIView):
    queryset = CateringPackage.objects.all()
    serializer_class =  CateringPackageSerializer
    permission_classes = [AllowAny]

    def get_serializer_context(self):
        return {'request': self.request}

    class Meta:
        model = CateringPackage
        fields = '__all__'    

class PackageListCreateView(generics.ListCreateAPIView):
    queryset = CateringPackage.objects.all()
    serializer_class = CateringPackageSerializer
    permission_classes = [IsAdminUser]

    def get_serializer_context(self):
        return {'request': self.request}

# update
class PackageUpdateView(generics.UpdateAPIView):
    queryset = CateringPackage.objects.all()
    serializer_class = CateringPackageSerializer
    permission_classes = [IsAdminUser]

# delete
class PackageDeleteView(generics.DestroyAPIView):
    queryset = CateringPackage.objects.all()
    permission_classes = [IsAdminUser]        