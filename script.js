let array = [];
const arrayContainer = document.getElementById('arrayContainer');
let delay = 100; // Delay for visualization (in ms)

// Function to generate a new random array
function generateArray() {
    array = [];
    arrayContainer.innerHTML = ''; // Clear previous bars

    // Generate 50 random values and create bars
    for (let i = 0; i < 50; i++) {
        const value = Math.floor(Math.random() * 100) + 5;
        array.push(value);

        // Create bar element
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value * 3}px`; // Scale height based on value
        bar.style.width = `${90 / array.length}%`; // Responsive width

        arrayContainer.appendChild(bar); // Append bar to container
    }
}

// Function to start sorting based on selected algorithm
function startSorting() {
    const algorithm = document.getElementById('algorithmSelect').value;
    switch (algorithm) {
        case 'bubbleSort':
            bubbleSort();
            break;
        case 'insertionSort':
            insertionSort();
            break;
        case 'quickSort':
            quickSort(0, array.length - 1);
            break;
        case 'mergeSort':
            mergeSort(0, array.length - 1);
            break;
        default:
            alert('Please select a sorting algorithm');
    }
}

// Utility function to swap bars in the DOM
function swap(i, j) {
    const bars = document.getElementsByClassName('bar');
    let tempHeight = bars[i].style.height;
    bars[i].style.height = bars[j].style.height;
    bars[j].style.height = tempHeight;
}

// Utility function for delay (used in sorting animations)
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Bubble Sort
async function bubbleSort() {
    const bars = document.getElementsByClassName('bar');
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                swap(j, j + 1);
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                await sleep(delay);
            }
        }
        bars[array.length - 1 - i].classList.add('sorted');
    }
    bars[0].classList.add('sorted');
}

// Insertion Sort
async function insertionSort() {
    const bars = document.getElementsByClassName('bar');
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            swap(j, j + 1);
            await sleep(delay);
            j = j - 1;
        }
        array[j + 1] = key;
    }
    for (let i = 0; i < array.length; i++) {
        bars[i].classList.add('sorted');
    }
}

// Quick Sort
async function quickSort(low, high) {
    if (low < high) {
        let pi = await partition(low, high);
        await quickSort(low, pi - 1);
        await quickSort(pi + 1, high);
    }
}

async function partition(low, high) {
    let pivot = array[high];
    let i = low - 1;
    const bars = document.getElementsByClassName('bar');
    for (let j = low; j < high; j++) {
        if (array[j] < pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];
            swap(i, j);
            await sleep(delay);
        }
    }
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    swap(i + 1, high);
    return i + 1;
}

// Merge Sort
async function mergeSort(l, r) {
    if (l >= r) {
        return;
    }
    const m = Math.floor((l + r) / 2);
    await mergeSort(l, m);
    await mergeSort(m + 1, r);
    await merge(l, m, r);
}

async function merge(l, m, r) {
    let n1 = m - l + 1;
    let n2 = r - m;
    let L = [], R = [];
    for (let i = 0; i < n1; i++) L[i] = array[l + i];
    for (let j = 0; j < n2; j++) R[j] = array[m + 1 + j];

    let i = 0, j = 0, k = l;
    const bars = document.getElementsByClassName('bar');
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            array[k] = L[i];
            bars[k].style.height = `${L[i] * 3}px`;
            i++;
        } else {
            array[k] = R[j];
            bars[k].style.height = `${R[j] * 3}px`;
            j++;
        }
        await sleep(delay);
        k++;
    }

    while (i < n1) {
        array[k] = L[i];
        bars[k].style.height = `${L[i] * 3}px`;
        i++;
        k++;
        await sleep(delay);
    }

    while (j < n2) {
        array[k] = R[j];
        bars[k].style.height = `${R[j] * 3}px`;
        j++;
        k++;
        await sleep(delay);
    }
}
