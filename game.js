let buttonColors = ["red","yellow","green","blue"]
let gamePattern = [];
let randomColor;
let userClickedPattern = [];
let started = false;
let level = 0;

//All functions below
function playSound(name){
    var audio = new Audio("sounds/"+ name+".mp3")
    audio.play();
    audio.volume = 0.3;
};

function animatePress(currentColor){
    $("#" + currentColor).toggleClass("pressed");
    //set a delay of 100 miliseconds
    setTimeout(()=>{
        $("#" + currentColor).toggleClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");
    if (userClickedPattern.length === gamePattern.length){

      //call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }
  }
  else {
    console.log("Wrong")
    //Play sound to notify wrong input
     playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(()=>{
     //warning effect using red bg
      $("body").removeClass("game-over");
    }, 200);
    //Change title after game over to restart 
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}

//Key up event to start the game
$(document).on("keyup",()=>{
    //to call next sequence first time
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }  

})    
function nextSequence(){
  //increase the level by 1 every time nextSequence() is called.
  level++;
  userClickedPattern = [];
  //update the title with this change in the value of level.
  $("#level-title").text("Level " + level);
    let randNum = Math.floor(Math.random()*4);
    randomColor = buttonColors[randNum];
    gamePattern.push(randomColor);
    //Adding animation and sound to buttons
    $("#"+ randomColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    //Play sound
    playSound(randomColor);
    
}


//to detect button clicks
$(".btn").click(function() {
    //to store id of the button that got clicked
    let userChosenColour = $(this).attr("id");

    //push this user chosen color in user pattern array
    userClickedPattern.push(userChosenColour)
    console.log(userClickedPattern)

    //Playing sound on button clicks
    playSound(userChosenColour);

    //Adding Animation to button presses
    animatePress(userChosenColour);
    
     //Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length-1);
})








