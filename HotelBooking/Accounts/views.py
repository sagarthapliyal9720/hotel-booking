from django.shortcuts import render,get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework import status
from django.contrib.auth.models import User
from django.core.mail import send_mail
import random
from django.conf import settings
from django.core.mail import send_mail
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from .models import PasswordOTP
from .serializers import Register_User
# Create your views here.
import random



def otp_genrate():
    return random.randint(1000, 9999)

    return random_float, random_uniform
class Register_view(APIView):
    def post(self,request):
        serializer=Register_User(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


# STEP 1: Request OTP
class ForgotPassword(APIView):
    def post(self, request):
        email = request.data.get("email")

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"error": "User not found!"}, status=404)

        otp = random.randint(1000, 9999)

        PasswordOTP.objects.update_or_create(
            user=user,
            defaults={'otp': otp}
        )

        send_mail(
            subject="Password Reset OTP",
            message=f"Your OTP is: {otp}",
            from_email=settings.EMAIL_HOST_USER ,
            recipient_list=[email],
        )

        return Response({"message": "OTP sent to your email"}, status=200)
class VerifyOTP(APIView):
    def post(self, request):
        email = request.data.get("email")
        otp = request.data.get("otp")

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"error": "User not found!"}, status=404)

        exists = PasswordOTP.objects.filter(user=user, otp=otp).exists()

        if not exists:
            return Response({"error": "Invalid OTP!"}, status=400)

        return Response({"message": "OTP verified"}, status=200)
class ResetPassword(APIView):
    def post(self, request):
        email = request.data.get("email")
        new_password = request.data.get("new_password")

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"error": "User not found!"}, status=404)

        user.set_password(new_password)
        user.save()

        PasswordOTP.objects.filter(user=user).delete()

        return Response({"message": "Password updated successfully!"}, status=200)
