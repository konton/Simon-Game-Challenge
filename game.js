var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})

$(".btn").click(function(){
    
    var userChosenColour =  $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})


function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
    
}

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    } else{
        $("body").addClass("game-over");
        setInterval(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        console.log("failed");
        playSound("wrong");
        startOver();
    }

}


function startOver(){
    level=0;
    started=false;
    gamePattern=[];
    
}


function playSound(name){
    console.log(name);
    var audioElement = new Audio("./sounds/"+name+".mp3")
    audioElement.play();
   
}

function animatePress(currentColor){
  
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    }, 100);

}

