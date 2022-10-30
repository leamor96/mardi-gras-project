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
    //1
    question: "When was the first Mardi Gras?",
    choice1: "Feb. 24, 1857",
    choice2: "Jan. 20, 1957",
    choice3: "Oct. 10, 2010",
    choice4: "Feb. 24, 1867",
    answer: 1,
  },
  {
    //2
    question: "What are the Mardi Gras colors?",
    choice1: "red, blue and green",
    choice2: "gold, pink and yellow",
    choice3: "purple, green and gold",
    choice4: "gold, purple and pink",
    answer: 3,
  },
  {
    //3
    question: "What is Twelfth Night?",
    choice1: "The night of the celebrations ending",
    choice2: "The official start of Mardi Gras",
    choice3: "the twelfth day of the festival",
    choice4: "the twelfth day of january",
    answer: 2,
  },
  {
    //4
    question: "How does Mardi Gras benefit the New Orleans economy?",
    choice1: "one hundred fifty million",
    choice2: "three million",
    choice3: "five hundred thousand",
    choice4: "over $1 billion",
    answer: 4,
  },
  {
    //5
    question: "What is the signature Mardi Gras dessert?",
    choice1: "King cake",
    choice2: "Pancakes",
    choice3: "S'mores dip",
    choice4: "Ice cream",
    answer: 1,
  },
  {
    //6
    question: "What does purple signify during Mardi Gras?",
    choice1: "Power",
    choice2: "Faith",
    choice3: "Blossom",
    choice4: "Justice",
    answer: 4,
  },
  {
    //7
    question: "What is traditionally hidden inside a king cake?",
    choice1: "A plastic baby",
    choice2: "Santa Claus figurine",
    choice3: "A Crown",
    choice4: "A plastic candy",
    answer: 1,
  },
  {
    //8
    question: "How many king cakes are sold during an average carnival season?",
    choice1: "1.2 million",
    choice2: "500,000",
    choice3: "100,000",
    choice4: "20,000",
    answer: 2,
  },
  {
    //9
    question: "What does gold signify during Mardi Gras?",
    choice1: "Justice",
    choice2: "Faith",
    choice3: "Power",
    choice4: "Royalty",
    answer: 3,
  },
  {
    //10
    question:
      "How many times have Mardi Gras parades been canceled in New Orleans?",
    choice1: "13",
    choice2: "none",
    choice3: "2",
    choice4: "10",
    answer: 1,
  },
];

const SCORE_POINTS = 10;
const MAX_QUESTIONS = 10;

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