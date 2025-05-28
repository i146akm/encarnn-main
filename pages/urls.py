from django.urls import path
from .views import text_page_view

urlpatterns = [
    path('<slug:slug>/', text_page_view, name='text_page'),
]
