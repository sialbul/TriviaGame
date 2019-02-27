$(document).ready(function () {

    $("#container3").hide();


    questionList = [
        {
            question: "What stone is the Great Pyramid of Giza made of?",
            options: ["Limestone", "Marble", "Granite", "Travertine"],
            answer: "Limestone",
            image: "assets/images/greatPyramid.jpg"
        },
        {
            question: "What is the length of The Great Wall of China?",
            options: ["13170 mi", "7500 mi", "17100 mi", "2500 mi"],
            answer: "13170 mi",
            image: "assets/images/greatWall.jpg",
        },
        {
            question: "When was the Hagia Sophia built?",
            options: ["6th century", "10th century", "12nd century", "18th century"],
            answer: "6th century",
            image: "assets/images/hagiaSophia.jpg",

        },
        {
            question: "Where is Machu Picchu?",
            options: ["Peru", "Mexico", "Indiana", "China"],
            answer: "Peru",
            image: "assets/images/MachuPicchu.jpg",

        },
        {
            question: "How many visitors are allowed to visit Potala Palace per day?",
            options: [2300, 10, 120, 1500],
            answer: 2300,
            image: "assets/images/potalaPAlace.jpg",

        },
        {
            question: "Where is Stonehenge?",
            options: ["England", "Indiana", "Ireland", "Scotland"],
            answer: "England",
            image: "assets/images/Stonehenge.jpg",

        },
        {
            question: "What stone is the Taj Mahal made of?",
            options: ["Marble", "Limestone", "Granite", "Travertine"],
            answer: "Marble",
            image: "assets/images/Tajmahal.jpg",

        },
        {
            question: "How many entrances are there in the Colosseum?",
            options: [80, 50, 30, 10],
            answer: "80",
            image: "assets/images/colosseum.jpg",

        }]


    var question;
    var options;
    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var image;
    var timer;
    var pick;
    var timer = 5;
    var intervalId;
    var questionCount = questionList.length;
    var running = false;
    var newArray = [];
    var holder = [];
    //var wins = 0;
    //var losses = 0;
    //var pass = 0;


    var i = 0;
    var currentQuestion;
    var populateQuestion = function () {
        currentQuestion = questionList[i];
        console.log(currentQuestion);
        $("#question").text(currentQuestion.question);
        $("#option1").text(currentQuestion.options[0]);
        $("#option2").text(currentQuestion.options[1]);
        $("#option3").text(currentQuestion.options[2]);
        $("#option4").text(currentQuestion.options[3]);
        $("#questionImg").attr("src", currentQuestion.image);
        i++;
    };

    populateQuestion();

    $("#start").on("click", function () {
        $("#container2").hide();
        $("#container3").show();
        $("#container4").hide();

    });



    $(".option").on("click", function () {

        populateQuestion();
        runTimer();
    });
    //when the button clicked, checked the answer, if it is right, change background color green with check mark, 

    //if it is wrong, change the background color red with cross sign
    //show the right answer green
    // show the answer 3 second
    // add counter ++
    // set the timer for each question 10 seconds
    //if answer doesnt clicked in 10 second, move the next question
    //show game over
    //show how many right answers
    //replay button



    //  When the stop button gets clicked, run the stop function.


    //  When the resume button gets clicked, execute the run function.

    function runTimer() {
        if (!running) {
            intervalId = setInterval(decrement, 1000);
            running = true;
        }
    }

    //  The decrement function.
    function decrement() {

        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer--;

        //stop timer if reach 0
        if (timer === 0) {
            unanswerCount++;
            stop();

            $("#answerblock").html("<h5>" + "Correct answer:" + currentQuestion.answer + "</h5>");
            1000;
            populateQuestion();
        }
    }


    //  The stop function
    function stop() {
        running = false;

        //  Clears our intervalId
        //  We just pass the name of the interval
        //  to the clearInterval function.
        clearInterval(intervalId);
    }

    //  Execute the run function.
    runTimer();



    $("#container3").html("<h2>" + pick.question + "</h2>");
    for (var i = 0; i < pick.options.length; i++) {
        var userChoice = $("<div>");
        userChoice.addClass("answerchoice");
        userChoice.html(pick.options[i]);
        //assign array position to it so can check answer
        userChoice.attr("data-guessvalue", i);
        $("#answerblock").append(userChoice);
        //		}
    }



    //click function to select answer and outcomes
    $(".answerchoice").on("click", function () {
        //grab array position from userGuess
        userGuess = parseInt($(this).attr("data-guessvalue"));

        //correct guess or wrong guess outcomes
        if (userGuess === pick.answer) {
            stop();
            correctCount++;
            userGuess = "";
            $("#answerblok").html("<p>Correct!</p>");

        } else {
            stop();
            wrongCount++;
            userGuess = "";
            $("#answerblock").html("<p>Wrong! The correct answer is: " + currentQuestion.answer + "</p>");
        }
    })


           //run the score screen if all questions answered
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
    
    

    $("#restart").on("click", function () {
        for (var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        populateQuestion();
    })
}
)
