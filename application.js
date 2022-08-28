var solution;
var highScore;
var score = 0;



var trial = function () {
  newQuestion();
}

var newQuestion = function (range = 10) {
  var selectedOperators = $('.operatorButtons input:checked').map(function() {
    return this.id;
  }).toArray();

  var randomOperator = selectedOperators[Math.floor(Math.random()*selectedOperators.length)]


  console.log(selectedOperators, $('.operatorButtons input:checked'), randomOperator, solution)

  var num1 = Math.ceil(Math.random()*range)
  var num2 = Math.ceil(Math.random()*range)

  var maxNum = Math.max(num1, num2)
  var minNum = Math.min(num1, num2)
  var answer = 0;
  switch (randomOperator) {
    case 'add':
      answer = num1 + num2;
      console.log(answer)
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
        console.log('no answer')
        newQuestion();
      }
      ;
      break;

    default:
  }
  console.log('answer' + answer)
  return solution = answer
}

var checkAnswer = function () {
  if (solution == $('.answer').val()) {
    $('.answer').val('');
    score ++;
    $('.score').html(score);
    newQuestion();
  }
}

function gameEnd () {
	if (score > highScore) {
		highScore = score;
		score = 0;
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

$(document).ready(function () {

newQuestion(10);
$('.score').html(score)

$('.answer').on('keyup', trial)
})