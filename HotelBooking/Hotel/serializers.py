from rest_framework import serializers
from .models import Hotel,Booking,Room,Hotelimg

class Hotel_img_serializer(serializers.ModelSerializer):
    class Meta:
        model=Hotelimg
        fields=['img']
        read_only_fields=['hotel','created_at']
class Hotel_serializer(serializers.ModelSerializer):
    images = Hotel_img_serializer(source='Hotelimg', many=True, read_only=True)
    class Meta:
        model=Hotel
        fields="__all__"

class Room_serializer(serializers.ModelSerializer):
    class Meta:
        model=Room
        fields="__all__"
class BookingSerializer(serializers.ModelSerializer):
    hotel_name = serializers.CharField(source='room.hotel.name', read_only=True)
    room_number = serializers.CharField(source='room.room_number', read_only=True)
    room_type = serializers.CharField(source='room.room_type', read_only=True)
    hotel_city = serializers.CharField(source='room.hotel.city', read_only=True)

    class Meta:
        model = Booking
        fields = [
            'check_in',
            'check_out',
            'hotel_name',
            'room_number',
            'room_type',
            'hotel_city',
        ]
        read_only_fields = ['user', 'room']
