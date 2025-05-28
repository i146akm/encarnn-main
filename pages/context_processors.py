from .models import TextPage

def pages_menu(request):
    pages = TextPage.objects.filter(is_active=True).order_by('title')
    return {"menu_pages": pages}
