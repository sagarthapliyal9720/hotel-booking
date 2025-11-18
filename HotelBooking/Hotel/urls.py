
from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [
  path('hotel/',views.Hotel_view.as_view(),name="hotel"),
  path('booking/<int:room_id>/', views.BookingView.as_view(), name="booking"),
  path('room/<int:id>/',views.Room_view.as_view(),name="room"),
  path('mybooking/',views.MyBooking_view.as_view(),name="mybooking"),
  path('hotel_img/<int:id>/',views.Hotel_img_view.as_view(),name="hotel_img")
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)