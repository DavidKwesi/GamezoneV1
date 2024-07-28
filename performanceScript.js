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

    const rawData = getPerformanceData();
    const performanceData = parsePerformanceData(rawData);

    const labels = performanceData.map(entry => entry.date);
    const wordScores = performanceData.filter(entry => entry.gameType === 'word').map(entry => entry.score);
    const numberScores = performanceData.filter(entry => entry.gameType === 'number').map(entry => entry.score);
    const wordTimes = performanceData.filter(entry => entry.gameType === 'word').map(entry => parseTimeToSeconds(entry.time));
    const numberTimes = performanceData.filter(entry => entry.gameType === 'number').map(entry => parseTimeToSeconds(entry.time));

    const ctx = document.getElementById('performanceChart').getContext('2d');
    const performanceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Word Game Scores',
                    data: wordScores,
                    borderColor: 'blue',
                    fill: false,
                    yAxisID: 'y-score',
                },
                {
                    label: 'Number Game Scores',
                    data: numberScores,
                    borderColor: 'green',
                    fill: false,
                    yAxisID: 'y-score',
                },
                {
                    label: 'Word Game Times',
                    data: wordTimes,
                    borderColor: 'red',
                    fill: false,
                    yAxisID: 'y-time',
                },
                {
                    label: 'Number Game Times',
                    data: numberTimes,
                    borderColor: 'orange',
                    fill: false,
                    yAxisID: 'y-time',
                }
            ]
        },
        options: {
            scales: {
                'y-score': {
                    type: 'linear',
                    position: 'left',
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Score'
                    }
                },
                'y-time': {
                    type: 'linear',
                    position: 'right',
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Time (seconds)'
                    },
                    grid: {
                        drawOnChartArea: false,
                    },
                },
                x: {
                    title: {
                        display: true,
                        text: 'Date'
                    }
                }
            }
        }
    });
});
