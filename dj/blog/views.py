from django.http import JsonResponse

from dj.jwt import jwt_validate_required
from .encoders import JSONEncoder
from .models import Post


@jwt_validate_required
def index(request):
    print("request.user :", request.user)
    qs = Post.objects.all()
    return JsonResponse(qs, encoder=JSONEncoder, safe=False)
