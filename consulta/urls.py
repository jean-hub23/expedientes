from django.contrib import admin
from django.urls import path
from consulta.views import ConsultaFormView

urlpatterns = [
    path('', ConsultaFormView.as_view(), name='inicio-consulta'),
]