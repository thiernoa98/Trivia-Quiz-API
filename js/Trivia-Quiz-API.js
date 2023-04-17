// Lesson 09.04 Trivia Quiz API - PROG

//url for 1 question any category
//1) use opentdb.com to get the url below 
//2) url from the internet https://opentdb.com/api.php?amount=1
//3. get the DOM element: the button and the div



//dom elelemtns that will hold the item, h2, h3, h4...
const getTriviaBtn = document.querySelector('#get-trivia-btn');
const categoryH2 = document.getElementById('category-h2');
const questionH3 = document.getElementById('question-h3');
const categoryMenu = document.getElementById('category-menu');
const scoreBox = document.getElementById('score-box');
//get all answer choice buttons at once w querySelector because they all have the same class name
//getting all 4 buttons at once, in an array
const ansChoiceBtns = document.querySelectorAll('.answer-choice-btn');


//setting the button
categoryMenu.addEventListener('change', fetchTriviaQuestion);
getTriviaBtn.addEventListener('click', fetchTriviaQuestion);


//declare global variables for correct answer, score, tries, average
let correctAns, score=0, tries=0, avg=0;

//loop through the Node list to get the index of each button choice
for (let i = 0; i < ansChoiceBtns.length; i++) {
   
    //all 4 button called here to see which is the right answer, then evaluate
    ansChoiceBtns[i].addEventListener('click', evalAnswerChoise)
}
// console.log(ansChoiceBtnArr);


//declare the function that will hold the url and parse it
function fetchTriviaQuestion() {
    //3B clear the old text, and show the new texts
    categoryH2.innerHTML = '';
    questionH3.innerHTML = '';
    ansChoiceBtns.innerHTML = '';
    //

    //4 fetch into the url, pass in the url
    //concatenate the category value from the html file, categoryMenu.value
    fetch(`https://opentdb.com/api.php?amount=1&category=${categoryMenu.value}&type=multiple`, {method: 'GET'})

    //5) transform the json into the js obj/parse it with .json()
    .then(jsonData=>{
        console.log(jsonData);
        return jsonData.json(); 
        
    })
    //6) add another .then method after we get the parsed or regular objects
    .then((object)=>{
        //outputing the categrory and question into the DOM
        categoryH2.innerHTML = `category: ${object.results[0].category}`;
        questionH3.innerHTML = `Question: ${object.results[0].question}`;

        // for (let i = 0; i < ansChoiceBtns.length -1; i++) {
            
        //     //getting the incorrect answers into the choice buttons
        //     ansChoiceBtns[i].innerHTML += object.results[0].incorrect_answers[i]
            
        // }
        
        // ansChoiceBtns[3].innerHTML += object.results[0].correct_answer;

        //outputing the parsed object, after removing the json from it
       console.log('object ', object);

       //set the value of the global correct answer, which is a the top
       correctAns = object.results[0].correct_answer

       //make an array of all the 4 choices, we use spreads to get the incorrect_answers out of the array
       //we added an '&nbsp' as an invisible tag which will help us identify the correct answer
       const allChoices = [...object.results[0].incorrect_answers, correctAns + '&nbsp'];

       //use sort call back to randomize the choices
       allChoices.sort(()=>Math.random() - 0.5);
       console.log(allChoices);

       //loop the array of all the 4 answers
        for (let i = 0; i < ansChoiceBtns.length; i++) {
    
           // adding all the answers into the A,B,C,D buttons 
           // ansChoiceBtns[i] i is the index that will add each questin in a seaprate button choice
            ansChoiceBtns[i].innerHTML = `${ansChoiceBtns[i].id}. &nbsp ${allChoices[i]}`;

            //change the style of the buttons to set normal before changing it to red or green
            ansChoiceBtns[i].style.backgroundColor = '#eee'; //white
            ansChoiceBtns[i].style.color = '#333'; //black

            //make the choice buttons visible
            ansChoiceBtns[i].style.display = 'block';
        }
    })
} //end of fetchFunction



//all four answer choice btn need to call the same function
//check which button of the four, has the right answer
function evalAnswerChoise() {
    //increment the number of tries, for the number of tries 
    tries++; 
    
    //check for the right answer, take the last 6 digits and compare it to &nbsp
    //because it was added to the correct answwr but it is invible
    if (this.innerHTML.slice(-6) == '&nbsp;') {
        //change the color of the correct answer to green
        this.style.backgroundColor = 'darkgreen';
        score ++; //if we're right ,increase by 1

        //get the next question automation, I added it for fun
        let n = 0;
        while (n<1) {
            n++
            setTimeout(()=>{ 
                fetchTriviaQuestion();
            },1000);   
        }

    }else{
        //make the wrong background color red
        this.style.backgroundColor = 'red';
    }
    //set the text color to white 
    this.style.color = '#fff';

    //calculate the average
    //get the average
    avg = score / tries;
    
    scoreBox.innerHTML = `Tries: ${tries} &nbsp; &nbsp; &nbsp; Score: ${score} &nbsp; &nbsp; &nbsp; Avg: ${avg}`;
}

// END: Lesson 09.04