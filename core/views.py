from django.shortcuts import render
from .models import SiteSettings

def core(request):
    # Получаем первый объект с настройками сайта (предполагаем, что он один)
    settings = SiteSettings.objects.first()
    return render(request, 'cars/index.html', {'settings': settings})

