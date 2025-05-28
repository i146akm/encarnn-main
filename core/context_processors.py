import json
import os
from .models import SiteSettings
from django.conf import settings

def site_settings(request):
    settings = SiteSettings.objects.first()
    return {'settings': settings}

def currency(request):
    file_path = os.path.join(settings.BASE_DIR, 'data', 'json', 'currency.json')
    with open(file_path, 'r', encoding='utf-8') as f:
        currency = json.load(f)

    inverted_currency = {}
    for curr, rate in currency.items():
        if rate == 0:
            inverted_currency[curr] = None  # или 0 или другое, если нужно
        else:
            inverted_currency[curr] = round(1 / rate, 2)

    return {'currency': inverted_currency}
