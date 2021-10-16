//start the game when start button is clicked
$("#start").on("click touchend" , function(){
    $("#start").html("Refresh");
    $("#start").addClass("clicked");
    gameStart();
});

let sequence = [];
let userTiles =[];
let round = 1;
let currentPtr = 0;
let bestScore = 0;

//main function to start the game
function gameStart(){
    updateScores();
    changeRoundNumber(round);
    //generate random number
    let randomTile = Math.floor(Math.random()*4);
    //display the tile
    displayTile(randomTile);
    playSound(randomTile);
    console.log(randomTile+" was generated ");
    sequence.push(randomTile);
    console.log(sequence);
}

$(".tile").on("click",function(){
    let clickedTile = -1;
    if(this.id=="green"){
        console.log("Green button pressed");
        clickedTile =  0;
    }
    else if(this.id=="red"){
        console.log("Red button pressed");
        clickedTile = 1;
    }
    else if(this.id=="yellow"){
        console.log("Yellow button pressed");
        clickedTile = 2;
    }
    else if(this.id=="blue"){
        console.log("Blue button pressed");
        clickedTile = 3;
    }
    userTiles.push(clickedTile);
    playSound(clickedTile);
    if(userTiles[currentPtr]!=sequence[currentPtr]){
        displayGameOver();
    }else{
        currentPtr++;
        if(currentPtr>=sequence.length){
            roundWon();
        }
    }
    
});

//function to play the sound
function playSound(clickedTile){
    if(clickedTile==0){
        let greenSound = new Audio("sounds/green.mp3");
        greenSound.play();
    }
    else if(clickedTile==1){
        let redSound = new Audio("sounds/red.mp3");
        redSound.play();
    }
    else if(clickedTile==2){
        let yellowSound = new Audio("sounds/yellow.mp3");
        yellowSound.play();
    }
    else if(clickedTile==3){
        let blueSound = new Audio("sounds/blue.mp3");
        blueSound.play();
    }
    else if(clickedTile==100){
        let wrongSound = new Audio("sounds/wrong.mp3");
        wrongSound.play();
    }
    
}

//function to display the popup that the game is over
function displayGameOver(){
    console.log("Game over");
    //store best score
    if(round>=bestScore)
        bestScore=round-1;
    //reset the tiles

    updateScores();
    userTiles=[];
    sequence=[];
    currentPtr=0;
    round = 1;
    //play sound
    playSound(100);
    $("#message").text("Game Over!");
}

function roundWon(){
    //this round was won
    //reset the user input array and current pointer 
    //and restart the game
    console.log("Round "+ round + " won. Starting next round");
    if(round>bestScore){
        bestScore=round;
    }
    userTiles =[];
    currentPtr=0;
    round++;
    gameStart();
}

//function to change the round number in the heading
function changeRoundNumber(round){
    $("#message").text("Round - " + round);
}

//function to display the tile that was generated
function displayTile(tile){
    if(tile==0){
        $("#green").fadeIn();
        $("#green").fadeOut();
        $("#green").fadeIn();
        
    }else if(tile==1){
        $("#red").fadeIn();
        $("#red").fadeOut();
        $("#red").fadeIn();
    }else if(tile==2){

        $("#yellow").fadeIn();
        $("#yellow").fadeOut();
        $("#yellow").fadeIn();
    
    }else{
        $("#blue").fadeIn();
        $("#blue").fadeOut();
        $("#blue").fadeIn();
    }
}
    
//function to display scores
function updateScores(){
    $("#best-score").text(bestScore);
    $("#current-score").text(round-1);
}