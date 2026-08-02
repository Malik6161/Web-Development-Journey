const inputBox = document.querySelector(".input-box");
const addBtn = document.querySelector(".add-btn");
const taskList = document.querySelector(".task-list");
const searchInput = document.querySelector(".search-input");

const totalTasks = document.getElementById("total-tasks");
const completedTasks = document.getElementById("completed-tasks");
const pendingTasks = document.getElementById("pending-tasks");

const clearBtn = document.querySelector(".clear-btn");
const emptyState = document.querySelector(".empty-state");

const filterButtons = document.querySelectorAll(".filter-btn");

let currentFilter = "All";

function updateStats() {

    const tasks = document.querySelectorAll(".task-list li");

    let completed = 0;

    tasks.forEach((task) => {
        if (task.classList.contains("completed")) {
            completed++;
        }
    });

    totalTasks.textContent = tasks.length;
    completedTasks.textContent = completed;
    pendingTasks.textContent = tasks.length - completed;

    if (tasks.length === 0) {
        emptyState.style.display = "block";
    }

    else {
        emptyState.style.display = "none";
    }

}

function applyFilter() {

    const tasks = document.querySelectorAll(".task-list li");

    tasks.forEach((task) => {

        if (currentFilter === "All") {
            task.style.display = "flex";
        }

        else if (currentFilter === "Active") {

            if (task.classList.contains("completed")) {
                task.style.display = "none";
            }

            else {
                task.style.display = "flex";
            }

        }

        else {

            if (task.classList.contains("completed")) {
                task.style.display = "flex";
            }

            else {
                task.style.display = "none";
            }

        }

    });

}

function createTask(taskText) {

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.innerText = taskText;

    const buttonBox = document.createElement("div");

    const completeBtn = document.createElement("button");
    completeBtn.innerText = "Complete";

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";

    deleteBtn.style.marginLeft = "8px";

    buttonBox.appendChild(completeBtn);
    buttonBox.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(buttonBox);

    taskList.appendChild(li);

    completeBtn.addEventListener("click", () => {

        li.classList.toggle("completed");

        if (li.classList.contains("completed")) {

            span.style.textDecoration = "line-through";
            span.style.color = "gray";
            completeBtn.innerText = "Undo";

        }

        else {

            span.style.textDecoration = "none";
            span.style.color = "black";
            completeBtn.innerText = "Complete";

        }

        updateStats();
        applyFilter();

    });

    deleteBtn.addEventListener("click", () => {

        li.remove();

        updateStats();
        applyFilter();

    });

    updateStats();
    applyFilter();

}

addBtn.addEventListener("click", () => {

    const task = inputBox.value.trim();

    if (task === "") {
        alert("Please enter a task.");
        return;
    }

    createTask(task);

    inputBox.value = "";
    inputBox.focus();

});

inputBox.addEventListener("keypress", (event) => {

    if (event.key === "Enter") {
        addBtn.click();
    }

});

searchInput.addEventListener("keyup", () => {

    const searchValue = searchInput.value.toLowerCase();

    const tasks = document.querySelectorAll(".task-list li");

    tasks.forEach((task) => {

        const text = task.querySelector("span").innerText.toLowerCase();

        if (text.includes(searchValue)) {
            task.style.display = "flex";
        }

        else {
            task.style.display = "none";
        }

    });

});

filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        filterButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        currentFilter = button.innerText;

        applyFilter();

    });

});

clearBtn.addEventListener("click", () => {

    const completed = document.querySelectorAll(".completed");

    completed.forEach((task) => {
        task.remove();
    });

    updateStats();

});

updateStats();