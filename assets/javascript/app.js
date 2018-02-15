// The below code fills in the first row of the table
var queryURL = "https://opentdb.com/api.php?amount=10&category=27&difficulty=medium&type=multiple";
var randomAnswer
var isAjaxDone=false;
var correctAnswerScreenIndex=0;
var arrayOfDivsToPutAnswersIn=[1,2,3,4];

function populateQuestionAndAnswers(triviaObject){
    $('#questionDiv').html(triviaObject.question);
    correctAnswerScreenIndex=Math.floor(Math.random()*4)+1;
    // correctAnswerScreenIndex==correctAnswerScreenIndex.toString();
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

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
    console.log(response);
    isAjaxDone=true;
    console.log(response.results[0]);
    var theResponse=response.results[Math.floor(Math.random()*response.results.length)];
    populateQuestionAndAnswers(theResponse);
    // // Obtain a reference to the tbody element in the DOM
    // var parentDiv = $('tbody');
    // console.log(parentDiv);
    // // Create and save a reference to new empty table row
    // var newDiv = $("<tr>");
    // console.log(newDiv);
    // // Create and save references to 3 td elements containing the Title, Year, and Actors from the AJAX response object
    // var theKeys=["Title","Year","Actors"];
    // for (var i=0;i<theKeys.length;i++){
    // var newTD = $("<td>");
    // // var theString = response.theKeys[i];
    // newTD.text(response[theKeys[i]]);
    // console.log(newTD);
    // newDiv.append(newTD);
    // };
    // parentDiv.append(newDiv);
    // // Append the td elements to the new table row
    // // Append the table row to the tbody element
});

console.log("i'm waiting");