let counter = 5;
let currentQuestion = 0;
let score = 0;
let lost = 0;
let timer;


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
    clearInterval(timer);
    lost++;
    resultOfQuestion('lost');
    setTimeout(nextQuestion, 3 * 1000);
}
function countDown() {
    counter--;
    $('#timeleft').html("Timer:" + counter);
    if (counter === 0) {
        //todo
        timeUp();
    }

}
//Display the image, the question and the choices to the browser

function loadQuestion() {

    counter = 5;
    timer = setInterval(countDown, 1000);
    const image = questionList[currentQuestion].image;
    const question = questionList[currentQuestion].question;
    const choices = questionList[currentQuestion].choices;

    $('#timeleft').html("Timer:" + counter);
    $('#remaning').html(`${loadRemainingQuestion()}`);
    $('#game').html(`
    <img src="${image}"/>
    <h3>${question}</h3>
    ${loadChoices(choices)}
    `);
    $('#resultSection').html(`<p></p>`);


}

function loadChoices(choices) {
    let result = '';
    for (let i = 0; i < choices.length; i++) {
        result += `<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>`;
    }
    return result;
}


//event delegation 
$(document).on('click', ".choice", function () {
    clearInterval(timer);
    var selectedAnswer = $(this).attr("data-answer");
    var answer = questionList[currentQuestion].answer;
    console.log('choice', selectedAnswer);

    if (selectedAnswer === answer) {
        score++;
        resultOfQuestion('win');
        setTimeout(nextQuestion, 3 * 1000);
        console.log("wins")
    } else {
        lost++;
        resultOfQuestion('lost');
        setTimeout(nextQuestion, 3 * 1000);
        console.log("lost");
    }

})

function displayResult() {
    const result = `
<p> You get ${score} questions(s) right </p>
<p> You missed ${lost} questions(s) </p>
<p> Total questions ${questionList.length}</p>
<button class="restart2">Restart</button>
`;
    $('#game').html(result);
    $('#timeleft').hide();
    $('#restart').hide();
}

$(document).on('click', '.restart2', function () {
    clearInterval(timer);
    counter = 5;
    currentQuestion = 0;
    score = 0;
    lost = 0;
    timer = null;
    loadQuestion();

})

$(document).on('click', '#restart', function () {
    clearInterval(timer);
    counter = 5;
    currentQuestion = 0;
    score = 0;
    lost = 0;
    timer = null;
    loadQuestion();
});



$("#restart").click(function () {
    return confirm("Are you sure you want to restart the game?")
});

function loadRemainingQuestion() {
    const remainingQuestion = questionList.length - (currentQuestion + 1);
    const totalQuestion = questionList.length;

    return `Remaining Question: ${remainingQuestion}/${totalQuestion}`;

}

function resultOfQuestion(status) {
    const answer = questionList[currentQuestion].answer;

    if (status === 'win') {
        $('#resultSection').html(`<p><b>Congrulations</b>, you pick the correct answer</p>`);
        // $(answer).css("background-color", "#ff0000");


    } else {
        $('#resultSection').html(`<p>Oppps! Correct answer was <b>${answer}</b></p>`);

        // $(answer).css("background-color", "#ff0000");

    }
}



$('#start').click(function () {
    $('#container2').remove();
    $('#container').show();


    loadQuestion();

})

$(document).ready(function () {
    $('#container2').show();
    $('#container').hide();
});
