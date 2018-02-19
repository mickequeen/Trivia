
$('#btnStart').click(function(event) {
  let evento = event.target;
  $('#questions').empty();
  getTrivia();
});
var cont= 0;
function getTrivia() {
  fetch(`https://opentdb.com/api.php?amount=10&category=29`)
    .then(function(response) {
      if(cont == 0 ){
        $('#btnStart').html('Next <i class="fas fa-angle-double-right"></i>');
      } if(cont >= 9){
        $('#btnStart').attr('disabled', 'disabled')
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
            <li class="correct"><button class="btn btn-default btn-block">${arrAnswers}</button></li>
      `);
      let incorrect = categorie.incorrect_answers;
      incorrect.forEach((mala, i) => {
        $('#questions').append(`
            <li class="incorrect"><button class="btn btn-default btn-block">${mala}</button></li>
        `);
      });cont++
    });
}