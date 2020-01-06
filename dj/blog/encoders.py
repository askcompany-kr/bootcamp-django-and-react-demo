import types

from django.core.serializers.json import DjangoJSONEncoder
from django.db.models import QuerySet


class JSONEncoder(DjangoJSONEncoder):
    def default(self, o):
        if hasattr(o, 'as_dict'):
            return o.as_dict()
        elif isinstance(o, (set, types.GeneratorType, QuerySet)):
            return tuple(o)
        return super().default(o)
