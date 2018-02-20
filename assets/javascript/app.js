var queryURL = "https://opentdb.com/api.php?amount=10&category=27&difficulty=medium&type=multiple";
var correctAnswerScreenIndex=0;
var arrayOfDivsToPutAnswersIn=[1,2,3,4];
var questionTimer;
var gameTimer;
var questionTimeRemaining = 15*1000;
var gameTimeRemaining = 10*10*1000;
var countCorrect = 0;
var countWrong =0;
var questionIndex = 0;
var triviaObject;

function resetAnswerVariables(){
    arrayOfDivsToPutAnswersIn=[1,2,3,4];
    correctAnswerScreenIndex=0;
}

function testAnswer(){
    var userAnswer = this.id;
    if (userAnswer == correctAnswerScreenIndex){
        console.log("correct");
        countCorrect++;
    } else {
        console.log("wrong");
        countWrong++;
    }
    questionIndex++
    resetAnswerVariables();
    populateQuestionAndAnswers();
}

function populateQuestionAndAnswers(){
    $('#questionDiv').html(triviaObject.results[questionIndex].question);
    correctAnswerScreenIndex=Math.floor(Math.random()*4)+1;
    $("#"+correctAnswerScreenIndex).html(triviaObject.results[questionIndex].correct_answer);
    arrayOfDivsToPutAnswersIn=removeValueFromArray(correctAnswerScreenIndex,arrayOfDivsToPutAnswersIn);
    for (var i=0;i<arrayOfDivsToPutAnswersIn.length;i++){
        $("#"+arrayOfDivsToPutAnswersIn[i]).html(triviaObject.results[questionIndex].incorrect_answers[i]);
    };
}

function removeValueFromArray(theValue,theArray){
    var newArray=[];
    for (var i=0;i<theArray.length; i++){
        if (theArray[i] != theValue) {
            newArray.push(theArray[i]);
        }
    }
    return newArray;
}

function setLevel(){
    if (this.id!=="easy"){
        queryURL = "https://opentdb.com/api.php?amount=10&category=27&difficulty="+ this.id +"&type=multiple";
    } else {
        //stupid API sets default to easy and doesn't accept difficulty=easy ?!?!?
        queryURL = "https://opentdb.com/api.php?amount=10&category=27&type=multiple"
    };
    hideTheHeader();
    getTheQuestions();
    startGameTimer();
    
}
function hideTheHeader(){
    $("#theHeaderDiv").hide();
}

function showTheHeader(){
    $("#theHeaderDiv").show();
}

function getTheQuestions(){
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        triviaObject=response;
        // var theResponse=response.results[Math.floor(Math.random()*response.results.length)];
        populateQuestionAndAnswers();
    });
};

function startQuestionTimer(){
    questionTimer = setInterval(function(){ countDownTimer() },1000);
}

function countDownTimer(){
    questionTimeRemaining=-1000;
    if (questionTimeRemaining<=0) {
        countWrong++;
        questionIndex++;
        clearInterval(questionTimer);
        resetAnswerVariables();
        populateQuestionAndAnswers();
        startQuestionTimer();
    }

}

function endTheGame(){
    console.log("the game is over");
}

function startGameTimer(){
    gameTimer = setInterval(function(){ gameTimer() },1000);
}

function gameTimer(){
    gameTimeRemaining=-1000;
    console.log(gameTimeRemaining);
    if (gameTimeRemaining<=0) {
        countWrong++;
        clearInterval(gameTimer);
    }
}



$(document).on("click",".levelChoice",setLevel);
$(document).on("click",".questionChoice",testAnswer);