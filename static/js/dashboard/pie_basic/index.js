    var graficoPie = Highcharts.chart('container-pie-basic', {
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
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Reporte por tipo de expediente'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },
    });

function get_graph_pie() {
    $.ajax({
        url:window.location.pathname,
        type: 'post',
        data: {
            'action': 'get_graph_pie'
        },
        dataType: 'json',
        success: function (response) {
            console.log(response);
            graficoPie.addSeries(response);
            var total = response.data[0].y + response.data[1].y;
            coe_porc = (response.data[0].y / total)*100;
            cci_porc = (response.data[1].y / total)*100;
            console.log(total);

            document.getElementById('brand-pie-cci').innerHTML = cci_porc.toFixed(1) + "%";
            document.getElementById('brand-pie-coe').innerHTML = coe_porc.toFixed(1) + "%" ;


        },
        error: function (error) {
            console.log(error)
        }
    });
};


$(document).ready(function(){
    get_graph_pie();
})


