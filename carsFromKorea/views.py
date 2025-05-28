import os
import json
from django.conf import settings
from django.shortcuts import render
from django.http import Http404
from django.core.paginator import Paginator


def load_cars():
    json_path = os.path.join(settings.BASE_DIR, 'data', 'json', 'vehicles.json')
    with open(json_path, encoding='utf-8') as f:
        return json.load(f)


def to_int(value, default=0):
    try:
        # Преобразуем в строку, убираем пробелы, потом оставляем только цифры и точку
        cleaned = str(value).replace(' ', '').replace(',', '')
        if '.' in cleaned:
            return int(float(cleaned))  # сначала float, потом округляем вниз
        return int(cleaned)
    except:
        return default


TRANSMISSION_MAP = {
    'Автомат (все типы)': 'авто',
    'Механика': 'механика',
    'Вариатор': 'вариатор',
    'Робот': 'робот',
}

COLOR_MAP = {
    'серебристо-серый': 'silver_gray',
}

def matches_filters(car, filters):
    if filters['brand'] and filters['brand'].lower() not in car.get('brand', '').lower():
        return False
    if filters['model'] and filters['model'].lower() not in car.get('title', '').lower():
        return False
    if filters['fuel_type'] and filters['fuel_type'].lower() != car.get('fuel_type', '').lower():
        return False
    if filters['transmission']:
        expected = TRANSMISSION_MAP.get(filters['transmission'], '').lower()
        if expected != car.get('transmission', '').lower():
            return False
    if filters['color']:
        expected = COLOR_MAP.get(filters['color'].lower(), '').lower()
        if expected != car.get('color', '').lower():
            return False
    if filters['start_year'] and to_int(car.get('year')) < to_int(filters['start_year']):
        return False
    if filters['end_year'] and to_int(car.get('year')) > to_int(filters['end_year']):
        return False
    if filters['mileage_min'] and to_int(car.get('mileage')) < to_int(filters['mileage_min']):
        return False
    if filters['mileage_max'] and to_int(car.get('mileage')) > to_int(filters['mileage_max']):
        return False
    if filters['price_min'] and to_int(car.get('total')) < to_int(filters['price_min']):
        return False
    if filters['price_max'] and to_int(car.get('total')) > to_int(filters['price_max']):
        return False
    return True


def cars_korea_view(request):
    cars = load_cars()

    filters = {
        'brand': request.GET.get('brand'),
        'model': request.GET.get('model'),
        'fuel_type': request.GET.get('fuel_type'),
        'transmission': request.GET.get('transmission'),
        'color': request.GET.get('color'),
        'start_year': request.GET.get('start_year'),
        'end_year': request.GET.get('end_year'),
        'mileage_min': request.GET.get('mileage_min'),
        'mileage_max': request.GET.get('mileage_max'),
        'price_min': request.GET.get('price_min'),
        'price_max': request.GET.get('price_max'),
    }

    filtered_cars = [car for car in cars if matches_filters(car, filters)]

    paginator = Paginator(filtered_cars, 20)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    query_params = request.GET.copy()
    query_params.pop('page', None)

    return render(request, 'cars/carsKorea.html', {
        'cars': page_obj.object_list,
        'filters': filters,
        'page_obj': page_obj,
        'query_params': query_params.urlencode(),
    })


def car_detail(request, id):
    cars = load_cars()
    car = next((c for c in cars if str(c.get('vehicle_id')) == str(id)), None)
    if not car:
        raise Http404("Car not found")
    return render(request, 'cars/korea-car_detail.html', {'car': car})
