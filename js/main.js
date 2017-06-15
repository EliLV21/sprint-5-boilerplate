$('#modal1').modal();
var api = {
  url: 'http://examen-laboratoria-sprint-5.herokuapp.com/topics'
};
var $tasksList = $("#tasks-list");
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
  var $nombreTd = $("<td class='col s6'/>");
  $nombreTd.text(nombre);
  var $mensajeTd = $("<td class='col s4'/>");
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

$(document).ready(cargarPagina);
