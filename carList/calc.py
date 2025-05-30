def calculate_all(price_rub, engine, year, commercial=False):
    from datetime import datetime
    from data.currency import convert_currency as cc_func

    if cc_func is None:
        raise ValueError("Необходимо передать функцию cc_func для конвертации валют.")

    # Перевод с литров в сантиметры
    engine_cc = engine * 1000
    # Возраст авто
    age = datetime.now().year - year

    # Конвертация валют
    eur = cc_func(price_rub, 'RUB', 'EUR')

    # === Customs Duty ===
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
        duty = max(eur * percent, engine_cc * min_per_cm3)
    else:
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
        duty = engine_cc * rate

    duty_rub = cc_func(duty, 'EUR', 'RUB')
    # === Utilization Fee ===
    base_fee = 20000 if not commercial else 150000
    if age < 3:
        k = 0.17 if engine_cc <= 3000 else 107.67 if engine_cc <= 3500 else 137.11
    else:
        k = 0.26 if engine_cc <= 3000 else 165.84 if engine_cc <= 3500 else 180.24
    fee = round(base_fee * k, 2)

    # === Price Service ===
    base_price = price_rub + 140000
    price_service = round(base_price * 1.12, 2)

    # === Total sum ===
    total = fee + duty_rub + price_service + 2000000
    return {
        'duty_eur': round(duty, 2),
        'duty_rub': round(duty_rub, 2),
        'fee': round(fee, 2),
        'price_service': round(price_service, 2),
        'total': round(total, 2),
    }
