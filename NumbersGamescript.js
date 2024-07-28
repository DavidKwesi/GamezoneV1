let startTime;
let timerInterval;
let generatedNumber = '';

function getRandomDigit() {
    return Math.floor(Math.random() * 10);
}



function startTiming() {
    startTime = new Date();
    document.getElementById('startButton').disabled = true;
    document.getElementById('stopButton').disabled = false;
    document.getElementById('timerContainer').innerHTML = '00:00:00';
    document.getElementById('inputContainer').innerHTML = '';
    document.getElementById('markButton').style.display = 'none';
    document.getElementById('resultContainer').innerHTML = '';

    timerInterval = setInterval(updateTimer, 1000);
    const numDigits = document.getElementById('numDigits').value;
    const splitDigits = document.getElementById('splitDigits').checked;

    if (numDigits < 2 || numDigits > 100) {
        alert('Please enter a number between 2 and 100.');
        return;
    }

    generatedNumber = '';
    for (let i = 0; i < numDigits; i++) {
        generatedNumber += getRandomDigit();
    }

    const numberContainer = document.getElementById('numberContainer');
    numberContainer.innerHTML = '';

    if (splitDigits) {
        for (let i = 0; i < numDigits; i += 2) {
            numberContainer.innerHTML += generatedNumber.slice(i, i + 2) + ' ';
        }
    } else {
        numberContainer.textContent = generatedNumber;
    }


}

function stopTiming() {
    clearInterval(timerInterval);
    const endTime = new Date();
    const timeElapsed = formatTime((endTime - startTime) / 1000);
    document.getElementById('timerContainer').innerHTML = `Time elapsed: ${timeElapsed}`;
    document.getElementById('startButton').disabled = false;
    document.getElementById('stopButton').disabled = true;

    const inputContainer = document.getElementById('inputContainer');
    inputContainer.innerHTML = '';

    const numberContainer = document.getElementById('numberContainer');
    numberContainer.innerHTML = '';

    const input = document.createElement('input');
    input.type = 'text';
    input.maxLength = generatedNumber.length;
    inputContainer.appendChild(input);

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
    const input = document.querySelector('#inputContainer input').value;
    let correctCount = 0;

    const numberContainer = document.getElementById('numberContainer');
    numberContainer.innerHTML = '';

    for (let i = 0; i < generatedNumber.length; i++) {
        const span = document.createElement('span');
        if (input.charAt(i) === generatedNumber.charAt(i)) {
            span.textContent = generatedNumber.charAt(i);
            span.classList.add('correct');
            correctCount++;
        } else {
            span.textContent = generatedNumber.charAt(i); // Show the original number only
            span.classList.add('incorrect');
        }
        numberContainer.appendChild(span);
        numberContainer.appendChild(document.createTextNode(' '));
    }

         const resultContainer = document.getElementById('resultContainer');
         resultContainer.innerHTML = `You got ${correctCount} out of ${generatedNumber.length} digits correct.`;

    // Get current date and time
    const now = new Date();
    const dateTimeString = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;

    const timeElapsed = formatTime((now - startTime) / 1000);
    // Store result in localStorage
    const result = `You played the <span style="color: gold; font-weight: bold;">number game</span> on ${dateTimeString} and scored ${correctCount} out of ${generatedNumber.length} with a time of ${timeElapsed}`;
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

document.getElementById('numberForm').addEventListener('submit', function(event) {
    event.preventDefault();
    generateNumber();
});

// window.onload = displayRecentActivities;

function redirectToMemorypage() {
    window.location.href = "MemoryMainPage.html";
}
