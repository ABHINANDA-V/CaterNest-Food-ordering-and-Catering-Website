from django.db import models
from users.models import User

class CateringBooking(models.Model):
    EVENT_TYPES = (
        ('Wedding', 'Wedding'),
        ('Birthday', 'Birthday'),
        ('Corporate', 'Corporate'),
    )

    STATUS_CHOICES = (
        ('Pending', 'Pending'),
        ('Confirmed', 'Confirmed'),
        ('Completed', 'Completed'),
        ('Cancelled', 'Cancelled'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='catering_bookings')
    event_type = models.CharField(max_length=50, choices=EVENT_TYPES)
    event_date = models.DateField()
    guest_count = models.PositiveIntegerField()
    special_request = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)
    phone = models.CharField(max_length=15, null=True, blank=True)
    location = models.CharField(max_length=255, null=True, blank=True)
    event_time = models.TimeField(null=True, blank=True)

    package = models.ForeignKey(
        'CateringPackage',
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def __str__(self):
        return f"{self.user} - {self.event_type}"
    
class CateringPackage(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    price_per_person = models.DecimalField(max_digits=8, decimal_places=2)
    image = models.ImageField(upload_to='packages/', null=True, blank=True)

    def __str__(self):
        return self.name    