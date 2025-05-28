import json
import os
import requests
from dotenv import load_dotenv
from encar import CarapisClient
from translatepy import Translator
from datetime import datetime
from concurrent.futures import ThreadPoolExecutor
from currency import convert_currency as cc


load_dotenv()
client = CarapisClient(api_key=os.getenv('CARAPIS_API_KEY'))
translator = Translator()

# === КЭШ ПЕРЕВОДОВ ===
translate_cache = {}

def translate(text, to_lang):
    key = (text, to_lang)
    if key in translate_cache:
        return translate_cache[key]
    translated = str(translator.translate(text, to_lang))
    translate_cache[key] = translated
    return translated

def calculate_customs_duty(price_krw, engine_cc, year):
    eur = cc(price_krw, 'KRW', 'EUR')
    age = datetime.now().year - year

    if age < 3:
        if eur <= 8500:
            percent, min_per_cm3 = 0.54, 2.5
        elif eur <= 16700:
            percent, min_per_cm3 = 0.48, 3.5
        elif eur <= 42300:
            percent, min_per_cm3 = 0.48, 5.5
        elif eur <= 84500:
            percent, min_per_cm3 = 0.48, 7.5
        elif eur <= 169000:
            percent, min_per_cm3 = 0.48, 15
        else:
            percent, min_per_cm3 = 0.48, 20
        return max(eur * percent, engine_cc * min_per_cm3)

    if 3 <= age <= 5:
        if engine_cc <= 1000: rate = 1.5
        elif engine_cc <= 1500: rate = 1.7
        elif engine_cc <= 1800: rate = 2.5
        elif engine_cc <= 2300: rate = 2.7
        elif engine_cc <= 3000: rate = 3.0
        else: rate = 3.6
    else:
        if engine_cc <= 1000: rate = 3.0
        elif engine_cc <= 1500: rate = 3.2
        elif engine_cc <= 1800: rate = 3.5
        elif engine_cc <= 2300: rate = 4.8
        elif engine_cc <= 3000: rate = 5.0
        else: rate = 5.7

    return engine_cc * rate

def calculate_utilization_fee(engine_cc, year, commercial=False):
    base = 20000 if not commercial else 150000
    age = datetime.now().year - year
    if age < 3:
        k = 0.17 if engine_cc <= 3000 else 107.67 if engine_cc <= 3500 else 137.11
    else:
        k = 0.26 if engine_cc <= 3000 else 165.84 if engine_cc <= 3500 else 180.24
    return round(base * k, 2)

def calculate_priceService(price_krw):
    rub = cc(price_krw, 'KRW', 'RUB')
    base = rub + 140000
    return round(base * 1.12, 2)

def format_vehicle(item):
    engine_cc = int(item['engine'].replace(' cc', ''))
    price_krw = item['price'] * 10000
    year = item['year']

    duty_eur = round(calculate_customs_duty(price_krw, engine_cc, year), 2)
    duty_rub = round(cc(duty_eur, 'EUR', 'RUB'), 2)
    fee = round(calculate_utilization_fee(engine_cc, year), 2)
    price_service = round(calculate_priceService(price_krw))
    customs_broker = 100000
    agent_service = 100000
    total = round(duty_rub + fee + price_service + customs_broker + agent_service, 2)
    return {
        'vehicle_id': item['vehicle_id'],
        'title': translate(item['model']['name'], 'English'),
        'model': item['model']['model_group']['name'],
        'fuel_type': "Сжиженный газ" if translate(item['fuel_type'], 'Russian') == 'сжиссер' else translate(item['fuel_type'], 'Russian'),
        'color': translate(item['color'], 'Russian'),
        'transmission': translate(item['transmission'], 'Russian'),
        'brand': item['grade_detail']['model']['model_group']['manufacturer']['name'],
        'year': year,
        'mileage': item['mileage'],
        'engine': round(engine_cc / 1000, 1),
        'engine_cc': engine_cc,
        'warranty_type': 'Нет' if item['warranty_type'] == 'none' else item['warranty_type'],
        'created_at': datetime.strptime(item['created_at'].replace('Z', ''), "%Y-%m-%dT%H:%M:%S.%f").strftime('%d.%m.%Y %H:%M'),
        'main_photo': item['main_photo'],
        'price_krw': price_krw,
        'price_rub': cc(price_krw, 'KRW', 'RUB'),
        'price_eur': cc(price_krw, 'KRW', 'EUR'),
        'price_usd': cc(price_krw, 'KRW', 'USD'),
        'duty_eur': duty_eur,
        'duty_rub': duty_rub,
        'fee': fee,
        'price_service': price_service,
        'agent_service': agent_service,
        'customs_broker': customs_broker,
        'total': total,
    }

def save_vehicles(filename='json/vehicles.json', limit=100):
    all_vehicles_raw = []
    page = 1

    # Запрашиваем первую страницу, чтобы узнать сколько всего страниц
    response = client.list_vehicles(limit=limit, page=page)
    total_pages = response.get('pages', 1)
    all_vehicles_raw.extend(response.get('results', []))

    # Запрос остальных страниц
    while page < total_pages:
        page += 1
        response = client.list_vehicles(limit=limit, page=page)
        all_vehicles_raw.extend(response.get('results', []))

    # Обрабатываем все полученные машины в пуле потоков
    with ThreadPoolExecutor() as executor:
        vehicles = list(executor.map(format_vehicle, all_vehicles_raw))

    os.makedirs(os.path.dirname(filename), exist_ok=True)
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(vehicles, f, ensure_ascii=False, indent=4)

    print(f'{filename} updated! Всего машин сохранено: {len(vehicles)}')

if __name__ == '__main__':
    save_vehicles()