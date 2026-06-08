/* Carga las recetas del XML y las muestra en tarjetas */

var contenedor = document.getElementById('contenedor-recetas');

function cargarRecetas() {
    var xhttp = new XMLHttpRequest();

    xhttp.onload = function() {
        var xml = xhttp.responseXML;
        mostrarTarjetas(xml);
    };

    xhttp.open('GET', '../xml/recetas.xml');
    xhttp.send();
}

function mostrarTarjetas(xml) {
    var lista = xml.getElementsByTagName('receta');
    var html = '';

    for (var i = 0; i < lista.length; i++) {
        var nombre = lista[i].getElementsByTagName('nombre')[0].childNodes[0].nodeValue;
        var categoria = lista[i].getElementsByTagName('categoria')[0].childNodes[0].nodeValue;
        var tiempo = lista[i].getElementsByTagName('tiempo')[0].childNodes[0].nodeValue;
        var dificultad = lista[i].getElementsByTagName('dificultad')[0].childNodes[0].nodeValue;
        var porciones = lista[i].getElementsByTagName('porciones')[0].childNodes[0].nodeValue;
        var calorias = lista[i].getElementsByTagName('calorias')[0].childNodes[0].nodeValue;
        var imagen = lista[i].getElementsByTagName('imagen')[0].childNodes[0].nodeValue;
        var slug = lista[i].getElementsByTagName('slug')[0].childNodes[0].nodeValue;

        html += '<a href="detalle.html?id=' + i + '" class="tarjeta-receta">' +
            '<div class="tarjeta-imagen">' +
            '<img src="' + imagen + '" alt="' + nombre + '" />' +
            '<span class="tarjeta-categoria">' + categoria + '</span>' +
            '<span class="tarjeta-badge">⏱ ' + tiempo + '</span>' +
            '<button class="btn-favorito-flotante btn-favorito-grande" data-receta="' + slug + '" onclick="event.preventDefault(); event.stopPropagation();">🤍</button>' +
            '</div>' +
            '<div class="info-receta">' +
            '<h3>' + nombre + '</h3>' +
            '<div class="receta-meta">' +
            '<span>📊 ' + dificultad + '</span>' +
            '<span>👥 ' + porciones + '</span>' +
            '<span>🔥 ' + calorias + '</span>' +
            '</div></div></a>';
    }

    contenedor.innerHTML = html;

    /* actualizar botones de favorito despues de insertar las tarjetas */
    if (window.gestorFavoritos) {
        window.gestorFavoritos.configurarBotonesFavoritos();
    }
}

cargarRecetas();