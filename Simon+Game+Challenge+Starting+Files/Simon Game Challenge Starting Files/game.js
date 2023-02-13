let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let keyPressed = false;
let level = 0;

$(document).ready(function(){

    $(document).keypress(function(){
        if(!keyPressed){
            $("#level-title").text("Level " + level);
            nextSequence();
            keyPressed = true;
        }
    });

    $(".btn").click(function(event){
        if(keyPressed){
            var userChosenColor = event.target.id;
            userClickedPattern.push(userChosenColor);

            playSound(userChosenColor);
            animatePress(userChosenColor);

            checkAnswer(userClickedPattern.length-1);
        }
    });
});

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    let randomNumber = Math.floor(Math.random()*4);

    var randomChosenColour = buttonColours[randomNumber];

    // adds next colonur to game pattern
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);  
}

function playSound(name){
    var audio = new Audio("sounds/"+ name +".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $('#' + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
        setTimeout(function(){
            nextSequence();
        }, 1000);
    }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game over, Press Any Key to Restart");

        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    keyPressed = false;
}