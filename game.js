//Game state variables

var buttonColors = ["red", "green", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var count = 0;
var isPlaying = false;
var isClickable = false;

//Listening to keyboard input to start the game

$(document).keydown(function (event) {
    if (!isPlaying) {
        nextSequence();
        isPlaying = true;
    }
    else {
        event.preventDefault();
    }
});

//Tracking the user input

$(".btn").click(function (event) {
    if (isClickable) {
        var userChosenColor = event.target.id;
        userClickedPattern.push(userChosenColor);
        console.log(userClickedPattern);
        animatePress(userChosenColor);
        playSound(userChosenColor);
        checkWinCondition(userChosenColor);
    } else {
        event.preventDefault();
    }
})

//Function to check whether the user input matches the random pattern

function checkWinCondition(userChosenColor) {
    if (gamePattern[count] != userChosenColor) {
        changeTextHeading("!You Lost!");
        $("body").css("background", "red");
        setTimeout(function () {
            changeTextHeading("Press Any Key to Start Again");
            $("body").css("background", " rgb(238, 174, 202)");
            $("body").css("background",
                " radial-gradient(circle, rgba(238, 174, 202, 1) 0%, rgba(148, 187, 233, 1) 100%)");
            isPlaying = false;
        }, 2000);
        isClickable = false;
        count = 0;
        level = 0;
        gamePattern = [];
        userClickedPattern = [];
    }
    else {
        count++;
        gameLoop(userChosenColor);
    }
}

//A function to check if the user input array length equals game pattern array length

function gameLoop(currentColor) {
    if (gamePattern.length == userClickedPattern.length) {
        setTimeout(nextSequence, 1000);
    }
}

//The animation when a button is pressed 

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

//To process the sound when a button is pressed 

function playSound(userChosenColor) {
    var audio = new Audio("sounds/" + userChosenColor + ".mp3");
    audio.play();
}

//This function randomly generates the game sequence

function nextSequence() {
    level++;
    changeTextHeading("Level " + level);
    var randomNum = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNum];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(200).fadeIn(200);
    playSound(randomChosenColor);
    userClickedPattern = [];
    count = 0;
    isClickable = true;
}

//This function changes the heading 

function changeTextHeading(text) {
    $("h1").text(text);
}
