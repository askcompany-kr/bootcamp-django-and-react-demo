from django.http import HttpResponse

from dj.jwt import encode


def login(request):
    # request.META.get('HTTP_REFERER')
    # username = None
    # data = request.user
    jwt_str = encode({'user_id': 1})  # FIXME: 인증받은 user id
    return HttpResponse(jwt_str)
