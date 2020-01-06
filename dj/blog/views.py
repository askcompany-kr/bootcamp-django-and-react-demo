from django.http import JsonResponse

from .encoders import JSONEncoder
from .models import Post


def index(request):
    qs = Post.objects.all()
    return JsonResponse(qs, encoder=JSONEncoder, safe=False)
