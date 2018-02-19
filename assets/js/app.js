
$('#btnStart').click(function(event) {
  let evento = event.target;
  $('#questions').empty();
  getTrivia();
});
var cont= 0;
var good = 0;
var bad = 0;

function getTrivia() {
  fetch(`https://opentdb.com/api.php?amount=50&category=15`)
    .then(function(response) {
      if(cont == 0 ){
        $('#btnStart').addClass('hide')
      } if(cont === 10){
        $('#questions').addClass('hide');
        $('#result').append('<h1><i class="fas fa-check"></i> Correct: ' + good + '<br><i class="fas fa-times"></i> Wrong: ' + bad +'</h1>');
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
            <li><button class="btn btn-default btn-block incorrect">${mala}</button></li>
        `);
      });cont++
      
      $('#correct').click(function(){
        good ++
      console.log('correctas' + good);
      $('#questions').empty();
      getTrivia()
      });
      $('.incorrect').click(function(){
      bad ++
      console.log('incorrectas: ' + bad);
      $('#questions').empty();
      getTrivia()
      })
    });

}