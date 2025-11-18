from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Hotel(models.Model):
    name = models.CharField(max_length=200)
    city = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    total_rooms = models.IntegerField(default=10)
    available_rooms = models.IntegerField(default=10)
    

    def __str__(self):
        return self.name

class Room(models.Model):
    ROOM_TYPES = (
        ('Single', 'Single'),
        ('Double', 'Double'),
        ('Suite', 'Suite'),
    )

    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, related_name="rooms")
    room_number = models.CharField(max_length=20)
    room_type = models.CharField(max_length=20, choices=ROOM_TYPES)
    price_per_night = models.DecimalField(max_digits=8, decimal_places=2)
    is_available = models.BooleanField(default=True)
    room_img=models.ImageField(upload_to='media/',null=True,blank=True)
    def __str__(self):
        return f"Room {self.room_number} @ {self.hotel.name}"

class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name="bookings")
    check_in = models.DateField()
    check_out = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} booked {self.room}"

class Hotelimg(models.Model):
    hotel=models.ForeignKey(to=Hotel,on_delete=models.CASCADE,related_name='Hotelimg')
    img=models.ImageField(upload_to="media/")
    created_at=models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.hotel.name
