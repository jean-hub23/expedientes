
function get_resumen() {
    $.ajax({
        url:window.location.pathname,
        type: 'post',
        data: {
            'action': 'get_resumen'
        },
        dataType: 'json',
        success: function (response) {
            console.log(response);
            // console.log(total);
            document.getElementById('total_expedientes').innerHTML = response[0].cantidad + response[1].cantidad;
            document.getElementById('total_cci').innerHTML = response[1].cantidad ;
            document.getElementById('total_coe').innerHTML = response[0].cantidad ;

        },
        error: function (error) {
            console.log(error)
        }
    });
};

$(document).ready(function(){
    get_resumen();
})


