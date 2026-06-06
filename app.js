// Default patterns definition to fall back if CSV fetch fails (e.g. running locally via file://)
const DEFAULT_PATTERNS = [
    { id: 1, name: "右右", arrow1: "R", arrow2: "R", cell1_row: 2, cell1_col: 1, cell2_row: 2, cell2_col: 3, pic1: "que_R.png", sec1: 10, pic2: "que_R.png", sec2: 7 },
    { id: 2, name: "左左", arrow1: "L", arrow2: "L", cell1_row: 2, cell1_col: 3, cell2_row: 2, cell2_col: 1, pic1: "que_L.png", sec1: 10, pic2: "que_L.png", sec2: 7 },
    { id: 3, name: "上上", arrow1: "U", arrow2: "U", cell1_row: 3, cell1_col: 2, cell2_row: 1, cell2_col: 2, pic1: "que_U.png", sec1: 10, pic2: "que_U.png", sec2: 7 },
    { id: 4, name: "下下", arrow1: "D", arrow2: "D", cell1_row: 1, cell1_col: 2, cell2_row: 3, cell2_col: 2, pic1: "que_D.png", sec1: 10, pic2: "que_D.png", sec2: 7 },
    { id: 5, name: "右下", arrow1: "R", arrow2: "D", cell1_row: 2, cell1_col: 2, cell2_row: 3, cell2_col: 3, pic1: "que_D.png", sec1: 10, pic2: "que_R.png", sec2: 7 },
    { id: 6, name: "下右", arrow1: "D", arrow2: "R", cell1_row: 2, cell1_col: 2, cell2_row: 3, cell2_col: 3, pic1: "que_D.png", sec1: 7, pic2: "que_R.png", sec2: 10 },
    { id: 7, name: "左下", arrow1: "L", arrow2: "D", cell1_row: 2, cell1_col: 2, cell2_row: 3, cell2_col: 1, pic1: "que_L.png", sec1: 7, pic2: "que_D.png", sec2: 10 },
    { id: 8, name: "下左", arrow1: "D", arrow2: "L", cell1_row: 2, cell1_col: 2, cell2_row: 3, cell2_col: 1, pic1: "que_L.png", sec1: 10, pic2: "que_D.png", sec2: 7 },
    { id: 9, name: "左上", arrow1: "L", arrow2: "U", cell1_row: 2, cell1_col: 2, cell2_row: 1, cell2_col: 1, pic1: "que_L.png", sec1: 7, pic2: "que_U.png", sec2: 10 },
    { id: 10, name: "上左", arrow1: "U", arrow2: "L", cell1_row: 2, cell1_col: 2, cell2_row: 1, cell2_col: 1, pic1: "que_L.png", sec1: 10, pic2: "que_U.png", sec2: 7 },
    { id: 11, name: "右上", arrow1: "R", arrow2: "U", cell1_row: 2, cell1_col: 2, cell2_row: 1, cell2_col: 3, pic1: "que_R.png", sec1: 7, pic2: "que_U.png", sec2: 10 },
    { id: 12, name: "上右", arrow1: "U", arrow2: "R", cell1_row: 2, cell1_col: 2, cell2_row: 1, cell2_col: 3, pic1: "que_R.png", sec1: 10, pic2: "que_U.png", sec2: 7 },
    { id: 13, name: "右右2", arrow1: "R", arrow2: "R", cell1_row: 1, cell1_col: 1, cell2_row: 1, cell2_col: 3, pic1: "que_R.png", sec1: 10, pic2: "que_R.png", sec2: 7 },
    { id: 14, name: "左左2", arrow1: "L", arrow2: "L", cell1_row: 3, cell1_col: 3, cell2_row: 3, cell2_col: 1, pic1: "que_L.png", sec1: 10, pic2: "que_L.png", sec2: 7 },
    { id: 15, name: "上上2", arrow1: "U", arrow2: "U", cell1_row: 3, cell1_col: 1, cell2_row: 1, cell2_col: 1, pic1: "que_U.png", sec1: 10, pic2: "que_U.png", sec2: 7 },
    { id: 16, name: "下下2", arrow1: "D", arrow2: "D", cell1_row: 1, cell1_col: 3, cell2_row: 3, cell2_col: 3, pic1: "que_D.png", sec1: 10, pic2: "que_D.png", sec2: 7 }
];

// Arrow SVGs
const ARROW_SVGS = {
    U: `<svg viewBox="0 0 24 24"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>`,
    D: `<svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>`,
    L: `<svg viewBox="0 0 24 24"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>`,
    R: `<svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`
};

// Game State Variables
let patterns = [];
let currentPattern = null;
let selectedCells = []; // Stores objects: { row: number, col: number }
let isInputLocked = false;

// Stats
const stats = {
    correct: 0,
    incorrect: 0,
    streak: 0,
    totalPlayed: 0
};

// DOM Elements
const correctCountEl = document.getElementById("correct-count");
const incorrectCountEl = document.getElementById("incorrect-count");
const streakCountEl = document.getElementById("streak-count");
const accuracyValueEl = document.getElementById("accuracy-value");
const patternNameEl = document.getElementById("pattern-name");
const arrowsDisplayEl = document.getElementById("arrows-display");
const messageTextEl = document.getElementById("message-text");
const messageDisplayEl = document.getElementById("message-display");
const gameGridEl = document.getElementById("game-grid");
const btnSkipEl = document.getElementById("btn-skip");
const btnResetEl = document.getElementById("btn-reset");
const btnShowAnswerEl = document.getElementById("btn-show-answer");
let showAnswerMode = false;
const toastMessageEl = document.getElementById("toast-message");

// Initialize Game
window.addEventListener("DOMContentLoaded", () => {
    buildGrid();
    loadPatterns();
    setupEventListeners();
});

// Build 5x5 Grid with Header Labels (0-based)
function buildGrid() {
    gameGridEl.innerHTML = "";
    
    // 1. Top-left corner cell (empty)
    const corner = document.createElement("div");
    corner.className = "grid-label";
    gameGridEl.appendChild(corner);
    
    // 2. Top labels (columns 0 to 4)
    for (let c = 0; c < 5; c++) {
        const label = document.createElement("div");
        label.className = "grid-label";
        label.textContent = c;
        gameGridEl.appendChild(label);
    }
    
    // 3. Grid Rows
    for (let r = 0; r < 5; r++) {
        // Left label (row indicator)
        const rowLabel = document.createElement("div");
        rowLabel.className = "grid-label";
        rowLabel.textContent = r;
        gameGridEl.appendChild(rowLabel);
        
        // 5 cells for the row
        for (let c = 0; c < 5; c++) {
            const cell = document.createElement("div");
            cell.className = "grid-cell";
            cell.dataset.row = r;
            cell.dataset.col = c;
            
            // Touch/Click Event
            cell.addEventListener("click", () => handleCellTap(r, c));
            cell.addEventListener("touchstart", (e) => {
                // Prevent duplicate trigger on mobile
                e.stopPropagation();
            }, { passive: true });

            gameGridEl.appendChild(cell);
        }
    }
}

// Setup Event Listeners
function setupEventListeners() {
    btnSkipEl.addEventListener("click", () => {
        if (isInputLocked) return;
        showToast("パターンをスキップしました");
        loadNextPattern();
    });

    btnResetEl.addEventListener("click", () => {
        if (confirm("スコアをリセットしますか？")) {
            resetStats();
            showToast("スコアをリセットしました");
        }
    });

    btnShowAnswerEl.addEventListener("click", () => {
        showAnswerMode = !showAnswerMode;
        if (showAnswerMode) {
            btnShowAnswerEl.classList.add("active");
            btnShowAnswerEl.textContent = "正解非表示";
        } else {
            btnShowAnswerEl.classList.remove("active");
            btnShowAnswerEl.textContent = "正解表示";
        }
        updateDebugDisplay();
    });
}

// Load Patterns from CSV
async function loadPatterns() {
    try {
        // Add timestamp to prevent browser cache issues
        const response = await fetch("patterns.csv?t=" + new Date().getTime());
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const csvText = await response.text();
        patterns = parseCSV(csvText);
        
        if (patterns.length === 0) {
            throw new Error("No patterns found in CSV");
        }
        showToast("CSVデータを読み込みました");
    } catch (error) {
        console.warn("CSVのフェッチに失敗しました。デフォルトデータを使用します:", error);
        patterns = [...DEFAULT_PATTERNS];
        showToast("デフォルトデータを読み込みました (ローカル環境)");
    }
    loadNextPattern();
}

// Simple robust CSV Parser
function parseCSV(text) {
    const lines = text.split(/\r?\n/);
    const parsedData = [];
    
    if (lines.length <= 1) return parsedData;
    
    // Extract headers (first line)
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue; // skip empty lines
        
        const cols = line.split(',').map(c => c.trim());
        if (cols.length < headers.length) continue; // skip malformed lines
        
        const item = {};
        headers.forEach((header, index) => {
            const val = cols[index];
            // Parse coordinate columns, ID, and sec counts as integers
            if (header.includes('row') || header.includes('col') || header.includes('sec') || header === 'id') {
                item[header] = parseInt(val, 10);
            } else {
                item[header] = val;
            }
        });
        
        parsedData.push(item);
    }
    return parsedData;
}

// Show Toast Alert
function showToast(message) {
    toastMessageEl.textContent = message;
    toastMessageEl.classList.add("show");
    setTimeout(() => {
        toastMessageEl.classList.remove("show");
    }, 2500);
}

// Load Next Random Pattern
function loadNextPattern() {
    selectedCells = [];
    clearSelectionStyles();
    
    if (patterns.length === 0) return;
    
    // Select a random pattern different from current if possible
    let nextPattern;
    if (patterns.length > 1) {
        do {
            const randomIndex = Math.floor(Math.random() * patterns.length);
            nextPattern = patterns[randomIndex];
        } while (currentPattern && nextPattern.id === currentPattern.id);
    } else {
        nextPattern = patterns[0];
    }
    
    currentPattern = nextPattern;
    renderPattern();
    updateDebugDisplay();
    
    messageTextEl.textContent = "マスを2つ順番に選んでください";
    messageDisplayEl.className = "message-display";
    isInputLocked = false;
}

// Render arrow images in UI
function renderPattern() {
    if (!currentPattern) return;
    
    patternNameEl.textContent = `パターン: ${currentPattern.name}`;
    arrowsDisplayEl.innerHTML = "";
    
    // Render 1st image & sec number
    const box1 = document.createElement("div");
    box1.className = "arrow-box-custom";
    
    const sec1El = document.createElement("span");
    sec1El.className = "sec-number";
    sec1El.textContent = currentPattern.sec1 !== undefined ? currentPattern.sec1 : "-";
    
    const img1 = document.createElement("img");
    img1.className = "arrow-image";
    img1.src = `assets/p1/${currentPattern.pic1 || 'que_R.png'}`;
    img1.alt = currentPattern.arrow1 || "arrow1";
    
    box1.appendChild(sec1El);
    box1.appendChild(img1);
    arrowsDisplayEl.appendChild(box1);
    
    // Render 2nd image & sec number
    const box2 = document.createElement("div");
    box2.className = "arrow-box-custom";
    
    const sec2El = document.createElement("span");
    sec2El.className = "sec-number";
    sec2El.textContent = currentPattern.sec2 !== undefined ? currentPattern.sec2 : "-";
    
    const img2 = document.createElement("img");
    img2.className = "arrow-image";
    img2.src = `assets/p1/${currentPattern.pic2 || 'que_R.png'}`;
    img2.alt = currentPattern.arrow2 || "arrow2";
    
    box2.appendChild(sec2El);
    box2.appendChild(img2);
    arrowsDisplayEl.appendChild(box2);
}

// Handle Tap on a grid cell
function handleCellTap(row, col) {
    if (isInputLocked) return;
    
    // Check if cell is already selected
    const existingIndex = selectedCells.findIndex(cell => cell.row === row && cell.col === col);
    
    if (existingIndex !== -1) {
        // Cancel Selection (Deselect)
        selectedCells.splice(existingIndex, 1);
        updateSelectionStyles();
        messageTextEl.textContent = selectedCells.length === 1 ? "2つ目のマスを選んでください" : "マスを2つ順番に選んでください";
    } else {
        // Add Selection
        if (selectedCells.length < 2) {
            selectedCells.push({ row, col });
            updateSelectionStyles();
            
            if (selectedCells.length === 1) {
                messageTextEl.textContent = "2つ目のマスを選んでください";
            } else if (selectedCells.length === 2) {
                isInputLocked = true; // Lock further inputs during evaluation
                setTimeout(evaluateAnswer, 300); // 300ms delay to let the user see the second tap
            }
        }
    }
}

// Update DOM classes for selected grid cells
function updateSelectionStyles() {
    // Clear old selection styles
    const cells = gameGridEl.querySelectorAll(".grid-cell");
    cells.forEach(cell => {
        cell.classList.remove("selected-1", "selected-2");
    });
    
    // Add current selection styles
    selectedCells.forEach((cell, index) => {
        const cellEl = gameGridEl.querySelector(`[data-row="${cell.row}"][data-col="${cell.col}"]`);
        if (cellEl) {
            cellEl.classList.add(`selected-${index + 1}`);
        }
    });
}

// Clear selection styles completely
function clearSelectionStyles() {
    const cells = gameGridEl.querySelectorAll(".grid-cell");
    cells.forEach(cell => {
        cell.classList.remove("selected-1", "selected-2");
    });
}

// Evaluate user's selection
function evaluateAnswer() {
    if (!currentPattern || selectedCells.length !== 2) return;
    
    // User selections
    const u1 = selectedCells[0];
    const u2 = selectedCells[1];
    
    const u1Row = Number(u1.row);
    const u1Col = Number(u1.col);
    const u2Row = Number(u2.row);
    const u2Col = Number(u2.col);
    
    // Correct cell coordinates
    const a1Row = Number(currentPattern.cell1_row);
    const a1Col = Number(currentPattern.cell1_col);
    const a2Row = Number(currentPattern.cell2_row);
    const a2Col = Number(currentPattern.cell2_col);
    
    // Directions
    const dir1 = String(currentPattern.arrow1).trim().toUpperCase();
    const dir2 = String(currentPattern.arrow2).trim().toUpperCase();
    
    let isCorrect = false;
    
    // 1. 方向が一緒の時 (例: 上上、下下、右右、左左): 順番にかかわらず組み合わせが一緒なら正解
    if (dir1 === dir2) {
        // パターンA: 1つ目の選択が正解1、2つ目の選択が正解2
        const matchNormal = (u1Row === a1Row && u1Col === a1Col && u2Row === a2Row && u2Col === a2Col);
        
        // パターンB (逆順): 1つ目の選択が正解2、2つ目の選択が正解1
        const matchReversed = (u1Row === a2Row && u1Col === a2Col && u2Row === a1Row && u2Col === a1Col);
        
        isCorrect = (matchNormal || matchReversed);
        
        console.log(`[同方向判定 (順不同)] パターン: ${currentPattern.name} (${dir1} & ${dir2})`);
        console.log(`ユーザー選択: ①(${u1Row}, ${u1Col}) ②(${u2Row}, ${u2Col})`);
        console.log(`正解データ: A(${a1Row}, ${a1Col}) B(${a2Row}, ${a2Col})`);
        console.log(`通常マッチ: ${matchNormal}, 逆順マッチ: ${matchReversed} -> 判定: ${isCorrect ? '正解' : '不正解'}`);
    } 
    // 2. 方向が違うとき (例: 右下、左下、右上、左上など): 順番を見て判定 (厳密に順序一致)
    else {
        // 順番通りに押しているかチェック
        isCorrect = (u1Row === a1Row && u1Col === a1Col && u2Row === a2Row && u2Col === a2Col);
        
        console.log(`[異方向判定 (順序一致)] パターン: ${currentPattern.name} (${dir1} -> ${dir2})`);
        console.log(`ユーザー選択: ①(${u1Row}, ${u1Col}) -> ②(${u2Row}, ${u2Col})`);
        console.log(`正解データ: A(${a1Row}, ${a1Col}) -> B(${a2Row}, ${a2Col})`);
        console.log(`判定: ${isCorrect ? '正解' : '不正解'}`);
    }
    
    // Process outcome
    if (isCorrect) {
        handleCorrectAnswer();
    } else {
        handleIncorrectAnswer();
    }
}

// Handle Correct Answer
function handleCorrectAnswer() {
    stats.correct++;
    stats.streak++;
    stats.totalPlayed++;
    updateStatsDOM();
    
    messageTextEl.textContent = "正解！ 素晴らしい！";
    messageDisplayEl.className = "message-display correct";
    
    // Add success glow styles
    gameGridEl.classList.add("correct-flash");
    gameGridEl.classList.add("pop-success");
    
    setTimeout(() => {
        gameGridEl.classList.remove("correct-flash", "pop-success");
        loadNextPattern();
    }, 1000);
}

// Handle Incorrect Answer
function handleIncorrectAnswer() {
    stats.incorrect++;
    stats.streak = 0; // Reset streak
    stats.totalPlayed++;
    updateStatsDOM();
    
    messageTextEl.textContent = "不正解！もう一度挑戦！";
    messageDisplayEl.className = "message-display incorrect";
    
    // Add error shake and red glow styles
    gameGridEl.classList.add("incorrect-flash");
    gameGridEl.classList.add("shake");
    
    setTimeout(() => {
        gameGridEl.classList.remove("incorrect-flash", "shake");
        // Load next pattern to keep momentum
        loadNextPattern();
    }, 1200);
}

// Update Scoreboard UI
function updateStatsDOM() {
    correctCountEl.textContent = stats.correct;
    incorrectCountEl.textContent = stats.incorrect;
    streakCountEl.textContent = stats.streak;
    
    const accuracy = stats.totalPlayed > 0 ? Math.round((stats.correct / stats.totalPlayed) * 100) : 0;
    accuracyValueEl.textContent = `${accuracy}%`;
}

// Reset Scoreboard Stats
function resetStats() {
    stats.correct = 0;
    stats.incorrect = 0;
    stats.streak = 0;
    stats.totalPlayed = 0;
    updateStatsDOM();
    loadNextPattern();
}

// Handle Debug Display outlines
function updateDebugDisplay() {
    // Clear old debug classes
    const cells = gameGridEl.querySelectorAll(".grid-cell");
    cells.forEach(cell => {
        cell.classList.remove("debug-correct-1", "debug-correct-2", "debug-correct-both");
    });
    
    // If showAnswerMode is active, draw correct cells from currentPattern
    if (showAnswerMode && currentPattern) {
        const r1 = currentPattern.cell1_row;
        const c1 = currentPattern.cell1_col;
        const r2 = currentPattern.cell2_row;
        const c2 = currentPattern.cell2_col;
        
        const cell1El = gameGridEl.querySelector(`[data-row="${r1}"][data-col="${c1}"]`);
        const cell2El = gameGridEl.querySelector(`[data-row="${r2}"][data-col="${c2}"]`);
        
        if (r1 === r2 && c1 === c2) {
            // If cell1 and cell2 are the same cell (unlikely in normal gameplay, but possible)
            if (cell1El) cell1El.classList.add("debug-correct-both");
        } else {
            if (cell1El) cell1El.classList.add("debug-correct-1");
            if (cell2El) cell2El.classList.add("debug-correct-2");
        }
    }
}
