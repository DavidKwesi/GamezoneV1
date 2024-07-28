const words = [
    "apple", "banana", "cherry", "date", "elderberry", "fig", "grape", "honeydew",
    "kiwi", "lemon", "mango", "nectarine", "orange", "papaya", "quince", "raspberry",
    "strawberry", "tangerine", "ugli", "vanilla", "watermelon", "xigua", "yam", "zucchini"
];

let startTime;
let timerInterval;
let generatedWords = [];

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}



function startTiming() {
    startTime = new Date();
    document.getElementById('startButton').disabled = true;
    document.getElementById('stopButton').disabled = false;
    document.getElementById('timerContainer').innerHTML = 'eyes on me, eyes on me...';
    document.getElementById('inputContainer').innerHTML = '';
    document.getElementById('markButton').style.display = 'none';
    document.getElementById('resultContainer').innerHTML = '';

    timerInterval = setInterval(updateTimer, 1000);

    const numWords = document.getElementById('numWords').value;
    if (numWords < 1 || numWords > 100) {
        alert('Please enter a number between 1 and 100.');
        return;
    }

    const wordsContainer = document.getElementById('wordsContainer');
    wordsContainer.innerHTML = '';
    generatedWords = [];

    for (let i = 0; i < numWords; i++) {
        const li = document.createElement('li');
        const word = getRandomWord();
        li.textContent = word;
        wordsContainer.appendChild(li);
        generatedWords.push(word);
    }
   



}

function stopTiming() {
    const wordsContainer = document.getElementById('wordsContainer');
    wordsContainer.innerHTML = '';

    const inputContainer = document.getElementById('inputContainer');
    inputContainer.innerHTML = '';
    generatedWords.forEach((word, index) => {
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = `Word ${index + 1}`;
        inputContainer.appendChild(input);
    });

    document.getElementById('markButton').style.display = 'block';

    clearInterval(timerInterval);
    const endTime = new Date();
    const timeElapsed = formatTime((endTime - startTime) / 1000);
   
    document.getElementById('timerContainer').innerHTML = `Time elapsed: ${timeElapsed}`;
    document.getElementById('startButton').disabled = false;
    document.getElementById('stopButton').disabled = true;
    document.getElementById('testButton').disabled = false;

   
    



    document.getElementById('markButton').style.display = 'block';
}




function updateTimer() {
    const currentTime = new Date();
    const timeElapsed = formatTime((currentTime - startTime) / 1000);
    document.getElementById('timerContainer').innerHTML = `Time elapsed: ${timeElapsed}`;
}

function formatTime(seconds) {
    const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const s = String(Math.floor(seconds % 60)).padStart(2, '0');
    return `${h}:${m}:${s}`;
}

function markAnswers() {
    const inputs = document.querySelectorAll('#inputContainer input');
    let correctCount = 0;
    const allowAnyOrder = document.getElementById('allowAnyOrder').checked;

    const wordsContainer = document.getElementById('wordsContainer');
    wordsContainer.innerHTML = '';

    if (allowAnyOrder) {
        const userWords = Array.from(inputs).map(input => input.value.toLowerCase());
        generatedWords.forEach((word, index) => {
            const li = document.createElement('li');
            if (userWords.includes(word.toLowerCase())) {
                li.textContent = word;
                li.classList.add('correct');
                correctCount++;
                userWords.splice(userWords.indexOf(word.toLowerCase()), 1);
            } else {
                li.textContent = `(The word is ${word}) (You wrote: ${inputs[index].value})`;
                li.classList.add('incorrect');
            }
            wordsContainer.appendChild(li);
        });
    } else {
        inputs.forEach((input, index) => {
            const li = document.createElement('li');
            if (input.value.toLowerCase() === generatedWords[index].toLowerCase()) {
                li.textContent = generatedWords[index];
                li.classList.add('correct');
                correctCount++;
            } else {
                li.textContent = `(The word is ${generatedWords[index]}) (You wrote: ${input.value})`;
                li.classList.add('incorrect');
            }
            wordsContainer.appendChild(li);
        });
    }

    const resultContainer = document.getElementById('resultContainer');
    resultContainer.innerHTML = `You got ${correctCount} out of ${generatedWords.length} words correct.`;

    const now = new Date();
    const dateTimeString = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;

    const timeElapsed = formatTime((now - startTime) / 1000);
    // Store result in localStorage
    const result = `You played the <span style="color: gold; font-weight: bold;">word game</span> on ${dateTimeString} and scored ${correctCount} out of ${generatedWords.length} with a time of ${timeElapsed}`;
    storeRecentActivity(result);
}

function storeRecentActivity(activity) {
    let activities = JSON.parse(localStorage.getItem('recentActivities')) || [];
    activities.push(activity);
    if (activities.length > 5) {
        activities = activities.slice(-5); // Keep only the latest 5 activities
    }

    localStorage.setItem('recentActivities', JSON.stringify(activities));
    displayRecentActivities();
}

function displayRecentActivities() {
    const recentActivities = JSON.parse(localStorage.getItem('recentActivities')) || [];
    const recentActivitiesContainer = document.getElementById('recentActivities');
    if (recentActivitiesContainer) {
        recentActivitiesContainer.innerHTML = recentActivities.map(activity => `<p>${activity}</p>`).join('');
    }
}

document.getElementById('wordForm').addEventListener('submit', function(event) {
    event.preventDefault();
    generateWords();
});


function redirectToMemorypage() {
    window.location.href = "MemoryMainPage.html";
}