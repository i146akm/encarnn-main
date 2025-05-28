from django.db import models
from ckeditor.fields import RichTextField

class TextPage(models.Model):
    title = models.CharField("Заголовок", max_length=200)
    slug = models.SlugField("Слаг (URL)", unique=True)
    content = RichTextField("Содержимое", blank=True)
    is_active = models.BooleanField("Опубликована", default=True)
    template_name = models.CharField("Шаблон", max_length=100, blank=True)
    meta_title = models.CharField("Заголовок страницы", max_length=200, blank=True)
    meta_description = models.TextField("Meta Description", blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Страница'
        verbose_name_plural = 'Страницы'