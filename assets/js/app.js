
$('#btnStart').click(function(event) {
  let evento = event.target;
  getTrivia();
});

function getTrivia() {
  fetch(`https://opentdb.com/api.php?amount=10`)
    .then(function(response) {
    // Turns the the JSON into a JS object
      return response.json();
    })
    .then(function(categories) {
      var firstQuestion = categories.results[0].question;
      $('#container').append(firstQuestion);
      let categorie = categories.results[0];
      let arrAnswers = [];
      arrAnswers.push(categorie.correct_answer);
      $('#container').append(`
            <li class="correct"><button>${arrAnswers}</button></li>
      `);
      let incorrect = categorie.incorrect_answers;
      incorrect.forEach((mala, i) => {
        $('#container').append(`
            <li class="incorrect"><button>${mala}</button></li>
        `);
      });
    });
}