let Pointscount=0;
let Questions=0;
document.getElementById('generator-form').addEventListener('submit', function(event) {
  event.preventDefault();
  var startDate = new Date(document.getElementById('startDate').value);
  var endDate = new Date(document.getElementById('endDate').value);
  var amount = parseInt(document.getElementById('amount').value);
  document.getElementById('NumberQuestions').textContent = "/"+amount;
  var output = document.getElementById('output');
  output.innerHTML = '';

  for (var i = 0; i < 1; i++) {
    var randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
    var dateStr = randomDate.getDate() + ' ' + randomDate.toLocaleString('default', { month: 'long' }) + ' ' + randomDate.getFullYear();
    output.innerHTML += '<p>' + dateStr + '</p>';

    output.dataset.randomDateString = randomDate.toISOString(); // Store as string
  }

  // Show guessing form
  document.getElementById('guess-form').style.display = 'block';

  // Function to handle guess submission
  document.getElementById('submitGuess').addEventListener('click', handleGuessSubmission);
  result.textContent=" ";
});




function handleGuessSubmission() {
  var guess = document.getElementById('guessAnswer').value.toLowerCase();
  var randomDate = new Date(document.getElementById('output').dataset.randomDateString); // Parse string back to Date
  var dayOfWeek = randomDate.toLocaleString('default', { weekday: 'long' }).toLowerCase();
  var result = document.getElementById('result');

  if (guess === dayOfWeek) {
    result.textContent = 'Correct! You got 1 point.';
    Pointscount=Pointscount+0.5;
    document.getElementById('Points').textContent = Pointscount;
  } else {
    result.textContent = 'Wrong! The correct answer was ' + dayOfWeek + '.';
  }

  // Reset form (if intended)
  document.getElementById('guess').value = '';
  // If you want to hide the form after a guess, uncomment the following line:
 document.getElementById('guess-form').style.display = 'none';
}

function redirectToMemoryPage() {
  window.location.href = "MemoryMainPage.html";
}