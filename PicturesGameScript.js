const emojis=["😊","😊","😂","😂","🤣","🤣","❤️","❤️",
"😘","😘","👌","👌","👍","👍","🙌","🙌"];
var shuf_emojis= emojis.sort(()=>(Math.random() > .5)? 2: -1);

let timerInterval;
let seconds = 0;
let minutes = 0;
let timerDisplay = document.getElementById('timer');
let timerRunning = false;
let Clicknum=0;


function startTimer() {
    if (!timerRunning) {
        timerInterval = setInterval(updateTimer, 1000);
        timerRunning = true;
    }
}   


function updateTimer() {
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }
    timerDisplay.textContent = pad(minutes) + ":" + pad(seconds);
}


function pad(val) {
    return val > 9 ? val : "0" + val;
}

function stopTimer() {
    clearInterval(timerInterval);
    timerRunning = false;
}




document.querySelector('.game').addEventListener('click', function(event) {
    if (event.target.classList.contains('item')) {
        startTimer();
        Clicknum++;
        document.getElementById('Clicks').textContent = Clicknum;
        // Logic to handle the card click event
        // Example: flip the card, check for matches, etc.
        // Once all cards are matched, call stopTimer() to stop the timer
        if(document.querySelectorAll('.boxMatch').length == emojis.length){
            stopTimer();
        }
    }
});



for( var i =0; i<emojis.length; i++){
    let box = document.createElement('div')
    box.className= "item";
    box.innerHTML = shuf_emojis[i];
    
    box.onclick = function(){
        this.classList.add('boxOpen')
       setTimeout(function(){
        if(document.querySelectorAll('.boxOpen').length>1){
            if(document.querySelectorAll('.boxOpen')[0].innerHTML == document.querySelectorAll('.boxOpen')[1].innerHTML){
                document.querySelectorAll('.boxOpen')[0].classList.add('boxMatch')
                document.querySelectorAll('.boxOpen')[1].classList.add('boxMatch')

                document.querySelectorAll('.boxOpen')[1].classList.remove('boxOpen')
                document.querySelectorAll('.boxOpen')[0].classList.remove('boxOpen')

                if(document.querySelectorAll('.boxMatch').length == emojis.length){
                    alert('Congrats! You win!')
                    stopTimer();
                    
                }
            } else{
             document.querySelectorAll('.boxOpen')[1].classList.remove('boxOpen')
             document.querySelectorAll('.boxOpen')[0].classList.remove('boxOpen')
            }
        }
       },500) 
    }

    
    document.querySelector('.game').appendChild(box);
}






document.querySelectorAll('.boxOpen').forEach(item => {
    item.addEventListener('click', event => {
        // Start the timer when a card is clicked
        startTimer();
        // Logic to handle the card click event
        // Example: flip the card, check for matches, etc.
        // Once all cards are matched, call stopTimer() to stop the timer
       
    });
});




function redirectToMemorypage() {
    window.location.href = "MemoryMainPage.html";
}