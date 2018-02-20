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

function populateQuestionAndAnswers(triviaObject,questionIndex){
    $('#questionDiv').html(triviaObject.question);
    correctAnswerScreenIndex=Math.floor(Math.random()*4)+1;
    $("#"+correctAnswerScreenIndex).html(triviaObject.correct_answer);
    arrayOfDivsToPutAnswersIn=removeValueFromArray(correctAnswerScreenIndex,arrayOfDivsToPutAnswersIn);
    for (var i=0;i<arrayOfDivsToPutAnswersIn.length;i++){
        $("#"+arrayOfDivsToPutAnswersIn[i]).html(triviaObject.incorrect_answers[i]);
    };
}

function removeValueFromArray(theValue,theArray){
    var newArray=[];
    for (var i=0;i<theArray.length; i++){
        if (theArray[i] != theValue) {
            newArray.push(theArray[i]);
        }
    }
    console.log(theArray);
    console.log(newArray);
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
        console.log(response.results[0]);
        var theResponse=response.results[Math.floor(Math.random()*response.results.length)];
        populateQuestionAndAnswers(theResponse,questionIndex);
    });
};

function startQuestionTimer(){
    questionTimer = setInterval(function(){ countDownTimer() },1000);
}

function countDownTimer(){
    questionTimeRemaining=-1000;
    if (questionTimeRemaining<=0) {
        countwrong++;
        questionIndex++;
        clearInterval(questionTimer);
        populateQuestionAndAnswers(triviaObject,questionIndex);
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
    if (gameTimeRemaining<=0) {
        countwrong++;
        clearInterval(gameTimer);

    }

}

function alertFunction(){
    console.log(Date.now());
}
function testInterval(){
    var intervalTester = window.setInterval(alertFunction,2000);
}
// testInterval();
console.log("i'm waiting");
$(document).on("click",".levelChoice",setLevel);