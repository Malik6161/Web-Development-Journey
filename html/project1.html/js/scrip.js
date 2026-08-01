// Navbar scroll effect

window.addEventListener("scroll", () => {
    const header = document.querySelector("header");

    if(window.scrollY > 50){
        header.style.background = "#ffffff";
        header.style.boxShadow = "0 5px 15px rgba(0,0,0,0.15)";
    }
    else{
        header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
    }
});


// Search bar animation

const searchInput = document.querySelector("input");

searchInput.addEventListener("focus", () => {
    searchInput.style.transform = "scale(1.03)";
    searchInput.style.transition = "0.3s";
});

searchInput.addEventListener("blur", () => {
    searchInput.style.transform = "scale(1)";
});


// Typing placeholder effect

const texts = [
    "Search for restaurant...",
    "Search for burgers...",
    "Search for pizza...",
    "Search for biryani...",
    "Search for Chinese food..."
];

let index = 0;

setInterval(() => {
    searchInput.placeholder = texts[index];
    index++;

    if(index >= texts.length){
        index = 0;
    }
}, 2500);


// Smooth appearance

document.addEventListener("DOMContentLoaded", () => {

    document.querySelector("p").style.opacity = "0";
    document.querySelector("input").style.opacity = "0";

    setTimeout(() => {
        document.querySelector("p").style.opacity = "1";
        document.querySelector("input").style.opacity = "1";
    }, 300);
});


// Logo hover animation

const logo = document.querySelector(".logo img");

logo.addEventListener("mouseenter", () => {
    logo.style.transform = "scale(1.08)";
    logo.style.transition = "0.3s";
});

logo.addEventListener("mouseleave", () => {
    logo.style.transform = "scale(1)";
});