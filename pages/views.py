from django.shortcuts import get_object_or_404, render
from .models import TextPage

def text_page_view(request, slug):
    page = get_object_or_404(TextPage, slug=slug, is_active=True)
    template = page.template_name or "pages/default.html"
    return render(request, template, {"page": page})
