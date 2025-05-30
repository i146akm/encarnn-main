import os
import json

base_dir = os.path.dirname(os.path.abspath(__file__))
file_path = os.path.join(base_dir, 'json', 'currency.json')

with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

def convert_currency(amount, from_currency, to_currency, rates=data):
    if from_currency not in rates or to_currency not in rates:
        raise ValueError("Одна из валют не найдена в курсах.")
    rub_per_from = 1 / rates[from_currency]
    result = rub_per_from * rates[to_currency] * amount
    return round(result, 2)