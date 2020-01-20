import json

from django.contrib.auth import get_user_model
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

from .forms import LoginForm, jwt_response_payload_handler

User = get_user_model()


@csrf_exempt
@require_POST
def login(request) -> HttpResponse:
    data = json.loads(request.body)
    form = LoginForm(request, data)  # AuthenticationForm은 첫번째 인자로 HttpRequest를 받습니다.
    if form.is_valid():
        jwt_token = form.cleaned_data['token']
        user: User = form.cleaned_data['user']
        return JsonResponse({
            'token': jwt_token,
            'user': {
                'username': user.username,
                'email': user.email,
            },
        })
    return JsonResponse({
        'errors': form.errors,
    })


# TODO: refresh jwt

# TODO: verify jwt
