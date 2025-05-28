import requests
import json
from os import getenv
from dotenv import load_dotenv


load_dotenv()
API_KEY = getenv('EXCHANGERATE_API_KEY')  # вставь сюда свой ключ
BASE_URL = f"https://v6.exchangerate-api.com/v6/{API_KEY}/latest/RUB"


response = requests.get(BASE_URL)
data = response.json()['conversion_rates']

with open('json/currency.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=4)
