import re
import string
from translatepy import Translator
from currency import convert_currency as cc
from carList.calc import calculate_all as calc



translator = Translator()

# === КЭШ ПЕРЕВОДОВ ===
translate_cache = {}
eng_letters = list(string.ascii_lowercase)


def translate(text, to_lang):
    key = (text, to_lang)

    # Не переводим, если весь текст — это только английские буквы и пробелы
    if all(c in eng_letters or c.isspace() for c in text.lower()):
        return text

    if key in translate_cache:
        return translate_cache[key]

    try:
        translated = str(translator.translate(text, to_lang))
        translate_cache[key] = translated
        return translated
    except Exception:
        return text


import sqlite3
import json
import asyncio
from playwright.async_api import async_playwright, Playwright


# Функции get_info, get_images, get_price остаются без изменений

async def get_info(page, url):
    await page.goto(url)
    await page.wait_for_selector('.DetailSummary_define_summary__NOYid')
    container = await page.query_selector('.DetailSummary_define_summary__NOYid')
    elements = await container.query_selector_all('*')

    yearMonth_full = await elements[1].inner_text()
    yearMonth = '20' + yearMonth_full.replace("식", "").replace('연형정보', '').replace('/', '').replace(' \n', '')

    mileage_full = await elements[5].inner_text()
    mileage = mileage_full.replace(',', '').replace('km', '')

    fuel_type = await elements[7].inner_text()

    car_number = await elements[9].inner_text()
    return {
        'year': yearMonth[:4],
        'month': yearMonth[4:],
        'mileage': mileage,
        'fuel_type': translate(fuel_type, 'Russian'),
        'car_number': car_number,
    }


async def get_images(page, url):
    await page.goto(url)
    await page.wait_for_selector('#detailInfomation')
    detailInformation = page.locator('#detailInfomation')
    await page.wait_for_selector('.DetailCarPhotoPc_thumb__2kpDi')
    main_photo_rel = detailInformation.locator('.swiper-wrapper > div')
    count = await main_photo_rel.count()
    images = []
    for i in range(count):
        item = main_photo_rel.nth(i)
        img = item.locator('img')
        src = await img.get_attribute('src')
        data_src = await img.get_attribute('data-src')
        images.append(data_src if '/assets/images/common/' in src else src)
    return images


async def get_price(page, url):
    await page.goto(url)
    price = await page.locator('.DetailLeadCase_price__tfeps').inner_text()
    return price

async def get_title(page, url):
    await page.goto(url)
    title = await page.locator()

async def get_spec_info(page, url):
    await page.goto(url)
    await page.wait_for_selector('.DetailSummary_btn_detail__msm-h')
    await page.click('.DetailSummary_btn_detail__msm-h')

    await page.wait_for_selector('.DetailSummary_info_detail__IfKy1')

    container = page.locator('.DetailSummary_info_detail__IfKy1 li')

    engine_cc = await container.nth(3).locator('span').inner_text()
    transmission = await container.nth(5).locator('span').inner_text()
    body_type = await container.nth(6).locator('span').inner_text()
    color = await container.nth(7).locator('span').inner_text()
    seats = await container.nth(9).locator('span').inner_text()

    return {
        'engine_cc': engine_cc,
        'transmission': translate(transmission, 'Russian'),
        'body_type': translate(body_type, 'Russian'),
        'color': translate(color, 'Russian'),
        'seats': re.sub(r'[^\d]', '', seats)
    }


async def get_urls(page, url):
    await page.goto(url)
    await page.wait_for_selector('#sr_photo')
    items_photo = page.locator('#sr_photo > li')
    count_photo = await items_photo.count()
    urls = []
    for i in range(count_photo):
        item = items_photo.nth(i)
        href = await item.locator('a').get_attribute('href')
        url = 'https://encar.com' + href
        urls.append(url)

    items_special = page.locator('#sr_special > tr')
    count_special = await items_special.count()
    for i in range(count_special):
        item = items_special.nth(i)
        href = await item.locator('a >> nth=0').get_attribute('href')
        url = 'https://encar.com' + href
        urls.append(url)

    items_normal = page.locator('#sr_normal > tr')
    count_normal = await items_normal.count()
    for i in range(count_normal):
        item = items_normal.nth(i)
        href = await item.locator('a >> nth=0').get_attribute('href')
        url = 'https://encar.com' + href
        urls.append(url)

    return urls


async def process_url(context, url, conn, sem):
    async with sem:
        page = await context.new_page()
        try:
            info = await get_info(page, url)
            spec_info = await get_spec_info(page, url)
            images_json = json.dumps(await get_images(page, url))
            price = await get_price(page, url)
            cleaned = re.sub(r'[^\d,]', '', price)
            price_won = int(cleaned.replace(',', '')) * 10000
            price_eur = cc(price_won, 'KRW', 'EUR')
            price_rub = cc(price_won, 'KRW', 'RUB')
            engine_cc = int(spec_info['engine_cc'].replace("cc", "").replace(",", "").strip())
            year = int(info['year'])
            calculated = calc(price_rub, engine_cc, year)
            cursor = conn.cursor()

            cursor.execute('''
                INSERT INTO vehicles (car_number, price_won, price_rub, year, month, mileage, fuel_type, images_json, engine_cc, transmission, body_type, color, seats, duty_eur, duty_rub, fee, price_service, total)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                info['car_number'],
                price_won,
                price_rub,
                year,
                info['month'],
                info['mileage'],
                info['fuel_type'],
                images_json,
                engine_cc,
                spec_info['transmission'],
                spec_info['body_type'],
                spec_info['color'],
                spec_info['seats'],
                calculated['duty_eur'],
                calculated['duty_rub'],
                calculated['fee'],
                calculated['price_service'],
                calculated['total'],
            ))
            conn.commit()
        except Exception as e:
            print(f"Ошибка при обработке {url}: {e}")
        finally:
            await page.close()


async def run(playwright: Playwright):
    chromium = playwright.chromium
    context = await chromium.launch_persistent_context(
        user_data_dir="/tmp/playwright",
        headless=True,
        viewport={"width": 1280, "height": 800},
        user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
    )

    page = context.pages[0] if context.pages else await context.new_page()

    # Получение списка URL-ов
    urls = []
    for page_num in range(1):
        url = f"http://www.encar.com/fc/fc_carsearchlist.do?carType=for#!%7B%22action%22%3A%22(And.Hidden.N._.(C.CarType.N._.Manufacturer.BMW.))%22%2C%22toggle%22%3A%7B%7D%2C%22layer%22%3A%22%22%2C%22sort%22%3A%22ModifiedDate%22%2C%22page%22%3A{page_num}%2C%22limit%22%3A20%2C%22searchKey%22%3A%22%22%2C%22loginCheck%22%3Afalse%2C%22cursor%22%3Anull%7D"
        urls += await get_urls(page, url)

    # Установка семафора для ограничения количества одновременных задач
    sem = asyncio.Semaphore(18)  # Можно увеличить до 10 или 15 при необходимости

    # Создание базы данных и таблицы, если они не существуют
    conn = sqlite3.connect('db/vehicles____.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS vehicles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            car_number TEXT,
            price_won INTEGER,
            price_rub INTEGER,
            year INTEGER,
            month TEXT,
            mileage INTEGER,
            fuel_type TEXT,
            images_json TEXT,
            engine_cc INTEGER,
            transmission TEXT,
            body_type TEXT,
            color TEXT,
            seats TEXT,
            duty_eur INTEGER,
            duty_rub INTEGER,
            fee INTEGER,
            price_service INTEGER,
            total INTEGER
        )
    ''')
    conn.commit()

    # Параллельная обработка URL-ов
    tasks = [process_url(context, url, conn, sem) for url in urls]
    await asyncio.gather(*tasks)

    conn.close()
    await context.close()


async def main():
    async with async_playwright() as pw:
        await run(pw)


asyncio.run(main())
