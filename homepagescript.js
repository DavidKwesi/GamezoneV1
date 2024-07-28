// homepagescript.js
document.addEventListener("DOMContentLoaded", function() {
    var storedUsername = localStorage.getItem("username") || "DefaultUser";
    document.getElementById("username").textContent = storedUsername;
});


function displayRecentActivities() {
    const recentActivities = JSON.parse(localStorage.getItem('recentActivities')) || [];
    const recentActivitiesList = document.getElementById('recentActivitiesList');
    if (recentActivitiesList) {
        recentActivitiesList.innerHTML = recentActivities.map(activity => `<li>${activity}</li>`).join('');
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const profilePictureUrl = localStorage.getItem('profilePictureUrl');
    if (profilePictureUrl) {
        const profilePhotoElement = document.querySelector('.profile-photo');
        profilePhotoElement.src = profilePictureUrl;
    }
});

window.onload = displayRecentActivities;



document.addEventListener('DOMContentLoaded', () => {
    function getPerformanceData() {
        return JSON.parse(localStorage.getItem('recentActivities')) || [];
    }

    function parsePerformanceData(data) {
        return data.map(entry => {
            const parts = entry.match(/You played the <span style="color: gold; font-weight: bold;">(word|number) game<\/span> on (\d+\/\d+\/\d+ \d+:\d+:\d+ (?:AM|PM)) and scored (\d+) out of (\d+).*with a time of (\d+:\d+:\d+)/);
            if (parts) {
                return {
                    gameType: parts[1],
                    date: parts[2],
                    score: parseInt(parts[3], 10),
                    total: parseInt(parts[4], 10),
                    time: parts[5]
                };
            }
            return null;
        }).filter(entry => entry !== null);
    }

    function parseTimeToSeconds(time) {
        const parts = time.split(':');
        return parseInt(parts[0], 10) * 3600 + parseInt(parts[1], 10) * 60 + parseInt(parts[2], 10);
    }

    function formatTime(seconds) {
        const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        const s = String(Math.floor(seconds % 60)).padStart(2, '0');
        return `${h}:${m}:${s}`;
    }

    function displayGameStats() {
        const rawData = getPerformanceData();
        const performanceData = parsePerformanceData(rawData);

        const wordScores = performanceData.filter(entry => entry.gameType === 'word').map(entry => entry.score);
        const numberScores = performanceData.filter(entry => entry.gameType === 'number').map(entry => entry.score);
        const wordTimes = performanceData.filter(entry => entry.gameType === 'word').map(entry => parseTimeToSeconds(entry.time));
        const numberTimes = performanceData.filter(entry => entry.gameType === 'number').map(entry => parseTimeToSeconds(entry.time));

        const highestWordScore = Math.max(...wordScores);
        const highestNumberScore = Math.max(...numberScores);
        const bestWordTime = Math.min(...wordTimes);
        const bestNumberTime = Math.min(...numberTimes);

        document.getElementById('wordGameHighScore').textContent = `High Score: ${highestWordScore}`;
        document.getElementById('wordGameBestTime').textContent = `Best Time: ${formatTime(bestWordTime)}`;

        document.getElementById('numberGameHighScore').textContent = `High Score: ${highestNumberScore}`;
        document.getElementById('numberGameBestTime').textContent = `Best Time: ${formatTime(bestNumberTime)}`;
    }

    displayGameStats();
});
