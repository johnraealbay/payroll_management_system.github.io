var inputBill = document.getElementById("bill");
var cashGiven = document.getElementById("cash-given");
var checkBtn = document.getElementById("check-btn");
var errMsg = document.getElementById("error");

// Select note cells
var noteCells = document.querySelectorAll(".note");

// Denominations (order matches table)
var notes = [2000, 500, 100, 20, 10, 5, 1];

// Show error
function errorHandle(message) {
    errMsg.style.display = "block";
    errMsg.innerText = message;
}

// Hide error
function hideMessage() {
    errMsg.style.display = "none";
}

// Clear previous results
function clearNotes() {
    noteCells.forEach(cell => cell.innerText = 0);
}

// Handle button click
function clickHandler() {
    hideMessage();
    clearNotes();

    var billValue = Number(inputBill.value);
    var cashValue = Number(cashGiven.value);

    if (billValue <= 0) {
        errorHandle("Invalid bill amount.");
        return;
    }

    if (cashValue < billValue) {
        errorHandle("Cash given is less than bill amount.");
        return;
    }

    var remaining = cashValue - billValue;

    if (remaining === 0) {
        errorHandle("Exact cash given. No change needed.");
        return;
    }

    for (var i = 0; i < notes.length; i++) {
        var count = Math.floor(remaining / notes[i]);
        remaining %= notes[i];
        noteCells[i].innerText = count;
    }
}

checkBtn.addEventListener("click", clickHandler);
