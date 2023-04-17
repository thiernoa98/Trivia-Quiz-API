//dom elelemtns that will hold the item, such h2, h3, h4...
const getTriviaBtn = document.querySelector('#get-trivia-btn');
const categoryH2 = document.getElementById('category-h2');
const questionH3 = document.getElementById('question-h3');
const categoryMenu = document.getElementById('category-menu');
const scoreBox = document.getElementById('score-box');

//getting all 4 buttons at once, in an array
const ansChoiceBtns = document.querySelectorAll('.answer-choice-btn');

categoryMenu.addEventListener('change', fetchTriviaQuestion);
getTriviaBtn.addEventListener('click', fetchTriviaQuestion);


//declaring global variables
let correctAns, score=0, tries=0, avg=0;

for (let i = 0; i < ansChoiceBtns.length; i++) {
    ansChoiceBtns[i].addEventListener('click', evalAnswerChoise)
}

//declaring the function that will hold the url and parse it
function fetchTriviaQuestion() {
    categoryH2.innerHTML = '';
    questionH3.innerHTML = '';
    ansChoiceBtns.innerHTML = '';

    fetch(`https://opentdb.com/api.php?amount=1&category=${categoryMenu.value}&type=multiple`, {method: 'GET'})
    .then(jsonData=>{
        return jsonData.json(); 
        
    })
    .then((object)=>{
        //outputing the categrory and question into the DOM
        categoryH2.innerHTML = `category: ${object.results[0].category}`;
        questionH3.innerHTML = `Question: ${object.results[0].question}`;

       correctAns = object.results[0].correct_answer

       const allChoices = [...object.results[0].incorrect_answers, correctAns + '&nbsp'];

       allChoices.sort(()=>Math.random() - 0.5);

        for (let i = 0; i < ansChoiceBtns.length; i++) {
            ansChoiceBtns[i].innerHTML = `${ansChoiceBtns[i].id}. &nbsp ${allChoices[i]}`;
           
            ansChoiceBtns[i].style.backgroundColor = '#eee'; //white
            ansChoiceBtns[i].style.color = '#333'; //black

            ansChoiceBtns[i].style.display = 'block';
        }
    })
} //end of fetchFunction


function evalAnswerChoise() {
    //increment the number of tries, for the number of tries 
    tries++; 

    if (this.innerHTML.slice(-6) == '&nbsp;') {
        //change the color of the correct answer to green
        this.style.backgroundColor = 'darkgreen';
        score ++; //if we're right ,increase by 1

       //give the next question auto
        let n = 0;
        while (n<1) {
            n++
            setTimeout(()=>{ 
                fetchTriviaQuestion();
            },1000);   
        }

    }else{
        this.style.backgroundColor = 'red';
    }
    //set the text color to white 
    this.style.color = '#fff';

    //calculate the average
    avg = score / tries;
    
    scoreBox.innerHTML = `Tries: ${tries} &nbsp; &nbsp; &nbsp; Score: ${score} &nbsp; &nbsp; &nbsp; Avg: ${avg}`;
}

