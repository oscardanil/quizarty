// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
        question : "When must a fire control alignment test be conducted?",
        imgSrc : "img/html.png",
        choiceA : "A)Once every 3 months if the cannon is fired ",
        choiceB : "B)Once each year if the cannon is used for non-firing training",
        choiceC : "C)As soon as possible after extensive use",
        choiceD : "D)After traveling over extremely rough terrain",
        correct : "B"

    },{
        question : "What does TLABSPAP stand for?",
        imgSrc : "img/css.png",
        choiceA : "A)rail, Lift, Aim, Bore, Secure, Prime, Activate, Protect",
        choiceB : "B)Train, Load, Adjust, Brace, Set, Prepare, Aim, Position",
        choiceC : "C)Target, Load, Align, Bore, Sight, Position, Aim, Proceed",
        choiceD : "D)Trails, Lay, Aiming point identified, Boresight verified, Safe, Prefer checks performed, Ammunition prepared, Position improvement",
        correct : "D"
    },{
        question : "What is the purpose of a comparison test of M140/M140A1 alignment device?",
        imgSrc : "img/css.png",
        choiceA : "A)It ensures that the devices are calibrated to the same standard",
        choiceB : "B)It compares the effectiveness of different alignment devices",
        choiceC : "C)It is performed to identify any device that has been bent or damaged due to accident or mishandling",
        choiceD : "D)It verifies the precision of the device under different conditions",
        correct : "C"
      },{
        question : "What is a Cook Off?",
        imgSrc : "img/css.png",
        choiceA : "A)When a meal is prepared using a field stove",
        choiceB : "B)When the propellant can ignite itself by being in a hot tube",
        choiceC : "C)When the engine of a vehicle overheats",
        choiceD : "D)When ammunition is disposed of by burning",
        correct : "B"
      },{
        question : "What is the minimum burn time for the M1066 projectile?",
        imgSrc : "img/css.png",
        choiceA : "A)120 seconds",
        choiceB : "B)90 seconds",
        choiceC : "C)180 seconds",
        choiceD : "D)150 seconds",
        correct : "A"
      },{
        question:  "What is the purpose of the surge tank",
        imgSrc : "img/css.png",
        choiceA : "A)Regulates pressure in the engine",
        choiceB : "B)Collects excess fuel from the engine",
        choiceC : "C)Cools the coolant flowing through it",
        choiceD : "D)Filters impurities from the coolant",
        correct : "C"
      },{
        question:  "When the rammer is in the stowed position, the pointer will be in the _____ band.",
        imgSrc : "img/css.png",
        choiceA : "A)Red",
        choiceB : "B)Green",
        choiceC : "C)Blue",
        choiceD : "D)Black",
        correct : "D"
      },{
        question:  "The M109A6 howitzer should not exceed how many mils of cant when boresighting of firing?",
        imgSrc : "img/css.png",
        choiceA : "A)90 mils",
        choiceB : "B)60 mils",
        choiceC : "C)120 mils",
        choiceD : "D)30 mils",
        correct : "A"
      },{
        question:  "How much does a M825 projectile weigh?",
        imgSrc : "img/css.png",
        choiceA : "A)100 lbs",
        choiceB : "B)102 lbs",
        choiceC : "C)105 lbs",
        choiceD : "D)110 lbs",
        correct : "B"
      },{
        question:  "The maximum rate of fire for the 109A6 is _____ rounds per minute.",
        imgSrc : "img/css.png",
        choiceA : "A)3",
        choiceB : "B)4",
        choiceC : "C)5",
        choiceD : "D)6",
        correct : "B"
    }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 300; // 5min
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];

    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";

    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);

    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";

    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}