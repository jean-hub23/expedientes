from django import forms
from captcha.fields import ReCaptchaField


class ConsultaForm(forms.Form):
    siaf = forms.IntegerField(label='Registro Siaf')
    captcha = ReCaptchaField()