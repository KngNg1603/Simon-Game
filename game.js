const buttonColors = ["red", "blue", "green", "yellow"];
const gamePattern = [];
const userClickedPattern = [];
var level = 0;
var started = false;

$(document).on('keydown', function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
      }
});

$(".btn").click(function() {
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    clickAnimation(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});


function nextSequence() {
    // Clear userClickedPattern after each level
    userClickedPattern.length = 0;
    level++;
    $("#level-title").text("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    clickAnimation(randomChosenColor);
    
}

function clickAnimation(color) {
    $("#" + color).fadeOut(100).fadeIn(100);
    let audio = new Audio("./sounds/" + color + ".mp3");
    audio.play();
}



function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
    else {
        gameOver();
    }
    
}

function gameOver() {
    $("#level-title").text("Game Over, Press Any Key to Restart");
    let audio = new Audio("./sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);
    started = false;
    level = 0;
    gamePattern.length = 0;
}




