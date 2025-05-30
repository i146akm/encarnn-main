from django.contrib import admin
from . import models

class PhotoInline(admin.TabularInline):
    model = models.Photos
    extra = 1
    fields = ['image']

# Админка для CarAd
class CarAdAdmin(admin.ModelAdmin):
    exclude = ['slug']
    inlines = [PhotoInline]  # подключаем инлайн


admin.site.register(models.CarAd, CarAdAdmin)

# Заголовки админки
admin.site.site_header = "Администрирование"
admin.site.index_title = "Управление объявлениями"
