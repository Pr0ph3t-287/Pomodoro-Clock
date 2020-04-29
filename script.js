let sessionLength = 25;
let breakLength = 5;
let runningTimer = "session";
let running = false;
let started = false;
let seconds = 1500;

const sessionDisplay = document.querySelector("#session");
const breakDisplay = document.querySelector("#break");
const timerDisplay = document.querySelector("#timer");

function setDisplay() {
	timerDisplay.innerText = (parseInt((seconds / 60) > 9 ? (seconds / 60) : ("0" + (seconds / 60))) + ":" + ((seconds % 60) > 9 ? (seconds % 60) : ("0" + (seconds % 60))));
}

setDisplay();

function setSessionLength(e) {
	if (!started) {
		if (e.target.innerText == "+") {
		if (sessionLength < 60) {
			sessionLength++;
			sessionDisplay.innerText = sessionLength;
		}
	} else if (e.target.innerText == "-") {
		if (sessionLength > 1) {
			sessionLength--;
			sessionDisplay.innerText = sessionLength;
		}
	}
	seconds = sessionLength * 60;
	setDisplay();
	}
}

function setBreakLength(e) {
	if (!started) {
		if (e.target.innerText == "+") {
		if (breakLength < 60) {
			breakLength++;
			breakDisplay.innerText = breakLength;
		}
	} else if (e.target.innerText == "-") {
		if (breakLength > 1) {
			breakLength--;
			breakDisplay.innerText = breakLength;
		}
	}
	setDisplay();
	}
}

let timer = setInterval(interval, 1000);

function interval(){
	if (running) {
		seconds--;
		if (seconds < 1) {
			if (runningTimer == "session") {
				runningTimer = "break";
				seconds = breakLength * 60;
			} else if (runningTimer == "break") {
				runningTimer = "session";
				seconds = sessionLength * 60;
			} 
		} else {
			setDisplay();
		}
	}
}


function startTimer() {
	running = true;
	if (!started) {
		let newTimer = timer;
		started = true;
	}
}

function pauseTimer() {
	running = false;
}

function reset() {
	running = false;
	started = false;
	runningTimer = "session";
	seconds = sessionLength * 60;
	setDisplay();
}

const sessionAdd = document.querySelector("#session-btn-add");
sessionAdd.addEventListener("click", setSessionLength);

const sessionSubtract = document.querySelector("#session-btn-subtract");
sessionSubtract.addEventListener("click", setSessionLength);

const breakAdd = document.querySelector("#break-btn-add");
breakAdd.addEventListener("click", setBreakLength);

const breakSubtract = document.querySelector("#break-btn-subtract");
breakSubtract.addEventListener("click", setBreakLength);

const playButton = document.querySelector("#play");
playButton.addEventListener("click", startTimer);

const pauseButton = document.querySelector("#pause");
pauseButton.addEventListener("click", pauseTimer);

const resetButton = document.querySelector("#reset");
resetButton.addEventListener("click", reset);
