from django.contrib import admin
from django.urls import path
from django.urls import include


# from expedientes import views
from expedientes.views import *
urlpatterns = [
    # MENU
    path('', DashboardView.as_view(), name='dashboard'),  # Dashboard

    # APPS
    path('expediente/', include(('expedienteApp.urls', 'expediente'))),
    path('consulta/', include(('consulta.urls', 'consulta'))),
    path('authentication/', include('authentication.urls')),  # Authentication
    path('admin/', admin.site.urls),
    path('utility/error-403', Error403View.as_view(), name='pages-403'),  # Error 403
    path('utility/error-404', Error404View.as_view(), name='pages-404'),  # Error 404
    path('utility/error-500', Error500View.as_view(), name='pages-500'),  # Error 500
]

handler403 = Error403View.as_view()
handler404 = Error404View.as_view()
handler500 = Error500View.as_view()
