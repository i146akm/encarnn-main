from django.db import models
from django.utils.text import slugify
from django.core.validators import MinValueValidator, MaxValueValidator


class CarAd(models.Model):
    BRAND_CHOICES = [
        ("Aston Martin", "Aston Martin"),
        ("Audi", "Audi"),
        ("Bentley", "Bentley"),
        ("Benz (Mercedes-Benz)", "Benz (Mercedes-Benz)"),
        ("BMW", "BMW"),
        ("Book Ki Eun Award", "Book Ki Eun Award"),
        ("Cadillac", "Cadillac"),
        ("Chevrolet", "Chevrolet"),
        ("Chevrolet (GM Daewoo)", "Chevrolet (GM Daewoo)"),
        ("Chrysler", "Chrysler"),
        ("Citroen / DS", "Citroen / DS"),
        ("Daihatsu", "Daihatsu"),
        ("Dodge", "Dodge"),
        ("Dongfeng", "Dongfeng"),
        ("Ferrari", "Ferrari"),
        ("Fiat", "Fiat"),
        ("Folstar", "Folstar"),
        ("Ford", "Ford"),
        ("Genesis", "Genesis"),
        ("GMC", "GMC"),
        ("Honda", "Honda"),
        ("Hyundai", "Hyundai"),
        ("Infinity", "Infinity"),
        ("Isuzu", "Isuzu"),
        ("Jaguar", "Jaguar"),
        ("Jeep", "Jeep"),
        ("Kia", "Kia"),
        ("Lamborghini", "Lamborghini"),
        ("Land Rover", "Land Rover"),
        ("Lexus", "Lexus"),
        ("Lincoln", "Lincoln"),
        ("Lotus", "Lotus"),
        ("Maserati", "Maserati"),
        ("Matsuda", "Matsuda"),
        ("McLaren", "McLaren"),
        ("Mini", "Mini"),
        ("Nissan", "Nissan"),
        ("Peugeot", "Peugeot"),
        ("Porsche", "Porsche"),
        ("Renault", "Renault"),
        ("Renault-Korea", "Renault-Korea"),
        ("Rolls-Royce", "Rolls-Royce"),
        ("Smart", "Smart"),
        ("Ssangyong", "Ssangyong"),
        ("Suzuki", "Suzuki"),
        ("Tesla", "Tesla"),
        ("Toyota", "Toyota"),
        ("Volkswagen", "Volkswagen"),
        ("Volvo", "Volvo"),
        ("Прочие бренды", "Прочие бренды"),
        ("Other imported cars", "Other imported cars"),
    ]
    COLOR_CHOICES = [
        ("Белый", "Белый"),
        ("Белый двухтонный", "Белый двухтонный"),
        ("Бирюзовый", "Бирюзовый"),
        ("Галактический серый", "Галактический серый"),
        ("Желто-золотой", "Желто-золотой"),
        ("Желтый", "Желтый"),
        ("Жемчужный", "Жемчужный"),
        ("Жемчужный двухтонный", "Жемчужный двухтонный"),
        ("Зеленый", "Зеленый"),
        ("Золотой", "Золотой"),
        ("Золотой двухтонный", "Золотой двухтонный"),
        ("Коричневый", "Коричневый"),
        ("Коричневый двухтонный", "Коричневый двухтонный"),
        ("Красный", "Красный"),
        ("Лаймовый", "Лаймовый"),
        ("Не определен", "Не определен"),
        ("Небесно-голубой", "Небесно-голубой"),
        ("Розовый", "Розовый"),
        ("Серебристо-серый", "Серебристо-серый"),
        ("Серебристый-двухтонный", "Серебристый-двухтонный"),
        ("Серебряный", "Серебряный"),
        ("Серый", "Серый"),
        ("Синий", "Синий"),
        ("Сиреневый", "Сиреневый"),
        ("Темно-зеленый", "Темно-зеленый"),
        ("Темно-серый", "Темно-серый"),
        ("Темно-черный", "Темно-черный"),
        ("Тростниковый", "Тростниковый"),
        ("Фиолетовый", "Фиолетовый"),
        ("Черный", "Черный"),
        ("Черный двухтонный", "Черный двухтонный"),
        ("Яркий серебристый", "Яркий серебристый"),
    ]
    TRANSMISSION_CHOICES = [
        ('Автомат (все типы)', 'Автомат (все типы)'),
        ('Вариатор', 'Вариатор'),
        ('Другое', 'Другое'),
        ('Полуавтоматическая', 'Полуавтоматическая'),
        ('Ручная', 'Ручная'),
    ]
    FUEL_TYPE_CHOICES = [
        ("Бензин", "Бензин"),
        ("Бензин + Сжиженный газ", "Бензин + Сжиженный газ"),
        ("Бензин + Сжиженный природный газ", "Бензин + Сжиженный природный газ"),
        ("Бензин + Электричество", "Бензин + Электричество"),
        ("Водород", "Водород"),
        ("Дизель", "Дизель"),
        ("Дизель + электричество", "Дизель + электричество"),
        ("Не определено", "Не определено"),
        ("Сжиженный газ", "Сжиженный газ"),
        ("Электричество", "Электричество"),
    ]
    WARRANTY_CHOICES = [
        ("Да", "Да"),
        ("Нет", "Нет"),
    ]
    brand = models.CharField('Марка ', choices=BRAND_CHOICES, null=True)
    model = models.CharField('Модель', max_length=255, null=True)
    name = models.CharField('Название ', max_length=255, default='Без названия')
    main_photo = models.ImageField(upload_to='cars/', verbose_name='Загрузите фото')
    year = models.PositiveIntegerField('Год выпуска ',
        validators=[
            MinValueValidator(2004),
            MaxValueValidator(2025)
        ],
        null=True
    )
    month = models.PositiveSmallIntegerField('Месяц выпуска ',
        validators=[
            MinValueValidator(1),
            MaxValueValidator(12)
        ],
        null=True
    )
    fuel_type = models.CharField('Топливо', choices=FUEL_TYPE_CHOICES, null=True)
    mileage = models.PositiveIntegerField('Пробег', )
    color = models.CharField('Цвет', choices=COLOR_CHOICES, null=True)
    price = models.FloatField('Цена',
        null=True,
    )
    engine = models.FloatField('Объём двигателя',
        null=True,
    )
    transmission = models.CharField('Трансмиссия', choices=TRANSMISSION_CHOICES, null=True)
    vin = models.CharField('VIN - код', max_length=255, null=True)
    body_type = models.CharField('Тип кузова', max_length=255, null=True)
    inspection_date = models.CharField('Дата инспекции', max_length=255, null=True)
    gen = models.CharField('Комплектация', max_length=255, null=True)
    warranty = models.CharField('Гарантия', choices=WARRANTY_CHOICES, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    slug = models.SlugField(unique=True, blank=True, null=True)

    # Design
    option_1_1 = models.BooleanField("Люк", default=False, null=True)
    option_1_2 = models.BooleanField("Головная лампа (светодиод)", default=False, null=True)
    option_1_3 = models.BooleanField("Электрический багажник с электроприводом", default=False, null=True)
    option_1_4 = models.BooleanField("Призрачное закрытие двери", default=False, null=True)
    option_1_5 = models.BooleanField("Электропривод складывающихся боковых зеркал", default=False, null=True)
    option_1_6 = models.BooleanField("Алюминиевые диски", default=False, null=True)
    option_1_7 = models.BooleanField("Багажник на крыше", default=False, null=True)
    option_1_8 = models.BooleanField("Подогрев руля", default=False, null=True)
    option_1_9 = models.BooleanField("Электропривод рулевого колеса", default=False, null=True)
    option_1_10 = models.BooleanField("Переключение передач веслами", default=False, null=True)
    option_1_11 = models.BooleanField("Пульт дистанционного управления на рулевом колесе", default=False, null=True)
    option_1_12 = models.BooleanField("Зеркало в комнате КСМ", default=False, null=True)
    option_1_13 = models.BooleanField("Высокий проход", default=False, null=True)
    option_1_14 = models.BooleanField("Электропривод дверного замка", default=False, null=True)
    option_1_15 = models.BooleanField("Усилитель руля", default=False, null=True)
    option_1_16 = models.BooleanField("Электрические окна", default=False, null=True)

    # Safety
    option_2_1 = models.BooleanField("Подушка безопасности (сиденье водителя, сиденье пассажира)", default=False, null=True)
    option_2_2 = models.BooleanField("Подушка безопасности (боковая)", default=False, null=True)
    option_2_3 = models.BooleanField("Подушка безопасности (шторка)", default=False, null=True)
    option_2_4 = models.BooleanField("Антиблокировочная система тормозов (ABS)", default=False, null=True)
    option_2_5 = models.BooleanField("Противоскользящее покрытие (TCS)", default=False, null=True)
    option_2_6 = models.BooleanField("Электронная система контроля устойчивости (ESC)", default=False, null=True)
    option_2_7 = models.BooleanField("Датчик давления в шинах (TPMS)", default=False, null=True)
    option_2_8 = models.BooleanField("Система предупреждения о выезде с полосы движения (LDWS)", default=False, null=True)
    option_2_9 = models.BooleanField("Поддержка с электронным управлением (ECS)", default=False, null=True)
    option_2_10 = models.BooleanField("Датчик парковки (передний, задний)", default=False, null=True)
    option_2_11 = models.BooleanField("Система предупреждения о боковом столкновении сзади", default=False, null=True)
    option_2_12 = models.BooleanField("Задняя камера", default=False, null=True)
    option_2_13 = models.BooleanField("Обзор на 360 градусов", default=False, null=True)

    # Comfort
    option_3_1 = models.BooleanField("Круиз-контроль (обычный, адаптивный)", default=False, null=True)
    option_3_2 = models.BooleanField("Проекционный дисплей (HUD)", default=False, null=True)
    option_3_3 = models.BooleanField("Электронный стояночный тормоз (EPB)", default=False, null=True)
    option_3_4 = models.BooleanField("Автоматическое кондиционирование воздуха", default=False, null=True)
    option_3_5 = models.BooleanField("Смарт-ключ", default=False, null=True)
    option_3_6 = models.BooleanField("Беспроводной дверной замок", default=False, null=True)
    option_3_7 = models.BooleanField("Датчик дождя", default=False, null=True)
    option_3_8 = models.BooleanField("Автоматический свет", default=False, null=True)
    option_3_9 = models.BooleanField("Шторка/жалюзи (заднее сиденье, сзади)", default=False, null=True)
    option_3_10 = models.BooleanField("Навигация", default=False, null=True)
    option_3_11 = models.BooleanField("AV-монитор на переднем сиденье", default=False, null=True)
    option_3_12 = models.BooleanField("AV-монитор на заднем сиденье", default=False, null=True)
    option_3_13 = models.BooleanField("Bluetooth", default=False, null=True)
    option_3_14 = models.BooleanField("CD-плеер", default=False, null=True)
    option_3_15 = models.BooleanField("USB-порт", default=False, null=True)
    option_3_16 = models.BooleanField("AUX-приемник", default=False, null=True)

    # Seat
    option_4_1 = models.BooleanField("Кожаные сиденья", default=False, null=True)
    option_4_2 = models.BooleanField("Электропривод сидений (водительское сиденье, пассажирское сиденье)", default=False, null=True)
    option_4_3 = models.BooleanField("Электропривод сидений (задние сиденья)", default=False, null=True)
    option_4_4 = models.BooleanField("Подогрев сидений (передних и задних)", default=False, null=True)
    option_4_5 = models.BooleanField("Сиденья с памятью (водительское сиденье, пассажирское сиденье)", default=False, null=True)
    option_4_6 = models.BooleanField("Вентилируемые сиденья (водительское сиденье, пассажирское сиденье)",
                                     default=False, null=True)
    option_4_7 = models.BooleanField("Вентилируемые сиденья (задние сиденья)", default=False, null=True)
    option_4_8 = models.BooleanField("Массажная простыня", default=False, null=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.name)
            slug = base_slug
            counter = 2
            while CarAd.objects.filter(slug=slug).exists():
                slug = f'{base_slug}-{counter}'
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Объявление'
        verbose_name_plural = 'Объявления'

class Photos(models.Model):
    car = models.ForeignKey(CarAd, on_delete=models.CASCADE, related_name='photos')
    image = models.ImageField(upload_to='car_photos/')

    def __str__(self):
        return f'Фото для {self.car.name}'