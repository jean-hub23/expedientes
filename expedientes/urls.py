
from django.contrib import admin
from django.urls import path
from django.urls import include


# from expedientes import views
from expedientes.views import *
urlpatterns = [
    # MENU
    path('', DashboardView.as_view(), name='dashboard'),  # Dashboard
    path('menu/calendar', CalendarView.as_view(), name='calendar'),  # Calender
    path('menu/chat', ChatView.as_view(), name='chat'),  # Chat
    path('menu/app-kanban-board', KanbanBoardView.as_view(), name='app-kanban-board'),  # Kanban Board
    # path('', InicioExpediente.as_view(), name='index'),
    
    # APPS
    path('expediente/', include(('expedienteApp.urls', 'expediente'))),
    path('consulta/', include(('consulta.urls', 'consulta'))),
    path('ecommerce/', include('ecommerce.urls')),  # Ecommerce
    path('email/', include('mail.urls')),  # Email
    path('layouts/', include('layouts.urls')),  # Layout
    path('pages/', include('utility.urls')),  # Utility
    path('components/', include('components.urls')),  # Components
    path('authentication/', include('authentication.urls')),  # Authentication

    path('admin/', admin.site.urls),

]
