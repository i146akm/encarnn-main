from django.shortcuts import render, get_object_or_404 as g
from . import models
from django.core.paginator import Paginator
from .calc import calculate_all as calc
from .models import CarAd
from rapidfuzz import fuzz


def fuzzy_match(a, b, threshold=75):
    if not a or not b:
        return False
    return fuzz.token_set_ratio(a.lower(), b.lower()) >= threshold


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
        cars = [car for car in cars if fuzzy_match(filters['brand'], car.brand)]
    if filters['model']:
        cars = [car for car in cars if fuzzy_match(filters['model'], car.model)]
    if filters['generation']:
        cars = [car for car in cars if fuzzy_match(filters['generation'], car.generation or '')]
    if filters['fuel_type']:
        cars = [car for car in cars if fuzzy_match(filters['fuel_type'], car.fuel_type)]
    if filters['transmission']:
        cars = [car for car in cars if fuzzy_match(filters['transmission'], car.transmission)]
    if filters['body_type']:
        cars = [car for car in cars if fuzzy_match(filters['body_type'], car.body_type or '')]
    if filters['color']:
        cars = [car for car in cars if fuzzy_match(filters['color'], car.color or '')]

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

    # Сортировка
    sort = request.GET.get('sort') or 'price_asc'

    def get_date(car):
        return (car.year or 0, car.month or 0)

    if sort == 'price_asc':
        filtered_cars.sort(key=lambda x: x.total)
    elif sort == 'price_desc':
        filtered_cars.sort(key=lambda x: x.total, reverse=True)
    elif sort == 'date_added_asc':
        filtered_cars.sort(key=get_date)
    elif sort == 'date_added_desc':
        filtered_cars.sort(key=get_date, reverse=True)

    paginator = Paginator(filtered_cars, 20)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    query_params = request.GET.copy()
    query_params.pop('page', None)

    query_params_for_sort = query_params.copy()
    query_params_for_sort.pop('sort', None)

    return render(request, 'cars/carList.html', {
        'car': page_obj.object_list,
        'filters': filters,
        'page_obj': page_obj,
        'query_params': query_params.urlencode(),
        'current_sort': sort,
        'query_params_for_sort': query_params_for_sort.urlencode(),

    })

def car_detail(request, slug):
    car = g(models.CarAd, slug=slug)
    data = calc(car.price, car.engine, car.year)
    car_options = [
        [
            ("Люк", car.option_1_1),
            ("Головная лампа (светодиод)", car.option_1_2),
            ("Электрический багажник с электроприводом", car.option_1_3),
            ("Призрачное закрытие двери", car.option_1_4),
            ("Электропривод складывающихся боковых зеркал", car.option_1_5),
            ("Алюминиевые диски", car.option_1_6),
            ("Багажник на крыше", car.option_1_7),
            ("Подогрев руля", car.option_1_8),
            ("Электропривод рулевого колеса", car.option_1_9),
            ("Переключение передач веслами", car.option_1_10),
            ("Пульт дистанционного управления на рулевом колесе", car.option_1_11),
            ("Зеркало в комнате КСМ", car.option_1_12),
            ("Высокий проход", car.option_1_13),
            ("Электропривод дверного замка", car.option_1_14),
            ("Усилитель руля", car.option_1_15),
            ("Электрические окна", car.option_1_16),
        ],
        [
            ("Подушка безопасности (сиденье водителя, сиденье пассажира)", car.option_2_1),
            ("Подушка безопасности (боковая)", car.option_2_2),
            ("Подушка безопасности (шторка)", car.option_2_3),
            ("Антиблокировочная система тормозов (ABS)", car.option_2_4),
            ("Противоскользящее покрытие (TCS)", car.option_2_5),
            ("Электронная система контроля устойчивости (ESC)", car.option_2_6),
            ("Датчик давления в шинах (TPMS)", car.option_2_7),
            ("Система предупреждения о выезде с полосы движения (LDWS)", car.option_2_8),
            ("Поддержка с электронным управлением (ECS)", car.option_2_9),
            ("Датчик парковки (передний, задний)", car.option_2_10),
            ("Система предупреждения о боковом столкновении сзади", car.option_2_11),
            ("Задняя камера", car.option_2_12),
            ("Обзор на 360 градусов", car.option_2_13),
        ],

        [
            ("Круиз-контроль (обычный, адаптивный)", car.option_3_1),
            ("Проекционный дисплей (HUD)", car.option_3_2),
            ("Электронный стояночный тормоз (EPB)", car.option_3_3),
            ("Автоматическое кондиционирование воздуха", car.option_3_4),
            ("Смарт-ключ", car.option_3_5),
            ("Беспроводной дверной замок", car.option_3_6),
            ("Датчик дождя", car.option_3_7),
            ("Автоматический свет", car.option_3_8),
            ("Шторка/жалюзи (заднее сиденье, сзади)", car.option_3_9),
            ("Навигация", car.option_3_10),
            ("AV-монитор на переднем сиденье", car.option_3_11),
            ("AV-монитор на заднем сиденье", car.option_3_12),
            ("Bluetooth", car.option_3_13),
            ("CD-плеер", car.option_3_14),
            ("USB-порт", car.option_3_15),
            ("AUX-приемник", car.option_3_16),
        ],
        [
            ("Кожаные сиденья", car.option_4_1),
            ("Электропривод сидений (водительское сиденье, пассажирское сиденье)", car.option_4_2),
            ("Электропривод сидений (задние сиденья)", car.option_4_3),
            ("Подогрев сидений (передних и задних)", car.option_4_4),
            ("Сиденья с памятью (водительское сиденье, пассажирское сиденье)", car.option_4_5),
            ("Вентилируемые сиденья (водительское сиденье, пассажирское сиденье)", car.option_4_6),
            ("Вентилируемые сиденья (задние сиденья)", car.option_4_7),
            ("Массажная простыня", car.option_4_8),
        ]
    ]

    context = {
        'car': car,
        'fee': data['fee'],
        'duty_eur': data['duty_eur'],
        'duty_rub': data['duty_rub'],
        'price_service': data['price_service'],
        'total': data['total'],
        'customs_broker': 100000,
        'agent_service': 100000,
        'car_options': car_options,
    }
    return render(request, 'cars/car_detail.html', context=context)
