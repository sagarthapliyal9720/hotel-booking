from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('register/',views.Register_view.as_view(),name="register"),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
     path('forgot-password/', views.ForgotPassword.as_view(), name="forgot_password"),
    path('verify-otp/', views.VerifyOTP.as_view(), name="verify_otp"),
    path('reset-password/', views.ResetPassword.as_view(), name="reset_password"),
    
]
