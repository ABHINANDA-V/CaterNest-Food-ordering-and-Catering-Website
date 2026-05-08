from django.contrib import admin
from .models import CateringBooking,CateringPackage

# Register your models here.
admin.site.register(CateringBooking)
admin.site.register(CateringPackage)