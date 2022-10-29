const question= document.querySelector('#question');
const choices= Array.from(document.querySelectorAll('.choice-text'));
const progressText= document.querySelector('#progressText');
const scoreText= document.querySelector('#score');
const progressBarFull= document.querySelector('#progressBarFull');

let currentQuestion={}
let acceptingAnswers=true
let score=0
let questionCounter=0
let availableQuestion=[]

let questions = [
  {
    question: "When was the first Mardi Gras?",
    choice1: "Feb. 24, 1857",
    choice2: "Jan. 20, 1957",
    choice3: "Oct. 10, 2010",
    choice4: "Feb. 24, 1867",
    answer: 1,
  },
  {
    question: "What are the Mardi Gras colors?",
    choice1: "red, blue and green",
    choice2: "gold, pink and yellow",
    choice3: "purple, green and gold",
    choice4: "gold, purple and pink",
    answer: 3,
  },
  {
    question: "What is Twelfth Night?",
    choice1: "The night of the celebrations ending",
    choice2: "The official start of Mardi Gras",
    choice3: "the twelfth day of the festival",
    choice4: "the twelfth day of january",
    answer: 2,
  },
  {
    question: "How does Mardi Gras benefit the New Orleans economy?",
    choice1: "one hundred fifty million",
    choice2: "three million",
    choice3: "five hundred thousand",
    choice4: "over $1 billion",
    answer: 4,
  }
]

const SCORE_POINTS= 100
const MAX_QUESTIONS=4

startGame = () => {
    questionCounter=0
    score=0
    availableQuestion=[...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestion.length===0 || questionCounter>MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerHTML= `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width= `${(questionCounter/MAX_QUESTIONS) * 100}%`
    const questionIndex= Math.floor(Math.random()*availableQuestion.length)
    currentQuestion= availableQuestion[questionIndex]
    question.innerText= currentQuestion.question

    choices.forEach(choice =>{
        const number= choice.dataset['number']
        choice.innerText= currentQuestion['choice'+ number]
    })
    availableQuestion.splice(questionIndex, 1)

    acceptingAnswers=true
} 

choices.forEach(choice=>{
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers= false
        const selectedChoice= e.target
        const selectedAnswer= selectedChoice.dataset['number']

        let classToApply= selectedAnswer==currentQuestion.answer ? 'correct': 'incorrect'

        if(classToApply==='correct'){
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(()=>{
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore= num=>{
    score +=num
    scoreText.innerText= score
}
 startGame()