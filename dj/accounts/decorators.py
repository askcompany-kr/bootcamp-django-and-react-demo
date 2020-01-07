from urllib.parse import urlparse

from django.conf import settings
from django.http import HttpResponse
from django.shortcuts import redirect, resolve_url


def login_required(view_fn):
    def view(request, *args, **kwargs):
        if not request.user.is_authenticated:
            if request.is_ajax():
                return HttpResponse('Unauthorized', status=401)

            path = request.build_absolute_uri()
            resolved_login_url = resolve_url(settings.LOGIN_URL)
            login_scheme, login_netloc = urlparse(resolved_login_url)[:2]
            current_scheme, current_netloc = urlparse(path)[:2]
            if ((not login_scheme or login_scheme == current_scheme) and
                    (not login_netloc or login_netloc == current_netloc)):
                path = request.get_full_path()
            from django.contrib.auth.views import redirect_to_login
            return redirect_to_login(path, resolved_login_url)

        return view_fn(request, *args, **kwargs)
    return view
