from typing import Any, Dict, Callable
import datetime
import jwt

from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth import login as auth_login
from django.http import HttpResponse, HttpRequest


def encode(data: Dict[str, Any]) -> str:
    iat = datetime.datetime.utcnow()
    exp = iat + datetime.timedelta(seconds=settings.JWT_EXPIRATION_DELTA)
    encoded_str = jwt.encode(dict(data, iat=iat, exp=exp), settings.JWT_SECRET_KEY,
                             algorithm=settings.JWT_ALGORITHM)
    return encoded_str


def decode(encoded_str) -> Dict[str, Any]:
    data = jwt.decode(encoded_str, settings.JWT_SECRET_KEY, algorithms=settings.JWT_ALGORITHM)
    return data


def jwt_validate_required(view_fn: Callable):
    def wrap(request: HttpRequest, *args, **kwargs) -> HttpResponse:
        authorization = request.META.get('HTTP_AUTHORIZATION')
        if authorization:
            try:
                auth_type, credentials = authorization.split(' ', 1)
                if auth_type != 'Token':
                    return HttpResponse('Invalid authorization type', status=401)

                data = decode(credentials)
                user_id = data['user_id']

                qs = get_user_model().objects.all()  # FIXME: 제한
                user = qs.get(pk=user_id)
                auth_login(request, user)

                return view_fn(request, *args, **kwargs)
            except (ValueError, jwt.InvalidTokenError):
                pass

        return HttpResponse('Unauthorized', status=401)

    return wrap