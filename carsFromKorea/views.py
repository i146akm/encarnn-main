import os
import json
from django.conf import settings
from django.shortcuts import render
from django.http import Http404
from django.core.paginator import Paginator
from datetime import datetime
import sqlite3
import re
from rapidfuzz import fuzz


def load_cars():
    db_path = os.path.join(settings.BASE_DIR, 'data', 'db', 'vehicles.db')
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM vehicles")
    rows = cursor.fetchall()
    conn.close()

    cars = []
    for row in rows:
        car = dict(row)
        try:
            car['images'] = json.loads(car['images_json'])  # превратить строку в список
        except Exception:
            car['images'] = []  # на случай ошибки
        cars.append(car)

    return cars


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

def normalize(text):
    """Преобразует строку в список слов в нижнем регистре."""
    return re.findall(r'\w+', text.lower())

def fuzzy_contains(needle, haystack, threshold=70):
    """
    Умный fuzzy-поиск, устойчивый к опечаткам, лишним словам и перестановкам.
    """
    if not needle or not haystack:
        return False

    # Проверка через token_set_ratio (устойчив к порядку слов)
    if fuzz.token_set_ratio(needle, haystack) >= threshold:
        return True

    # Дополнительная проверка: частичное совпадение (устойчиво к опечаткам)
    if fuzz.partial_ratio(needle, haystack) >= threshold:
        return True

    return False



def words_match_loose(filter_text, target_text, threshold=80):
    """
    Возвращает True, если все слова из фильтра есть в целевом тексте
    или примерно похожи (по fuzzy-сравнению).
    """
    filter_words = normalize(filter_text)
    target_words = normalize(target_text)

    for fw in filter_words:
        if not any(fuzz.ratio(fw, tw) >= threshold for tw in target_words):
            return False
    return True

def matches_filters(car, filters):
    for key in ['brand', 'model', 'gen']:
        if filters.get(key) and not fuzzy_contains(filters[key], car.get('title', '')):
            return False

    if filters.get('fuel_type') and not words_match_loose(filters['fuel_type'], car.get('fuel_type', '')):
        return False

    if filters.get('transmission'):
        expected = TRANSMISSION_MAP.get(filters['transmission'], filters['transmission'])
        if not words_match_loose(expected, car.get('transmission', '')):
            return False

    if filters.get('color'):
        expected = COLOR_MAP.get(filters['color'].lower(), filters['color'])
        if not words_match_loose(expected, car.get('color', '')):
            return False

    if filters.get('start_year') and to_int(car.get('year')) < to_int(filters['start_year']):
        return False

    if filters.get('end_year') and to_int(car.get('year')) > to_int(filters['end_year']):
        return False

    if filters.get('mileage_min') and to_int(car.get('mileage')) < to_int(filters['mileage_min']):
        return False

    if filters.get('mileage_max') and to_int(car.get('mileage')) > to_int(filters['mileage_max']):
        return False

    if filters.get('price_min') and to_int(car.get('total')) < to_int(filters['price_min']):
        return False

    if filters.get('price_max') and to_int(car.get('total')) > to_int(filters['price_max']):
        return False

    return True

def cars_korea_view(request):
    cars = load_cars()

    filters = {
        'brand': request.GET.get('brand'),
        'model': request.GET.get('model'),
        'gen': request.GET.get('gen'),
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
    sort = request.GET.get('sort', 'price_asc')

    def parse_year_month(car):
        year = to_int(car.get('year'), 0)
        month = to_int(car.get('month'), 1)  # если месяц нет, считаем январь
        # Возвращаем кортеж, по которому можно сортировать
        return (year, month)

    if sort == 'price_asc':
        filtered_cars.sort(key=lambda x: to_int(x.get('total')))
    elif sort == 'price_desc':
        filtered_cars.sort(key=lambda x: to_int(x.get('total')), reverse=True)
    elif sort == 'date_added_asc':
        filtered_cars.sort(key=parse_year_month)
    elif sort == 'date_added_desc':
        filtered_cars.sort(key=parse_year_month, reverse=True)

    paginator = Paginator(filtered_cars, 20)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    # Создаем копию параметров запроса и удаляем 'page' и 'sort', чтобы их переопределить при формировании ссылок
    query_params = request.GET.copy()

    # При сохранении для пагинации — убираем только page
    paginator_query = query_params.copy()
    paginator_query.pop('page', None)

    # При изменении сортировки — убираем старую sort
    sort_query = query_params.copy()
    sort_query.pop('sort', None)
    sort_query.pop('page', None)

    return render(request, 'cars/carsKorea.html', {
        'cars': page_obj.object_list,
        'filters': filters,
        'page_obj': page_obj,
        'query_params': paginator_query.urlencode(),  # для пагинации
        'sort_query_params': sort_query.urlencode(),  # для смены сортировки
        'current_sort': sort,
    })


def car_detail(request, id):
    cars = load_cars()
    car = next((c for c in cars if str(c.get('id')) == str(id)), None)
    if not car:
        raise Http404("Car not found")
    return render(request, 'cars/korea-car_detail.html', {'car': car})
