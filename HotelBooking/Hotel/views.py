from django.shortcuts import render,get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from .models import Hotel,Booking,Room,Hotelimg
from .serializers import Hotel_serializer,BookingSerializer,Room_serializer,Hotel_img_serializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from datetime import datetime

# Create your views here.
class Hotel_view(APIView):
    def get(self,request):
        hotel=Hotel.objects.all()
        serializer=Hotel_serializer(hotel,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)

class Room_view(APIView):
    def get(self,request,id):
        hotel=get_object_or_404(Hotel,id=id)
        room=Room.objects.filter(hotel=hotel)
        serializer=Room_serializer(room,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)

class BookingView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, room_id):
        try:
            room = Room.objects.get(id=room_id)

            serializer = BookingSerializer(data=request.data)
            if serializer.is_valid():

                from datetime import date
                today = date.today()

                check_in = serializer.validated_data['check_in']
                check_out = serializer.validated_data['check_out']

                # ❌ Block past check-in date
                if check_in < today:
                    return Response(
                        {"message": "You cannot book a room for past dates"},
                        status=status.HTTP_400_BAD_REQUEST
                    )

                # ❌ Check-out must be after check-in
                if check_out <= check_in:
                    return Response(
                        {"message": "Check-out date must be after check-in"},
                        status=status.HTTP_400_BAD_REQUEST
                    )

                # ❌ Prevent double booking (date overlap)
                overlap = Booking.objects.filter(
                    room=room,
                    check_out__gt=check_in,
                    check_in__lt=check_out,
                )

                if overlap.exists():
                    return Response(
                        {"message": "Room already booked for selected dates"},
                        status=status.HTTP_400_BAD_REQUEST
                    )

                # ✔ Save booking
                serializer.save(user=request.user, room=room)

                return Response(
                    {"message": "Room booked successfully!", "data": serializer.data},
                    status=status.HTTP_201_CREATED
                )

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Room.DoesNotExist:
            return Response(
                {"error": "Room not found"},
                status=status.HTTP_404_NOT_FOUND
            )


class MyBooking_view(APIView):
    def get(self,request):
        booking=Booking.objects.filter(user=request.user)
        serializer=BookingSerializer(booking,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)

class Hotel_img_view(APIView):
    def get(self,request,id):
        hotel=get_object_or_404(Hotel,id=id)
        img=Hotelimg.objects.filter(hotel=hotel)
        serializer=Hotel_img_serializer(img,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)

