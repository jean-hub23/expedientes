from django.contrib.auth.decorators import login_required
from django.urls import path
from expedienteApp.views import *


urlpatterns = [

    # CCI
    path('inicio_cci/', login_required(InicioExpedienteCCI.as_view()), name='inicio_cci'),
    path('listar_cci/', login_required(ListarExpedienteCCI.as_view()), name='listado_cci'),
    path('crear_expediente_cci/', login_required(CrearExpedienteCCI.as_view()), name = 'crear_cci'),
    path('editar_expediente_cci/<int:pk>/', login_required(ActualizarExpedienteCCI.as_view()), name='editar_cci'),
    path('eliminar_expediente_cci/<int:pk>/', login_required(EliminarExpedienteCCI.as_view()), name='eliminar_cci'),

    # COE
    path('inicio_coe/', login_required(InicioExpedienteCOE.as_view()), name='inicio_coe'),
    path('listar_coe/', login_required(ListarExpedienteCOE.as_view()), name='listado_coe'),
    path('crear_expediente_coe/', login_required(CrearExpedienteCOE.as_view()), name='crear_coe'),
    path('editar_expediente_coe/<int:pk>/', login_required(ActualizarExpedienteCOE.as_view()), name='editar_coe'),
    path('eliminar_expediente_coe/<int:pk>/', login_required(EliminarExpedienteCOE.as_view()), name='eliminar_coe'),

]