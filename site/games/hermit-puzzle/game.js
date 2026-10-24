async function loadPuzzles() {
    try {
        const response = await fetch('../games.json');
        return await response.json();
    } catch (e) {
        console.error("Failed to load puzzles", e);
        return [];
    }
}

let currentPuzzleIndex = 0;
let puzzles = [];

const elements = {
    progress: document.getElementById('progress'),
    sceneTitle: document.getElementById('scene-title'),
    sceneDesc: document.getElementById('scene-description'),
    itemsGrid: document.getElementById('items-grid'),
    hintDisplay: document.getElementById('hint-display'),
    hintText: document.getElementById('hint-text'),
    solutionContainer: document.getElementById('solution-container'),
    finalAnswer: document.getElementById('final-answer'),
    nextBtn: document.getElementById('next-btn')
};

async function initGame() {
    puzzles = await loadPuzzles();
    if (puzzles.length === 0) {
        elements.sceneTitle.innerText = "No puzzles found!";
        return;
    }
    renderPuzzle();
}

function renderPuzzle() {
    const puzzle = puzzles[currentPuzzleIndex];

    // Reset state
    elements.solutionContainer.classList.add('hidden');
    elements.hintDisplay.classList.add('hidden');
    elements.itemsGrid.innerHTML = '';

    // Setup header
    elements.progress.innerText = `Puzzle ${currentPuzzleIndex + 1} / ${puzzles.length}`;
    elements.sceneTitle.innerText = puzzle.scene;
    elements.sceneDesc.innerText = puzzle.description || "Search for the item that provides the correct hint to solve the puzzle.";

    // Setup items
    puzzle.items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerText = item.name;
        card.onclick = () => selectItem(item);
        elements.itemsGrid.appendChild(card);
    });
}

function selectItem(item) {
    // Highlight selected
    document.querySelectorAll('.item-card').forEach(card => {
        card.classList.remove('selected');
        if (card.innerText === item.name) card.classList.add('selected');
    });

    // Show hint
    elements.hintDisplay.classList.remove('hidden');
    elements.hintText.innerText = item.hint;

    // Check if this item is the solution
    if (item.isSolution) {
        showSolution(item);
    }
}

function showSolution(item) {
    elements.solutionContainer.classList.remove('hidden');
    elements.finalAnswer.innerText = `Solution: ${item.solutionText || "Puzzle Solved!"}`;
}

elements.nextBtn.onclick = () => {
    currentPuzzleIndex++;
    if (currentPuzzleIndex < puzzles.length) {
        renderPuzzle();
    } else {
        elements.sceneTitle.innerText = "Congratulations!";
        elements.sceneDesc.innerText = "You have solved all 100 puzzles!";
        elements.itemsGrid.innerHTML = '';
        elements.hintDisplay.classList.add('hidden');
        elements.solutionContainer.classList.add('hidden');
    }
};

initGame();
