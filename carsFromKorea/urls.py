from django.urls import path
from . import views

urlpatterns = [
    path('cars-korea/', views.cars_korea_view, name='cars-korea'),
    path('cars-korea/<int:id>/', views.car_detail, name='korea-car_detail'),
]