from rest_framework import serializers
from .models import CateringBooking,CateringPackage

class CateringBookingSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    package_name = serializers.CharField(source='package.name', read_only=True)

    class Meta:
        model = CateringBooking
        fields = '__all__'
        read_only_fields = ['user', 'created_at','total_price']


class CateringPackageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = CateringPackage
        fields = '__all__' 

    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image:
            return request.build_absolute_uri(obj.image.url)
        return None           