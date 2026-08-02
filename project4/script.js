// ===========================================
// Random Color Generator
// ===========================================

// Select Required Elements

const body = document.body;

const colorBox = document.getElementById("colorBox");

const colorCode = document.getElementById("colorCode");

const generateBtn = document.getElementById("generateBtn");

const copyBtn = document.getElementById("copyBtn");

const message = document.getElementById("message");

// ===========================================
// Generate Random HEX Color
// ===========================================

function generateRandomColor() {

    // HEX Characters

    const letters = "0123456789ABCDEF";

    let color = "#";

    // Generate 6 Random Characters

    for (let i = 0; i < 6; i++) {

        color += letters[Math.floor(Math.random() * 16)];

    }

    // Update Background

    body.style.background = color;

    // Update Preview Box

    colorBox.style.background = color;

    // Update Text

    colorCode.innerText = color;

    // Clear Old Message

    message.innerText = "";

}

// ===========================================
// Copy Color Code
// ===========================================

copyBtn.addEventListener("click", () => {

    navigator.clipboard.writeText(colorCode.innerText);

    message.innerText = "✅ Color Code Copied!";

    setTimeout(() => {

        message.innerText = "";

    }, 2000);

});

// ===========================================
// Generate Button Click
// ===========================================

generateBtn.addEventListener("click", generateRandomColor);

// ===========================================
// Generate Using Spacebar
// ===========================================

document.addEventListener("keydown", (event) => {

    // Prevent page scrolling

    if (event.code === "Space") {

        event.preventDefault();

        generateRandomColor();

    }

});

// ===========================================
// Generate First Color on Page Load
// ===========================================

generateRandomColor();