// Typing Speed Tester JavaScript with Flip and Animations

let timer;
let timeLeft = 30; // Timer duration in seconds
let wpm = 0;
let isTyping = false;
let isFlipped = false; // Track if the container has already flipped

// Select DOM elements
const container = document.querySelector(".container");
const textToType = document.getElementById("text-to-type");
const inputBox = document.getElementById("input-box");
const timeLeftDisplay = document.getElementById("time-left");
const wpmDisplay = document.getElementById("wpm");
const startButton = document.getElementById("start-button");

// Predefined sentences
const sentences = [
  "The quick brown fox jumps over the lazy dog.",
  "A journey of a thousand miles begins with a single step.",
  "All that glitters is not gold.",
  "To be or not to be, that is the question.",
  "Fortune favors the bold."
];

// Add flip animation to the container (only once)
function flipContainer() {
  if (!isFlipped) {
    container.style.transition = "transform 0.6s";
    container.style.transform = "rotateY(360deg)";
    setTimeout(() => {
      container.style.transform = "rotateY(0deg)";
    }, 600);
    isFlipped = true; // Mark the container as flipped
  }
}

// Add animations to the text and heading
function animateTextAndHeading() {
  textToType.style.animation = "fadeIn 1s ease-in-out, textGlow 1.5s infinite";
  document.querySelector("h1").style.animation = "bounceIn 1.5s ease-in-out, textGlow 1.5s infinite";
}

// Reset the game
function resetGame() {
  clearInterval(timer);
  timeLeft = 30;
  wpm = 0;
  isTyping = false;
  inputBox.value = "";
  timeLeftDisplay.textContent = timeLeft;
  wpmDisplay.textContent = wpm;
  textToType.textContent = sentences[Math.floor(Math.random() * sentences.length)];
  inputBox.disabled = true;
  document.body.style.backgroundColor = "#f3f4f6"; // Reset background color
  flipContainer();
  animateTextAndHeading();
}

// Start the game
function startGame() {
  resetGame();
  inputBox.disabled = false;
  inputBox.focus();
  isTyping = true;
  document.body.style.backgroundColor = "#e6ffed"; // Change background color to indicate start
  timer = setInterval(updateTimer, 1000);
  animateTextAndHeading();
}

// Update the timer and calculate WPM
function updateTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timeLeftDisplay.textContent = timeLeft;

    // Calculate WPM
    const typedText = inputBox.value.trim();
    const wordCount = typedText.split(/\s+/).filter(word => word.length > 0).length;
    wpm = Math.round((wordCount / (30 - timeLeft)) * 60);
    wpmDisplay.textContent = wpm;
  } else {
    clearInterval(timer);
    isTyping = false;
    inputBox.disabled = true;
    alert(`Time's up! Your WPM is ${wpm}.`);
    document.body.style.backgroundColor = "#f3f4f6"; // Reset background color
  }
}

// Event listeners
startButton.addEventListener("click", startGame);
inputBox.addEventListener("input", () => {
  if (!isTyping) {
    startGame();
  }
});

// Initialize the game
resetGame();
