let counter = 10;
let currentQuestion = 0;
let score = 0;
let lost = 0;

let initialOffset = 440;

function nextQuestion() {
    const isQuestionOver = questionList.length - 1 === currentQuestion;
    if (isQuestionOver) {
        console.log("Game is over");
        displayResult();
    } else {
        currentQuestion++;
        loadQuestion();
    }
}

function timeUp() {
    clearInterval(timerInterval);
    console.log(timeLeft);
    lost++;
    resultOfQuestion('lost');
    // $("#choiceButton").off('click');
    setTimeout(nextQuestion, 3 * 1000);
    $("button").attr('disabled', true)
}

function loadQuestion() {
    clearInterval(timerInterval);
    startTimer();
    console.log(timeLeft);
    console.log(TIME_LIMIT);

    const image = questionList[currentQuestion].image;
    const question = questionList[currentQuestion].question;
    const choices = questionList[currentQuestion].choices;
    $('#remaning').html(`<h3>${loadRemainingQuestion()}</h3>`);
    $('#game').html(`
    <img src="${image}"/>
    <h3>${question}</h3>
    `);
    $('#game2').html(`
        ${loadChoices(choices)}
    `);

    $('#resultSection').html(`<p></p>`);
    $('#reStart').attr('disabled', false);
}

function loadChoices(choices) {
    let result = '';
    for (let i = 0; i < choices.length; i++) {
        result += `<button type="button" id="choiceButton" class="btn btn-default" data-answer="${choices[i]}">${choices[i]}</button>`;
    }
    return result;
}

//event delegation 
$(document).on('click', "#choiceButton", function() {
    clearInterval(timerInterval);
    var selectedAnswer = $(this).attr("data-answer");
    var answer = questionList[currentQuestion].answer;
    console.log('choiceButton', selectedAnswer);
    $(this).css('background-color', 'green');
    if (selectedAnswer === answer) {
        score++;
        resultOfQuestion('win');
        setTimeout(nextQuestion, 3 * 1000);
        console.log("wins");
        $(this).css('background-color', 'green');
        $("button").attr('disabled', true);

    } else {
        lost++;
        resultOfQuestion('lost');
        setTimeout(nextQuestion, 3 * 1000);
        console.log("lost");
        $(this).css('background-color', 'red');
        $("button").attr('disabled', true);

    }

}).attr('disabled', true);


function displayResult() {
    const result = `
<p> You get ${score} questions(s) right </p>
<p> You missed ${lost} questions(s) </p>
<p> Total questions ${questionList.length}</p>

`;
    $('#game3').html(result);
    $('#timeleft').hide();
    $('#reStart').attr('disabled', false);
    $('#remaning').hide();
    $('#resultSection').hide();
    $('#game2').hide();
    $('#game').hide();
    $('#circleTimer').hide();
    $('#resultPart').hide();

}

$("#reStart").click(function() {
    var restart = confirm("Do you want to cancel? ");
    if (restart) {
        clearInterval(timerInterval);
        currentQuestion = 0;
        score = 0;
        lost = 0;
        loadQuestion()
    }
});



function loadRemainingQuestion() {
    const remainingQuestion = questionList.length - (currentQuestion + 1);
    const totalQuestion = questionList.length;
    return ` ${remainingQuestion}/${totalQuestion} <br> Remaining Question`;
}

function resultOfQuestion(status) {
    const answer = questionList[currentQuestion].answer;
    if (status === 'win') {
        $('#resultSection').html(`<h3><b>Congrulations!</b><br> You pick the correct answer</h3>`);
        // questionList[currentQuestion].style.color = 'lightgreen';
    } else {
        $('#resultSection').html(`<h3>Oppps!<br> Correct answer was <br><b>${answer}</b></h3>`);
        // questionList[currentQuestion].style.color = 'red';

    }
}

$('#start').click(function() {
    $('#container2').remove();
    $('#container').show();
    loadQuestion();

})

$(document).ready(function() {
    $('#container2').show();
    $('#container').hide();
});