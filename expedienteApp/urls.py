from django.urls import path
from expedienteApp.views import *


urlpatterns = [

    # CCI
    path('inicio_cci/', InicioExpedienteCCI.as_view(), name='inicio_cci'),
    path('listar_cci/', ListarExpedienteCCI.as_view(), name='listado_cci'),
    path('crear_expediente_cci/', CrearExpedienteCCI.as_view(), name = 'crear_cci'),
    path('editar_expediente_cci/<int:pk>/', ActualizarExpedienteCCI.as_view(), name='editar_cci'),
    path('eliminar_expediente_cci/<int:pk>/', EliminarExpedienteCCI.as_view(), name='eliminar_cci'),

    # COE
    path('inicio_coe/', InicioExpedienteCOE.as_view(), name='inicio_coe'),
    path('listar_coe/', ListarExpedienteCOE.as_view(), name='listado_coe'),
    path('crear_expediente_coe/', CrearExpedienteCOE.as_view(), name='crear_coe'),
    path('editar_expediente_coe/<int:pk>/', ActualizarExpedienteCOE.as_view(), name='editar_coe'),
    path('eliminar_expediente_coe/<int:pk>/', EliminarExpedienteCOE.as_view(), name='eliminar_coe'),

]