// Global Variables
var queryURL = "https://opentdb.com/api.php?amount=10&category=27&difficulty=medium&type=multiple";
var correctAnswerScreenIndex=0;
var arrayOfDivsToPutAnswersIn=[1,2,3,4];
var questionTimer;
var gameTimer;
var questionTimeRemaining = 10;
var gameTimeRemaining = 75;
var countCorrect = 0;
var countWrong =0;
var questionIndex = 0;
var triviaObject;

// Helper Functions
function resetAnswerVariables(){
    arrayOfDivsToPutAnswersIn=[1,2,3,4];
    correctAnswerScreenIndex=0;
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

function hideTheHeader(){
    $("#theHeaderDiv").hide();
    $("#questionsAndAnswerDiv").show();
    $("#timerDiv").show();
}

function showTheHeader(){
    $("#theHeaderDiv").show();
    $("#questionsAndAnswerDiv").hide();
    $("#timerDiv").hide();
    $("#finalScoreDiv").hide();
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

function endTheGame(){
    console.log("the game is over");
    clearInterval(gameTimer);
    clearInterval(questionTimer);
    showTheHeader();
    $("#finalScoreDiv").show();
    $("#correctDiv").text(countCorrect);
    $("#totalDiv").text(countCorrect+countWrong);
}

// Gameplay Functions
function testAnswer(){
    var userAnswer = this.id;
    if (userAnswer == correctAnswerScreenIndex){
        console.log("correct");
        countCorrect++;
    } else {
        console.log("wrong");
        countWrong++;
    }
    clearInterval(questionTimer);
    questionIndex++
    resetAnswerVariables();
    populateQuestionAndAnswers();
}

function populateQuestionAndAnswers(){
    if (questionIndex<triviaObject.results.length){
        $('#questionDiv').html(triviaObject.results[questionIndex].question);
        correctAnswerScreenIndex=Math.floor(Math.random()*4)+1;
        $("#"+correctAnswerScreenIndex).html(triviaObject.results[questionIndex].correct_answer);
        arrayOfDivsToPutAnswersIn=removeValueFromArray(correctAnswerScreenIndex,arrayOfDivsToPutAnswersIn);
        for (var i=0;i<arrayOfDivsToPutAnswersIn.length;i++){
            $("#"+arrayOfDivsToPutAnswersIn[i]).html(triviaObject.results[questionIndex].incorrect_answers[i]);
        };
        questionTimeRemaining=15;
        startQuestionTimer();
    } else {
        endTheGame();
    }
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

// Timer Functions
function startQuestionTimer(){
    clearInterval(questionTimer);
    questionTimer = setInterval(questionTimerFunction,1000);
}

function startGameTimer(){
    gameTimer = setInterval(gameTimerFunction,1000);
}

function questionTimerFunction(){
    questionTimeRemaining--;
    $("#questionTimeRemaining").text(questionTimeRemaining);
    console.log(questionTimeRemaining);
    if (questionTimeRemaining<=0) {
        countWrong++;
        questionIndex++;
        clearInterval(questionTimer);
        resetAnswerVariables();
        populateQuestionAndAnswers();
        startQuestionTimer();
    }
}

function gameTimerFunction(){
    gameTimeRemaining--;
    $("#totalTimeRemaining").text(gameTimeRemaining);
    if (gameTimeRemaining<=0) {
        endTheGame();
    }
}


showTheHeader();
$(document).on("click",".levelChoice",setLevel);
$(document).on("click",".questionChoice",testAnswer);