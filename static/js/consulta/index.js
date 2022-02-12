function consultar() {
    activarBoton();
    $.ajax({
        data: $('#form_consulta').serialize(),
        url: $('#form_consulta').attr('action'),
        type: $('#form_consulta').attr('method'),

        success: function (response) {
            console.log('exito')
            console.log(response)
            $('#datatable_resultado thead').html("");
            $('#datatable_resultado tbody').html("");
            if ($('#resultado-texto').html() != "") {
                $('#resultado-texto').html("");
            }

            if (response.length > 0) {
                console.log('Hay expedientes que han sido girados antes de un mes');
                let mensaje = "<h2>Hay " + response.length + " Expediente(s) Girado(s) en los ultimos 30 dias para este Registro Siaf</h2>";
                $('#resultado-texto').html(mensaje);
                let cabezales = '<th>Fecha de Giro</th>'+
                                '<th>Siaf</th>' +
                                '<th>Numero Comprobante</th>' +
                                '<th>Rubro</th>' +
                                '<th>Descripcion</th>' +
                                '<th>Monto</th>';

                $('#datatable_resultado thead').append(cabezales);

                for (let i = 0; i < response.length; i++) {
                    let fila = '<tr>';
                    fila += '<td>' + response[i]["fields"]['fecha_creacion'].substring(0, 10).split("-").reverse().join("-") + '</td>';
                    fila += '<td>' + response[i]["fields"]['registro_siaf'] + '</td>';
                    fila += '<td>' + response[i]["fields"]['numero_comprobante'] + '</td>';
                    fila += '<td>' + response[i]["fields"]['rubro'] + '</td>';
                    fila += '<td>' + response[i]["fields"]['descripcion'] + '</td>';
                    fila += '<td>' + response[i]["fields"]['monto'] + '</td>';
                    fila += '</tr>';
                    $('#datatable_resultado tbody').append(fila);
                };
            } else {
                $('#resultado-texto').html("");
                let mensaje = '<h2>No hay Expediente Girado en los ultimos 30 dias para este Registro Siaf</h2>';
                $('#resultado-texto').html(mensaje);
            };
            grecaptcha.reset();
            activarBoton();

        },
        error: function (error) {
            console.log('hay un error')
            console.log(error);
            $('#resultado-texto').html("");
            if($('#datatable_resultado thead').html()!= ""){
                $('#datatable_resultado thead').html("");
                $('#datatable_resultado tbody').html("");
            }
            console.log('entra cuando no hay nada en el div');
                let mensaje = "<h2>" + error.responseJSON.mensaje  + "</h2>"
                $('#resultado-texto').html(mensaje)
            grecaptcha.reset();
            activarBoton();
        }
    })
}

function activarBoton() {
  if ($('#boton_consultar').prop('disabled')) {
    $('#boton_consultar').prop('disabled', false);
  } else {
    $('#boton_consultar').prop('disabled', true);
  }
}