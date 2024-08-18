var buttonBox = document.querySelector('.btns'),
    btns = document.querySelectorAll('.btns .btn'),
    x_turn = document.querySelector('.x_turn'),
    o_turn = document.querySelector('.o_turn'),
    showChange  = document.querySelector('.showChange'),
    choose = document.querySelectorAll('.choose'),
    startingPage = document.querySelector('.starting_page'),
    winnerName= document.querySelector('.winnerName'),
    mainPage = document.querySelector('.main_page'),
    winnerPage = document.querySelector('.winner_page'),
    playAgainBtn = document.querySelector('.playAgainBtn'),
    timerAnimation = document.querySelector('.timer')


let changeTurn = false;
let hasWinner = false;
let turnTimer

function startTimer(){
    clearTimeout(turnTimer)
    resetAnimation()
    turnTimer= setTimeout(() => {
        changeTurn = !changeTurn
        updateTurnIndicator()
        startTimer()
    }, 4000);
}


function resetAnimation(){
    timerAnimation.style.animation = 'none';
    timerAnimation.offsetHeight;
    timerAnimation.style.animation =' animate 4s linear forwards'
}

function updateTurnIndicator(){
    if(changeTurn){
        buttonBox.classList.remove('x')
        buttonBox.classList.add('o')
        timerAnimation.style.backgroundColor ="rgb(236, 42, 91)"
        showChange.style.left = '155px'
        showChange.style.backgroundColor = "rgb(236, 42, 91)"
        o_turn.style.color = '#fff'
        x_turn.style.color = "#000";
    }else{
        buttonBox.classList.add('x')
        buttonBox.classList.remove('o')
        timerAnimation.style.backgroundColor ="#183153"
        showChange.style.left = '155px'
        showChange.style.backgroundColor = "#183153"
        o_turn.style.color = '#000';
        x_turn.style.color = "#fff";
    }
}

choose.forEach(chooseNow => {
  chooseNow.addEventListener('click', ()=> {
    console.log(`Button clicked: ${chooseNow.id}`);
    if(chooseNow.id == 'playerx'){
        changeTurn = false
        updateTurnIndicator()
    }else{
        changeTurn = true
        updateTurnIndicator()
    }
    startingPage.style.display = 'none'
    mainPage.style.display = "block"
    startTimer()
  })  
});

btns.forEach(btn =>{
    btn.addEventListener('click', ()=>{
        if(btn.innerHTML === ""){
            if(!changeTurn){
                btn.innerHTML = 'X'
                btn.style.backgroundColor= "#183153"
                btn.id = "X"
                btn.style.pointerEvents = "none"
                changeTurn= true
            }else{
                btn.innerHTML = 'O'
                btn.style.backgroundColor= "rgb(236, 42, 91)"
                btn.id = "O"
                btn.style.pointerEvents = "none"
                changeTurn= false;
            }
        }
        updateTurnIndicator();
        startTimer();

        winningFunc();
        
        if(!hasWinner){
            drawFunc();
        }
    });
});

let winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function winningFunc(){
    for(let a = 0; a <= 7; a++){
        let b = winningCombinations[a]

        if(btns[b[0]].id == "" || btns[b[1]].id == "" || btns[b[2]].id == ""){
            continue
        }
        
        else if(btns[b[0]].id == "X" && btns[b[1]].id == "X" && btns[b[2]].id == "X") {
            winnerName.innerHTML ='Player <span class="winnerText">X </span> Won The Game!'
            
            let winnerText = document.querySelector('.winnerText')
            
            winnerText.style.color = "#183153"
            playAgainBtn.style.backgroundColor ="#183153"
            hasWinner = true

            incrementWinCount("X")


            setTimeout(() => {
               mainPage.style.display =  'none'
               winnerPage.style.display = 'block'
            }, 300);
            clearInterval(turnTimer)
            break
        }
        
        else if(btns[b[0]].id == "O" && btns[b[1]].id == "O" && btns[b[2]].id == "O") {
            winnerName.innerHTML ='Player <span class="winnerText">O </span> Won The Game!'
            
            let winnerText = document.querySelector('.winnerText')
            
            winnerText.style.color = "rgb(236, 42, 91)"
            playAgainBtn.style.backgroundColor ="rgb(236, 42, 91)"
            hasWinner = true

            incrementWinCount("O")

            setTimeout(() => {
               mainPage.style.display =  'none'
               winnerPage.style.display = 'block'
            }, 300);
            clearInterval(turnTimer)
            break
        }
    }
}

function drawFunc(){
    if(!hasWinner && Array.from(btns).every(box => box.id != "")){
        winnerName.innerHTML = 'Match has been Drawn!'
        setTimeout(() => {
            mainPage.style.display =  'none'
            winnerPage.style.display = 'block'
         }, 300)
         clearTimeout(turnTimer)
    }
}

function incrementWinCount(player){
    if(player == "X"){
        let xWins = document.getElementById("x_wins_count")
        xWins.innerHTML = parseInt(xWins.innerHTML) + 1
    }
    else if(player == "O"){
        let oWins = document.getElementById("o_wins_count")
        oWins.innerHTML = parseInt(oWins.innerHTML) + 1
    }
}

function resetGame(){
    changeTurn= false;
    hasWinner = false;

    winnerName.innerHTML = ""
    btns.forEach(btn => {
        btn.innerHTML = "";
        btn.id ="";
        btn.style.backgroundColor= "";
        btn.style.pointerEvents ='auto';
    })
    startingPage.style.display = "block"
    mainPage.style.display = "none"
    winnerPage.style.display = "none"
}

function resetWinCounters() {
    document.getElementById("x_wins_count").innerHTML = "0";
    document.getElementById("o_wins_count").innerHTML = "0";
}

playAgainBtn.addEventListener('click', ()=>{
    resetGame()
});

document.querySelector('.resetBtn').addEventListener('click', () => {
    resetGame();
    resetWinCounters();
});