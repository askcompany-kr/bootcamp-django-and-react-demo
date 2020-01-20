from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.forms import AuthenticationForm
from django.forms import forms

from dj.jwt import encode

User = get_user_model()


class LoginForm(AuthenticationForm):
    def clean(self):
        credentials = {
            'username': self.cleaned_data.get('username'),
            'password': self.cleaned_data.get('password'),
        }
        user: User = authenticate(**credentials)
        if user:
            if not user.is_active:
                raise forms.ValidationError('User account is disabled.')
            jwt_token = jwt_payload_handler(user)
            return {
                'token': jwt_token,
                'user': user,
            }
        else:
            raise forms.ValidationError('Unable to login with provided credentials.')


def jwt_payload_handler(user):
    jwt_token = encode({'user_id': user.id, 'username': user.username, 'email': user.email})
    return jwt_token


def jwt_response_payload_handler(token, user, request):
    return {
        'token': token,
    }
