
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
    });
}