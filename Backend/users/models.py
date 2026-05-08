from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models

# Create your models here.
class User(AbstractUser):
    phone = models.CharField(max_length=15, blank=True,null=True)
   
    ROLE_CHOICES = (
        ('customer', 'Customer'),
        ('admin', 'Admin'),
        ('delivery', 'Delivery Boy'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='customer')

     # Fix for permission conflict
    groups = models.ManyToManyField(
        Group,
        related_name='custom_user_set',
        blank=True
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='custom_user_permissions_set',
        blank=True
    )

    def __str__(self):
        return f"{self.username} ({self.role})"
    
class DeliveryProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='delivery_profile')
    vehicle_number = models.CharField(max_length=50)
    
    def __str__(self):
        return f"Delivery Boy: {self.user.username}"    
