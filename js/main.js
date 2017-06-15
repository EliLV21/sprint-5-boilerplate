$('.modal').modal();
var api = {
  urlId: 'http://examen-laboratoria-sprint-5.herokuapp.com/topics/topic_id',
  url: 'http://examen-laboratoria-sprint-5.herokuapp.com/topics'
};
var $tasksList = $("#tasks-list");
var modalList = $(".modal-content");
var cargarPagina = function(){
  cargarTemas();
  $("#add-form").submit(agregarTema);
};
var cargarTemas = function(){
  $.getJSON(api.url, function (topics){
    topics.forEach(crearTema);
  });
};
var crearTema = function (topics) {
  var nombre = topics.author_name;
  var mensaje = topics.content;
  var $tr = $("<tr />");
  var $nombreTd = $("<a href='#modal2'><td class='col s6'/></a>");
  $nombreTd.text(nombre);
  var $mensajeTd = $("<a href='#modal2'><td class='col s4'/></a>");
  $mensajeTd.text(mensaje);
  $tr.append($nombreTd);
  $tr.append($mensajeTd);
  $tasksList.append($tr);
};
var agregarTema = function (e) {
  e.preventDefault();
  var nombre = $("#nombrePersona").val();
  var mensaje = $("#mensajeTema").val();
  $.post(api.url, {
    author_name: nombre,
    content: mensaje
  }, function (topics) {
    crearTema(topics);
     $("#modal1").modal('close');
  });
};
var criterioFiltro = $("#search").val().toLowerCase();
$('#search').keypress(function(e){
  e.preventDefault();
    if(e.which == 13) {
              $(topics).filter(criterioFiltro);
    }
});

$(document).ready(cargarPagina);
