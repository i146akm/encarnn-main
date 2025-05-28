from django.contrib import admin
from . import models


class CarAdAdmin(admin.ModelAdmin):
    exclude = ['slug']

admin.site.register(models.CarAd, CarAdAdmin)

admin.site.site_header = "Администрирование"
admin.site.index_title = "Управление объявлениями"
