$(document).ready(function () {
    $("#container3").hide();
    $("#container4").hide();
    questionList = [
        {
            question: "What stone is the Great Pyramid of Giza made of?",
            option: ["Limestone", "Marble", "Granite", "Travertine"],
            answer: "Limestone",
            image: "assets/images/greatPyramid.jpg"
        },
        {
            question: "What is the length of The Great Wall of China?",
            option: ["13170 mi", "7500 mi", "17100 mi", "2500 mi"],
            answer: "13170 mi",
            image: "assets/images/greatWall.jpg",
        },
        {
            question: "When was the Hagia Sophia built?",
            option: ["6th century", "10th century", "12nd century", "18th century"],
            answer: "6th century",
            image: "assets/images/hagiaSophia.jpg",

        },
        {
            question: "Where is Machu Picchu?",
            option: ["Peru", "Mexico", "Indiana", "China"],
            answer: "Peru",
            image: "assets/images/MachuPicchu.jpg",

        },
        {
            question: "How many visitors are allowed to visit Potala Palace per day?",
            option: [2300, 10, 120, 1500],
            answer: 2300,
            image: "assets/images/potalaPAlace.jpg",

        },
        {
            question: "Where is Stonehenge?",
            option: ["England", "Indiana", "Ireland", "Scotland"],
            answer: "England",
            image: "assets/images/Stonehenge.jpg",

        },
        {
            question: "What stone is the Taj Mahal made of?",
            option: ["Marble", "Limestone", "Granite", "Travertine"],
            answer: "Marble",
            image: "assets/images/Tajmahal.jpg",

        },
        {
            question: "How many entrances are there in the Colosseum?",
            option: [80, 50, 30, 10],
            answer: "80",
            image: "assets/images/colosseum.jpg",

        }]
    var question;
    var option;
    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var image;
    var pick;
    var intervalId;
    var questionCount = questionList.length;
    var running = false;
    var newArray = [];
    var holder = [];
    //var wins = 0;
    //var losses = 0;
    //var pass = 0;

    $("#start").on("click", function () {
        $("#container2").hide();
        $("#container3").show();
        $("#container4").hide();
        populateQuestion();
        runTimer();
    });

    function runTimer() {
        if (!running) {
            timer=5;
            clearInterval(intervalId);
            intervalId = setInterval(decrement, 1000);
            // $("#timeleft").show();
            // $("#answerblock").hide();
        }
        //  The decrement function.
        function decrement() {
            timer--;
            $("#timeleft").html("<h5>Time remaining:   " + timer + "</h5>");
            //stop timer if reach 0
            if (timer == 0) {
                // stop();
                clearInterval(intervalId);
                displayedCorrect(); 
                populateQuestion();
            }
        }
    }
    var i = 0;
    var currentQuestion;

    var populateQuestion = function () {
        runTimer();
        currentQuestion = questionList[i]; +
            console.log(currentQuestion);
        $("#question").text(currentQuestion.question);
        $("#option1").text(currentQuestion.option[0]);
        $("#option2").text(currentQuestion.option[1]);
        $("#option3").text(currentQuestion.option[2]);
        $("#option4").text(currentQuestion.option[3]);
        $("#questionImg").attr("src", currentQuestion.image);
        i++;
    };

    function displayedCorrect() {
        $("#answerblock").html("<h3>" + "Correct answer:   " + currentQuestion.answer + "</h3>");
    }
});
// //  The stop function
function stop() {
    clearInterval(intervalId);
    //  Clears our intervalId
    //  We just pass the name of the interval
    //  to the clearInterval function.
}
// //  Execute the run function.

$("#option").on("click", function () {
    populateQuestion();
    for (var i = 0; i < questionList.length; i++) {
        holder.push(questionList[i]);
    }
    //grab array position from userGuess
    userGuess = parseInt($(this).attr("data-guessvalue"));

    //correct guess or wrong guess outcomes
    if (userGuess === this.answer) {
        stop();
        correctCount++;
        userGuess = "";
        $("#answerblock").html("<p>Correct!</p>");
        setTimeout(2000);

    } else {
        stop();
        wrongCount++;
        userGuess = "";
        $("#answerblock").html("<p>Wrong! The correct answer is: " + currentQuestion.answer + "</p>");
        setTimeout(4000);
    }
})

//run the score screen if all questions answered
console.log("wrongCount = " + wrongCount + ", correctCount = " + correctCount);

function resultPage() {
    if ((wrongCount + correctCount + unanswerCount) === questionCount.length) {
        $("#container4").show();
        $("#container3").hide();
        $("#result").html("<h3>Game Over!  Here's how you did: </h3>");
        $("#result").append("<h4> Correct: " + correctCount + "</h4>");
        $("#result").append("<h4> Incorrect: " + wrongCount + "</h4>");
        $("#result").append("<h4> Unanswered: " + unanswerCount + "</h4>");
        $("#restart").show();
        correctCount = 0;
        wrongCount = 0;
        unanswerCount = 0;

    } else {
        runTimer();
        populateQuestion();

    }
}
resultPage();

$("#restart").on("click", function () {
    for (var i = 0; i < holder.length; i++) {
        options.push(holder[i]);
    }
    runTimer();
    populateQuestion();
})

