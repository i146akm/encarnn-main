from django.db import models

class SiteSettings(models.Model):
    background_image = models.ImageField("Фоновое изображение", upload_to='backgrounds/', blank=True, null=True)
    phone_number = models.CharField("Номер телефона", max_length=20, blank=True, null=True)
    email = models.EmailField("Электронная почта", blank=True, null=True)
    telegram_url = models.URLField("Ссылка на Telegram", blank=True, null=True)
    instagram_url = models.URLField("Ссылка на Instagram", blank=True, null=True)
    whatsapp_url = models.URLField("Ссылка на WhatsApp", blank=True, null=True)
    questions = models.URLField('Куда переводить при кнопке "Задать вопрос по Авто"? ', blank=True, null=True)
    def __str__(self):
        return "Настройки сайта"

    class Meta:
        verbose_name = "Настройки сайта"
        verbose_name_plural = "Настройки сайта"
