var cont = 0;
var puntaje = 0;

function puntajeT(cont) {
  if (cont === 11) {
    alert('tu puntaje es: ' + puntaje);
    $('#questions').empty();
    $('#questions').append(`
      <h1>TU PUNTAJE ES:</h1>
      <h2>${puntaje}</h2>
      <a href="index.html"><button id="volver" class="btn btn-success">Volver a jugar</button></a>
    `);
  } else {
    getTrivia();
  }
}

$('#btnStart').click(function(event) {
  let evento = event.target;
  $('#questions').empty();
  getTrivia();
});

function getTrivia() {
  fetch(`https://opentdb.com/api.php?amount=10&category=29`)
    .then(function(response) {
      if(cont == 0 ){
        $('#btnStart').html('Next <i class="fas fa-angle-double-right"></i>');
      } if(cont >= 9){
        $('#btnStart').attr('disabled', 'disabled');
      }
      console.log(cont)
    // Turns the the JSON into a JS object
      return response.json();
    })
    .then(function(categories) {
      var firstQuestion = categories.results[0].question;
      $('#questions').append(firstQuestion);
      let categorie = categories.results[0];
      let arrAnswers = [];
      arrAnswers.push(categorie.correct_answer);
      $('#questions').append(`
            <li><button id="correct" class="btn btn-default btn-block">${arrAnswers}</button></li>
      `);
      let incorrect = categorie.incorrect_answers;
      incorrect.forEach((mala, i) => {
        $('#questions').append(`
            <li><button id="incorrect" class="btn btn-default btn-block">${mala}</button></li>
        `);
      })
      /* funcion para tomar el puntaje */
      $('button').click(function () {
        var id = $(this).attr('id');
        if (id === 'correct') {
          puntaje = puntaje + 100;
          $('#questions').empty();
          cont++;
          console.log(cont);
          puntajeT(cont);
        } else if (id === 'incorrect') {
          puntaje -= 100;
          $('#questions').empty();
          cont++;
          console.log(cont);
          puntajeT(cont);
        }
        console.log(puntaje);
      })
    });
}