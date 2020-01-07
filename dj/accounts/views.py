from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

from dj.jwt import encode


@csrf_exempt
def login(request):
    # request.META.get('HTTP_REFERER')
    # username = None
    # data = request.user
    if request.method == 'POST':
        jwt_str = encode({'user_id': 1})  # FIXME: 인증받은 user id
        return HttpResponse(jwt_str)

    return HttpResponse('')
