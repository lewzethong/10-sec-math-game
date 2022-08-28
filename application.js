$(document).ready(function () {

newQuestion(10);
console.log(mathOperation()[1])

var selectedOperators = $('.operatorButtons input:checked').map(function() {
  return $(this).id;
}).toArray();
$('.answer').on('click', newQuestion())
console.log(selectedOperators)
})

var newQuestion = function (range = 10) {
  var selectedOperators = $('.operatorButtons input:checked').map(function() {
    return this.id;
  }).toArray();

  console.log(selectedOperators, $('.operatorButtons input:checked'))

  var num1 = Math.ceil(Math.random()*range)
  var num2 = Math.ceil(Math.random()*range)
  console.log(num1, num2, range)
  var msg = num1 + '+' + num2 

  $('#question').html(msg)
}

var add = function (a, b) {
  $('#question').html(a + ' + ' + b)
  return a+b;
}

var subtract = function (a, b) {
  if (a > b) {
    $('#question').html(a + ' - ' + b);
    return a-b;
  } else {
    $('#question').html(b + ' - ' + a);
    return b-a;
  }
}

var multiply = function (a, b) {
  $('#question').html(a + ' x ' + b)
  return a*b;
}

var divide = function (a, b) {
  $('#question').html(a + ' / ' + b)
  return a/b;
}

var mathOperation = function () {
  var operationArr = []
  if($('#plus').prop("checked")) {
    operationArr.push(add);
  }
  if($('#minus').prop("checked")) {
      operationArr.push(subtract);
  }
  if($('#multiply').prop("checked")) {
      operationArr.push(multiply);
  }
  if($('#divide').prop("checked")) {
      operationArr.push(divide);
  }
  return operationArr
}