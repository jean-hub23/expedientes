
function get_graph_rubros() {
    $.ajax({
        url:window.location.pathname,
        type: 'post',
        data: {
            'action': 'get_graph_rubros'
        },
        dataType: 'json',
        success: function (response) {
            console.log(response);
            Highcharts.chart('container-column-basic', {
                lang: {
                    viewFullscreen: "Ver en pantalla completa",
                    exitFullscreen: "Salir de pantalla completa",
                    printChart: "Imprimir Grafico",
                    downloadPNG: "Descargar PNG",
                    downloadJPEG: "Descargar JPEG",
                    downloadPDF: "Descargar PDF",
                    downloadSVG: "Descargar SVG",
                    downloadCSV: "Descarga CSV",
                    downloadXLS: "Descarga XLS",
                    viewData: "Mirar Tabla"
                },
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Registro de expedientes del año 2022'
                },
                subtitle: {
                    text: 'Expedientes clasificados por Rubro'
                },
                xAxis: {
                    categories: [
                        'Enero',
                        'Febrero',
                        'Marzo',
                        'Abril',
                        'Mayo',
                        'Junio',
                        'Julio',
                        'Agosto',
                        'Septiembre',
                        'Octubre',
                        'Noviembre',
                        'Diciembre'
                    ],
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Cantidad de Expedientes'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y} expedientes</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: [
                    {
                        name: response[0].name,
                        data: response[0].data,
                    },
                    {
                        name: response[1].name,
                        data: response[1].data,
                    },
                    {
                        name: response[2].name,
                        data: response[2].data,
                    },
                    {
                        name: response[3].name,
                        data: response[3].data,
                    },
                ]
            });
        },
        error: function (error) {
            console.log(error)
        }
    });
};

$(document).ready(function(){
    get_graph_rubros();
})