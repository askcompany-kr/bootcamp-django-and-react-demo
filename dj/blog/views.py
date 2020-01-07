from django.http import JsonResponse

from accounts.decorators import login_required
from .encoders import JSONEncoder
from .models import Post


@login_required
def index(request):
    print("request.user :", request.user)
    qs = Post.objects.all()
    return JsonResponse(qs, encoder=JSONEncoder, safe=False)
