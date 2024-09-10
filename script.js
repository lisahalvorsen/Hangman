// Model
let secretWord = '';
let currentWord = '';
let guessedLetter = '';
let words = ['solkrem', 'blomst', 'bil', 'skolebolle', 'programmering', 'regnbue', 'papegøye', 'brannmann', 'helikopter'];
let randomWord = '';
let message = '';

// View
function updateView() {
    document.getElementById('app').innerHTML = /*HTML*/ `
    <div id="container">
        <h1>Hangman</h1>
        <div><em>Gjett ordet ved å skrive inn en bokstav om gangen (ordet er på norsk)</em></div>
        <div>${currentWord}</div>
        
        <div>
            <input type="text" oninput="guessedLetter = this.value">
            <button onclick="guessWord()">Gjett!</button>
        </div>
        <div>${message}</div>
    </div>
    `;
}

// Controller
function guessWord() {
    if (!guessedLetter) {
        message = `Prøv igjen :)`;
        updateView();
        return;
    }

    if (guessedLetter.length > 1) {
        guessedLetter = '';
        return;
    }

    currentWord = evaluateHangman(secretWord, currentWord, guessedLetter);
    checkIfWon();
    updateView();
}

function generateRandomWord() {
    randomWord = words[Math.floor(Math.random() * words.length)];
    secretWord = randomWord;
    currentWord = '_'.repeat(secretWord.length);
}

function evaluateHangman(secretWord, currentWord, guessedLetter) {
    const index = secretWord.indexOf(guessedLetter);

    if (index == -1) return currentWord;
    const currentTextBeforeGuessedLetter = currentWord.substring(0, index);
    const currentTextAfterGuessedLetter = currentWord.substring(index + 1);
    const secretTextAfterGuessedLetter = secretWord.substring(index + 1);

    return currentTextBeforeGuessedLetter + guessedLetter
        + evaluateHangman(secretTextAfterGuessedLetter, currentTextAfterGuessedLetter, guessedLetter);
}

function checkIfWon() {
    if (currentWord === secretWord) {
        message = 'You guessed the word :D <button onclick="startNewGame()">Spill på nytt</button>';
    }
}

function startNewGame() {
    message = '';
    generateRandomWord();
    updateView();
}

generateRandomWord();
updateView();