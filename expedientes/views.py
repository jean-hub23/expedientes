from django.http import request, JsonResponse
from django.shortcuts import render
from django.utils.decorators import method_decorator
from django.views import View
from django.contrib.auth.mixins import LoginRequiredMixin
from datetime import datetime
from django.views.decorators.csrf import csrf_exempt

# Panel Principal
from django.views.generic import TemplateView

from expedienteApp.models import Expediente, TipoGiro


class DashboardView(LoginRequiredMixin, TemplateView):
    template_name = 'menu/index.html'

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        data={}
        try:
            action = request.POST['action']
            if action == 'get_graph_rubros':
                data = {
                    'name': 'RO',
                    'data': self.get_graph_ro_month(),
                },{
                    'name': 'RDR',
                    'data': self.get_graph_rdr_month(),
                },{
                    'name': '13',
                    'data': self.get_graph_trans_month(),
                },{
                    'name': '18',
                    'data': self.get_graph_canon_month(),
                };
            elif action == 'get_graph_pie':
                data ={
                    'name' : 'Porcentaje',
                    'colorByPoint': True,
                    'data': self.get_graph_pie(),
                }
            elif action == 'get_resumen':
                data = self.get_resumen()
            else:
                data['error'] = 'Ha ocurrido un error'
        except Exception as e:
            pass
        return JsonResponse(data, safe=False)

    def get_graph_ro_month(self):
        year = datetime.now().year
        data = []
        for m in range(1, 13):
            registros_mes = Expediente.objects.filter(rubro=1, fecha_creacion__year=year, fecha_creacion__month=m)
            data.append(registros_mes.count())
        print(data)
        return data

    def get_graph_rdr_month(self):
        year = datetime.now().year
        data = []
        for m in range(1,13):
            registros_mes = Expediente.objects.filter(rubro=2, fecha_creacion__year=year, fecha_creacion__month=m)
            data.append(registros_mes.count())
        print(data)
        return data

    def get_graph_trans_month(self):
        year = datetime.now().year
        data = []
        for m in range(1,13):
            registros_mes = Expediente.objects.filter(rubro=3, fecha_creacion__year=year, fecha_creacion__month=m)
            data.append(registros_mes.count())
        print(data)
        return data

    def get_graph_canon_month(self):
        year = datetime.now().year
        data = []
        for m in range(1,13):
            registros_mes = Expediente.objects.filter(rubro=4, fecha_creacion__year=year, fecha_creacion__month=m)
            data.append(registros_mes.count())
        print(data)
        return data


    def get_graph_pie(self):
        data = []
        year = datetime.now().year
        try:
            for tipo in TipoGiro.objects.all():
                expedientes_tipo = Expediente.objects.filter(tipo_giro=tipo.id, fecha_creacion__year = year)
                data.append({
                    'name': tipo.abreviatura,
                    'y': expedientes_tipo.count(),
                })
        except:
            pass
        print(data)
        return data

    def get_resumen(self):
        data = []
        year = datetime.now().year
        try:
            for tipo in TipoGiro.objects.all():
                expedientes_tipo = Expediente.objects.filter(tipo_giro=tipo.id, fecha_creacion__year = year)
                data.append({
                    'name': tipo.abreviatura,
                    'cantidad': expedientes_tipo.count(),
                })
        except:
            pass
        print(data)
        return data

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = "Panel de Inicio"
        context['pageview'] = "Resumen"

        return context


# Error 404
class Error404View(View):
    def get(self,request):
        greeting = {}
        greeting['title'] = "Error 404"
        greeting['pageview'] = "Utility"
        return render(request,'pages/utility/pages-404.html',greeting)


# Error 403
class Error403View(View):
    def get(self,request):
        greeting = {}
        greeting['title'] = "Error 403"
        greeting['pageview'] = "Utility"
        return render(request, 'pages/utility/pages-403.html',greeting)


# Error 500
class Error500View(View):
    def get(self,request):
        greeting = {}
        greeting['title'] = "Error 500"
        greeting['pageview'] = "Utility"
        return render(request,'pages/utility/pages-500.html',greeting)