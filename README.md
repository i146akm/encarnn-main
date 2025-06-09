# 🚗 Encar Car Parser & Customs Calculator

Парсер автомобилей с корейского сайта [Encar](https://www.encar.com/), сохраняющий информацию в базу данных SQLite и автоматически рассчитывающий таможенные пошлины на основе параметров автомобиля.

---

## 📦 Функциональность

- 🔍 Парсинг объявлений о продаже автомобилей с Encar
- 🌐 Перевод комплектаций и названий на русский язык
- 💰 Расчёт таможенных пошлин (на основе года, двигателя и т.д.)
- 🗃️ Сохранение данных в SQLite
- 🖥️ Django-интерфейс для просмотра и фильтрации автомобилей

---

## 🛠️ Установка

```bash
git clone https://github.com/your-username/encar-parser.git
cd encar-parser
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
