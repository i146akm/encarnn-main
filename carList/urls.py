from django.urls import path
from . import views

urlpatterns = [
    path('new-cars/', views.car_view, name='new-cars'),
    path('new-cars/<slug:slug>/', views.car_detail, name='car_detail'),
]