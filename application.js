var solution;
var highScore = 0;
var score = 0;
var timer;

var newQuestion = function (range) {
  var selectedOperators = $('.operatorButtons input:checked').map(function() {
    return this.id;
  }).toArray();

  var randomOperator = selectedOperators[Math.floor(Math.random()*selectedOperators.length)]

  var num1 = Math.ceil(Math.random()*range)
  var num2 = Math.ceil(Math.random()*range)

  var maxNum = Math.max(num1, num2)
  var minNum = Math.min(num1, num2)
  var answer = 0;
  switch (randomOperator) {
    case 'add':
      answer = num1 + num2;
      $('#question').html(num1 + '+' + num2 );
      break;    
    case 'subtract':
      answer = maxNum - minNum;
      $('#question').html(maxNum + '-' + minNum );
      break;
    case 'multiply':
      answer = num1 * num2;
      $('#question').html(num1 + 'x' + num2 );
      break;
    case 'divide':
      if (num1 % num2 == 0 || num2 % num1 == 0) {
        answer = num1 / num2;
      $('#question').html(num1 + '/' + num2 )
      } else {
        newQuestion();
      }
      ;
      break;

    default:
  }
  return solution = answer
}

var checkAnswer = function () {
  // check solution against input
  if (solution == $('.answer').val()) {

    // Clear input
    $('.answer').val('');

    // Add 1s to timer
    timer++;

    // add score
    score ++;

    // update DOM
    $('.score').html(score);
    $('.timer').html(timer);

    newQuestion($('#range').val());
  }
}

function gameEnd () {
	if (score > highScore) {
		highScore = score;
		updateHighScore();
		$('.score').html('-');
	} else {
		score = 0;
		$('.score').html('-');
	}
}

var updateHighScore = function() {
  $.ajax({
      type: 'PUT',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/8706?api_key=521',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
          task: {
              content: parseInt($('.score').text())
          }
      }),
      success: function(response, textStatus) {
          loadHighScore();
      },
      error: function(request, textStatus, errorMessage) {
          console.log(errorMessage);
      }
  }); 
}

var loadHighScore = function() {
  $.ajax({
      type: 'GET',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/8706?api_key=521',
      dataType: 'json',
      success: function(response, textStatus) {
          $('.highScore').text(response.task.content)
      },
      error: function(request, textStatus, errorMessage) {
          console.log(errorMessage);
      }
  });
}

function startTimer() {

	timer = 10;

	$('.timer').html(timer);

	var interval = setInterval( function () {
		// Decrease by 1s.
		timer--;

		// Update DOM.
		$('.timer').html(timer);

		// Stop timer at 0.
		if ( timer == 0 ) {
			clearInterval(interval);
			setTimeout(function () { 
				gameEnd();
				if (confirm(
					  "Time's up! Would you like to play again?"
					)) {
            startGame();
            $('.answer').focus();
          } else {
						alert('Thanks for playing!');
						$('question').html('click here to start');
					};
			}, 250);
		}
	}, 1000);
}

var startGame = function () {
  range = $('#range').val();
  loadHighScore();
  newQuestion(range);
  startTimer();
}

$(document).ready(function () {
  loadHighScore();

  $('#range').on('input', function() {
    $('#numberLimit').html($('#range').val())
});

  $('.score').html(score);
  $('#question').on('click', startGame);
  $('.answer').on('keyup', checkAnswer);
})