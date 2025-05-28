from django.shortcuts import render, get_object_or_404 as g
from . import models
from django.core.paginator import Paginator
from .calc import calculate_all as calc
from .models import CarAd

def car_view(request):
    cars = list(CarAd.objects.all())

    filters = {
        'brand': request.GET.get('brand'),
        'model': request.GET.get('model'),
        'generation': request.GET.get('generation'),
        'fuel_type': request.GET.get('fuel_type'),
        'transmission': request.GET.get('transmission'),
        'body_type': request.GET.get('body_type'),
        'color': request.GET.get('color'),
        'start_year': request.GET.get('start_year'),
        'start_month': request.GET.get('start_month'),
        'end_year': request.GET.get('end_year'),
        'end_month': request.GET.get('end_month'),
        'mileage_min': request.GET.get('mileage_min'),
        'mileage_max': request.GET.get('mileage_max'),
        'price_min': request.GET.get('price_min'),
        'price_max': request.GET.get('price_max'),
    }
    if filters['brand']:
        cars = [car for car in cars if filters['brand'].lower() in car.brand.lower()]
    if filters['model']:
        cars = [car for car in cars if filters['model'].lower() in car.model.lower()]
    if filters['generation']:
        cars = [car for car in cars if filters['generation'].lower() in (car.generation or '').lower()]
    if filters['fuel_type']:
        cars = [car for car in cars if filters['fuel_type'].lower() in car.fuel_type.lower()]
    if filters['transmission']:
        cars = [car for car in cars if filters['transmission'].lower() in car.transmission.lower()]
    if filters['body_type']:
        cars = [car for car in cars if filters['body_type'].lower() in (car.body_type or '').lower()]
    if filters['color']:
        cars = [car for car in cars if filters['color'].lower() in (car.color or '').lower()]
    if filters['start_year'] and filters['start_month']:
        start_date = f"{filters['start_year']}-{filters['start_month'].zfill(2)}"
        cars = [car for car in cars if str(car.production_date) >= start_date]
    if filters['end_year'] and filters['end_month']:
        end_date = f"{filters['end_year']}-{filters['end_month'].zfill(2)}"
        cars = [car for car in cars if str(car.production_date) <= end_date]
    if filters['mileage_min']:
        try:
            mileage_min = int(filters['mileage_min'].replace(" ", ""))
            cars = [car for car in cars if car.mileage >= mileage_min]
        except:
            pass
    if filters['mileage_max']:
        try:
            mileage_max = int(filters['mileage_max'].replace(" ", ""))
            cars = [car for car in cars if car.mileage <= mileage_max]
        except:
            pass

    filtered_cars = []
    for car in cars:
        try:
            result = calc(car.price, car.engine, car.year)
            car.total = result['total']
            if filters['price_min'] and car.total < int(filters['price_min'].replace(" ", "")):
                continue
            if filters['price_max'] and car.total > int(filters['price_max'].replace(" ", "")):
                continue
            filtered_cars.append(car)
        except:
            continue

    paginator = Paginator(filtered_cars, 20)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    query_params = request.GET.copy()
    query_params.pop('page', None)

    return render(request, 'cars/carList.html', {
        'car': page_obj.object_list,
        'filters': filters,
        'page_obj': page_obj,
        'query_params': query_params.urlencode(),
    })


def car_detail(request, slug):
    car = g(models.CarAd, slug=slug)
    data = calc(car.price, car.engine, car.year)
    context = {
        'car': car,
        'fee': data['fee'],
        'duty_eur': data['duty_eur'],
        'duty_rub': data['duty_rub'],
        'price_service': data['price_service'],
        'total': data['total'],
        'customs_broker': 100000,
        'agent_service': 100000,
    }
    return render(request, 'cars/car_detail.html', context=context)
