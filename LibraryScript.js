const stories = [
    { title: "Story 1", text: "This is the first story. It has simple words for testing.", type: "text" },
    { title: "Story 2", text: "This is the second story. It is slightly more complex and longer.", type: "text" },
    // Add more stories as needed
];

let currentWords = [];
let currentWordIndex = 0;
let readingInterval;

function displayStories() {
    const storyList = document.getElementById('storyList');
    storyList.innerHTML = '';
    stories.forEach((story, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = story.title;
        storyList.appendChild(option);
    });
    storyList.onchange = () => openStory(storyList.value);
}

function openStory(index) {
    const story = stories[index];
    document.getElementById('storyTitle').textContent = story.title;
    const textContainer = document.getElementById('textContainer');
    const pdfContainer = document.getElementById('pdfContainer');
    textContainer.innerHTML = '';
    pdfContainer.innerHTML = '';
    clearInterval(readingInterval);
    currentWordIndex = 0;

    if (story.type === "text") {
        currentWords = story.text.split(' ');
        currentWords.forEach((word, idx) => {
            const span = document.createElement('span');
            span.textContent = word + ' ';
            span.onclick = () => startReadingFromIndex(idx);
            if (idx === 0) {
                span.classList.add('highlight');
            }
            pdfContainer.appendChild(span);
        });
    } else if (story.type === "pdf") {
        renderPDF(story.data, pdfContainer, textContainer);
    }

    document.getElementById('readingSection').style.display = 'block';
    document.getElementById('startButton').disabled = false;
    document.getElementById('stopButton').disabled = true;
}

function startReading() {
    const speed = document.getElementById('speed').value;
    document.getElementById('startButton').disabled = true;
    document.getElementById('stopButton').disabled = false;

    if (currentWordIndex < currentWords.length) {
        const currentSpan = document.querySelectorAll('#pdfContainer span')[currentWordIndex];
        if (currentSpan) {
            currentSpan.classList.add('highlight');
        }
    }

    readingInterval = setInterval(() => {
        if (currentWordIndex < currentWords.length - 1) {
            const currentSpan = document.querySelectorAll('#pdfContainer span')[currentWordIndex];
            const nextSpan = document.querySelectorAll('#pdfContainer span')[currentWordIndex + 1];
            if (currentSpan && nextSpan) {
                currentSpan.classList.remove('highlight');
                currentWordIndex++;
                nextSpan.classList.add('highlight');
            } else {
                clearInterval(readingInterval);
            }
        } else {
            clearInterval(readingInterval);
        }
    }, 60000 / speed); // words per minute to milliseconds per word
}

function startReadingFromIndex(index) {
    clearInterval(readingInterval);
    const currentSpan = document.querySelectorAll('#pdfContainer span')[currentWordIndex];
    if (currentSpan) {
        currentSpan.classList.remove('highlight');
    }
    currentWordIndex = index;
    startReading();
}

function stopReading() {
    clearInterval(readingInterval);
    document.getElementById('startButton').disabled = false;
    document.getElementById('stopButton').disabled = true;
}

async function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
        const reader = new FileReader();
        reader.onload = async function(e) {
            try {
                const loadingTask = pdfjsLib.getDocument({ data: e.target.result });
                const pdf = await loadingTask.promise;

                const pdfData = e.target.result;

                stories.push({ title: file.name, type: "pdf", data: pdfData });
                displayStories();
            } catch (error) {
                console.error('Error loading PDF:', error);
                alert('Error loading PDF. Please try again.');
            }
        };
        reader.readAsArrayBuffer(file);
    } else {
        alert('Please upload a valid PDF file.');
    }
}

async function renderPDF(pdfData, container, textContainer) {
    try {
        const loadingTask = pdfjsLib.getDocument({ data: pdfData });
        const pdf = await loadingTask.promise;
        const totalPages = pdf.numPages;

        for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const viewport = page.getViewport({ scale: 1 });

            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            await page.render(renderContext).promise;

            const textContent = await page.getTextContent();
            textContent.items.forEach((item) => {
                const textSpan = document.createElement('span');
                const style = `transform: matrix(${item.transform.join(',')}); font-size: ${item.height}px;`;
                textSpan.style = style;
                textSpan.textContent = item.str;
                pdfContainer.appendChild(textSpan);
            });
        }

        currentWords = Array.from(pdfContainer.querySelectorAll('span')).map(span => span.textContent);
    } catch (error) {
        console.error('Error rendering PDF:', error);
        alert('Error rendering PDF. Please try again.');
    }
}

function deleteStory() {
    const storyList = document.getElementById('storyList');
    const selectedIndex = storyList.selectedIndex;
    if (selectedIndex >= 0 && stories[selectedIndex]) {
        stories.splice(selectedIndex, 1);
        displayStories();
        document.getElementById('readingSection').style.display = 'none';
    }
}

document.getElementById('fileUpload').addEventListener('change', handleFileUpload);

document.addEventListener('DOMContentLoaded', displayStories);




























function redirectToReadingPage() {
    window.location.href = "ReadingMainPage.html";
  }