const text = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer"
];

let index = 0;

setInterval(() => {

    document.getElementById("typing").innerText =
        text[index];

    index++;

    if(index >= text.length){
        index = 0;
    }

}, 2000);
const filterButtons =
document.querySelectorAll(".filter-btn");

const projectCards =
document.querySelectorAll(".project-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        const filter =
        button.getAttribute("data-filter");

        projectCards.forEach(card => {

            if(filter === "all"){

                card.style.display = "block";
            }

            else if(
                card.classList.contains(filter)
            ){

                card.style.display = "block";
            }

            else{

                card.style.display = "none";
            }

        });

    });

});
const toggleBtn =
document.getElementById("theme-toggle");
if(
    localStorage.getItem("theme")
    === "dark"
){

    document.body.classList.add(
        "dark-mode"
    );

    toggleBtn.innerHTML = "☀️";
}

toggleBtn.addEventListener("click", () => {

    document.body.classList.toggle(
        "dark-mode"
    );

    if(
        document.body.classList.contains(
            "dark-mode"
        )
    ){

        toggleBtn.innerHTML = "☀️";

        localStorage.setItem(
            "theme",
            "dark"
        );

    }

    else{

        toggleBtn.innerHTML = "🌙";

        localStorage.setItem(
            "theme",
            "light"
        );

    }

});

if(
    localStorage.getItem("theme")
    === "dark"
){

    document.body.classList.add(
        "dark-mode"
    );

    toggleBtn.innerHTML = "☀️";
}
const form =
document.getElementById("contact-form");

const successMessage =
document.getElementById(
    "success-message"
);

form.addEventListener("submit",
function(e){

    e.preventDefault();

    successMessage.innerHTML =
    "Message Sent Successfully!";

    form.reset();

});