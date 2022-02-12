from django import forms

from expedienteApp.models import Expediente


class ExpedienteForm(forms.ModelForm):
    class Meta:
        model = Expediente
        fields =  ['registro_siaf', 'numero_comprobante', 'rubro', 'descripcion', 'monto']

        labels = {
            'registro_siaf' : 'Registro Siaf',
            'numero_comprobante': 'Numero de Comprobante de Pago',
            'rubro': 'Rubro del Expediente',
            'descripcion': 'Descripcion ',
            'monto': 'Monto',
        }
        widgets = {
            'registro_siaf' :forms.NumberInput(
                attrs={
                    'class': 'form-control',
                    'placeholder': 'Ingrese el registro siaf'
                }
            ),
            'numero_comprobante': forms.NumberInput(
                attrs={
                    'class': 'form-control',
                    'placeholder': 'Ingrese el Numero de Comprobante de Pago',
                }
            ),
            'rubro' : forms.Select(
                attrs = {
                    'class' : 'form-control',
                    'placeholder': 'Ingrese el tipo de rubro que pertenece'
                },
            ),
            'descripcion': forms.TextInput(
                attrs={
                    'class': 'form-control',
                    'placeholder': 'Ingrese la descripcion'
                }
            ),
            'monto': forms.NumberInput(
                attrs={
                    'class': 'form-control',
                    'placeholder': 'Ingrese el monto'
                }
            ),
        }