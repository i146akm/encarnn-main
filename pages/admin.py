from django.contrib import admin
from .models import TextPage

@admin.register(TextPage)
class TextPageAdmin(admin.ModelAdmin):
    list_display = ("title", "slug", "is_active", "updated_at")
    search_fields = ("title", "slug")
    list_filter = ("is_active", "updated_at")
    prepopulated_fields = {"slug": ("title",)}
