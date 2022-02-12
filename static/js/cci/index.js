function listadoCCI(){
    $.ajax({
        url: "/expediente/listar_cci/",
        type: "get",
        dataType: "json",
        success: function (response) {
            console.log(response);
            if ($.fn.DataTable.isDataTable('#datatable_cci')) {
                $('#datatable_cci').DataTable().destroy();
            }
            $('#datatable_cci tbody').html("");
            for(let i = 0 ; i< response.length; i++){
                let fila = '<tr>';
                fila += '<td>' + response[i]["fields"]['registro_siaf'] + '</td>';
                fila += '<td>' + response[i]["fields"]['numero_comprobante'] + '</td>';
                fila += '<td>' + response[i]["fields"]['rubro'] + '</td>';
                fila += '<td>' + response[i]["fields"]['descripcion'] + '</td>';
                fila += '<td>' + response[i]["fields"]['monto'] + '</td>';
                fila += '<td>' + response[i]["fields"]['fecha_creacion'].substring(0,10).split("-").reverse().join("-") + '</td>';
                fila += '<td><button type="button" class="btn btn-primary btn-sm" onclick="abrir_modal_edicion(\'/expediente/editar_expediente_cci/' + response[i]['pk'] + '/\');"><i class="fas fa-edit"></i></button>';
                fila += '&nbsp'
                fila += '<button type="button" class="btn btn-danger btn-sm" onclick="abrir_modal_eliminacion(\'/expediente/eliminar_expediente_cci/' + response[i]['pk'] + '/\');"><i class="fas fa-trash-alt "></i></button></td>';
                fila += '</tr>';
                $('#datatable_cci tbody').append(fila);
            };
            var a = $('#datatable_cci').DataTable({
                language: {
                    "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
                },
                drawCallback: function () {
                    $(".dataTables_paginate > .pagination").addClass("pagination-rounded");
                },
                dom: 'Bfrtip',
                buttons: [
                    {
                        extend: 'collection',
                        text: 'Control',
                        orientation: 'landscape',
                        className: 'btn btn-outline-info mr-2',

                        buttons: [
                            {
                                extend: 'copy',
                                text: 'Copiar',
                                className: 'btn btn-success',
                            },
                            {
                                extend: 'pdf',
                                text: 'PDF',
                                className: 'btn btn-success',
                            },

                            {
                                extend: 'excel',
                                text: 'Excel',
                                className: 'btn btn-success',
                            },

                            {
                                text: 'Imprimir',
                                extend: 'print',
                                className: 'btn btn-success',
                            },
                        ]
                    },
                    {
                        extend: 'colvis',
                        text: 'Visor de columnas',
                        pageSize : 'LEGAL',
                        className: 'btn btn-outline-info mr-2',
                        orientation: 'landscape',
                        postfixButtons: [
                            {
                                extend: 'colvisGroup',
                                text: 'Seleccionar Todo',
                                show: ':hidden',
                            }
                        ]
                    }
                ],
                "autoWidth": true
            });
            a.buttons().container().appendTo("#datatable_cci_wrapper .col-md-6:eq(0)"),
            $('#datatable_cci tbody').on('click', 'tr', function () {
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                } else {
                    $('#datatable_cci').DataTable().$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                }
            });
        },
        error: function (error) {
            console.log("error");
        }
    });
}

$(document).ready(function(){
    console.log('estoy en index cci')
    listadoCCI();
})

function editar_cci() {
    activarBoton();
    $.ajax({
        data: $('#form_edicion_cci').serialize(),
        url:  $('#form_edicion_cci').attr('action'),
        type: $('#form_edicion_cci').attr('method'),

        success: function (response) {
            notificacionSuccess(response.mensaje);
            listadoCCI();
            cerrar_modal_edicion();
        },

        error: function (error) {
            notificacionError(error.responseJSON.mensaje);
            mostrarErroresEdicion(error);
            activarBoton();
        }
    });
}

function eliminar_cci(pk){
    $.ajax({
        data: {
            csrfmiddlewaretoken: $("[name='csrfmiddlewaretoken']").val()
        },
        url: '/expediente/eliminar_expediente_cci/' + pk + '/',
        type: 'post',

        success: function (response) {
            console.log(response.mensaje)
            notificacionSuccess(response.mensaje);
            listadoCCI();
            cerrar_modal_eliminacion();
        },

        error: function (error) {
            notificacionError(error.responseJSON.mensaje);
        }
    });
}
