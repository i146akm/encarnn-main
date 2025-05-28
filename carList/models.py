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
    created_at = models.DateTimeField(auto_now_add=True)
    slug = models.SlugField(unique=True, blank=True, null=True)


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