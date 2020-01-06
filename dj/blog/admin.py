from django.contrib import admin
from .models import Post


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['id', 'message', 'updated_at']
    list_display_links = ['message']
    search_fields = ['message']
    list_filter = ['updated_at']
