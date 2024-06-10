/* ********  The below array contains the set of questions and answer **********/ 

const questions = [
  {
    question: "Which is largest animal in the world?",
    answers: [
      { text: "Shark" , correct: false },
      { text: "Blue Whale" , correct: true },
      { text: "Elephant" , correct: false },
      { text: "Giraffe" , correct: false },
    ]
  },
  {
    question: "What is the capital of India?",
    answers: [
      { text: "Delhi" , correct: false },
      { text: "Mumbai" , correct: false },
      { text: "Chennai" , correct: false },
      { text: "Kolkata" , correct: true },
    ]
  },
  {
    question: "What is the smallest country in the world?",
    answers: [
      { text: "Vatican City" , correct: false },
      { text: "Monaco" , correct: false },
      { text: "San Marino" , correct: true },
      { text: "Liechtenstein" , correct: false },
    ]
  },
  {
    question: "Which is the longest river in the world?",
    answers: [
      { text: "Amazon River" , correct: false },
      { text: "Nile River" , correct: true },
      { text: "Yangtze River" , correct: false },
      { text: "Mississippi River" , correct: false },
    ]
  },
  {
    question: "Which is the largest ocean in the world?",
    answers: [
      { text: "Atlantic Ocean" , correct: true },
      { text: "Indian Ocean" , correct: false },
      { text: "Pacific Ocean" , correct: false },
      { text: "Arctic Ocean" , correct: false },
    ]
  }
];

const questionElement = document.getElementById('question');  /* Next Question */ 
const answerButtons = document.getElementById('answer-buttons'); /** Answers of the question Here */
const nextButton = document.getElementById("nextbtn") /** The Next Button Is here */

let currentQuestionIndex = 0;  /** count of questions */
let score = 0; /** score of corrects answers */


/** Questions functions are start here  */
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();  
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct){
      button.dataset.correct = answer.correct;

    }
    button.addEventListener("click",selectAnswer);
  });
}

function resetState(){
  nextButton.style.display = "none";
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e){
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect){
    score++;
  }
  Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore(){
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}`
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";

}

function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  }else{
    showScore();
  }
}

nextButton.addEventListener("click" , ()=>{
  if(currentQuestionIndex < questions.length){
   handleNextButton();
  }else{
    startQuiz();
  }
})

startQuiz(); 