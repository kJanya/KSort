const canvas = document.getElementById('sortingCanvas');
const ctx = canvas.getContext('2d');

let array = [];
const arraySize = 100;
const barWidth = canvas.width / arraySize;
const maxHeight = canvas.height;

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function resetArray() {
    array = [];
    for (let i = 0; i < arraySize; i++) {
        array.push(randomInt(10, maxHeight));
    }
    drawArray();
}

function drawArray(highlightIndex = -1) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < array.length; i++) {
        ctx.fillStyle = (i === highlightIndex) ? 'red' : 'white';
        ctx.fillRect(i * barWidth, canvas.height - array[i], barWidth, array[i]);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubbleSort() {
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                drawArray(j + 1);
                await sleep(20); // Delay for visualization
            }
        }
    }
}

async function selectionSort() {
    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            let temp = array[i];
            array[i] = array[minIndex];
            array[minIndex] = temp;
            drawArray(i);
            await sleep(50); // Delay for visualization
        }
    }
}

async function insertionSort() {
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j--;
            drawArray(i);
            await sleep(20); // Delay for visualization
        }
        array[j + 1] = key;
        drawArray(i);
    }
}

function startBubbleSort() {
    bubbleSort();
}

function startSelectionSort() {
    selectionSort();
}

function startInsertionSort() {
    insertionSort();
}

// Initialize the array on page load
resetArray();
