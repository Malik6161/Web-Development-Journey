// Constants

const university = "University of Agriculture Faisalabad";
const passingMarks = 50;
const maximumMarks = 100;


// Connect the button to the JavaScript function

document.getElementById("calculateButton").addEventListener("click", calculateResult);


// Main function

function calculateResult() {

    // Get values from HTML input fields

    let name = document.getElementById("studentName").value.trim();
    let roll = document.getElementById("rollNumber").value.trim();

    let htmlInput = document.getElementById("htmlMarks").value;
    let jsInput = document.getElementById("jsMarks").value;

    let result = document.getElementById("result");


    // Check for empty fields

    if (
        name === "" ||
        roll === "" ||
        htmlInput === "" ||
        jsInput === ""
    ) {
        result.textContent = "Please fill in all fields.";
        return;
    }


    // Convert marks into numbers

    let html = Number(htmlInput);
    let javascript = Number(jsInput);


    // Validate marks

    if (
        !Number.isFinite(html) ||
        !Number.isFinite(javascript) ||
        html < 0 ||
        html > maximumMarks ||
        javascript < 0 ||
        javascript > maximumMarks
    ) {
        result.textContent = "Please enter marks between 0 and 100.";
        return;
    }


    // Calculate total marks

    let total = html + javascript;


    // Calculate percentage

    let percentage = (total / (maximumMarks * 2)) * 100;


    // Check pass or fail

    let status;

    if (html >= passingMarks && javascript >= passingMarks) {
        status = "Pass";
    } else {
        status = "Fail";
    }


    // Clear the previous result

    result.replaceChildren();


    // Create result heading

    let heading = document.createElement("h2");
    heading.textContent = "Student Result";
    result.appendChild(heading);


    // Store result details

    let details = [
        ["University", university],
        ["Name", name],
        ["Roll Number", roll],
        ["HTML Marks", html + "/" + maximumMarks],
        ["JavaScript Marks", javascript + "/" + maximumMarks],
        ["Total Marks", total + "/200"],
        ["Percentage", percentage.toFixed(2) + "%"],
        ["Status", status]
    ];


    // Display each result detail

    details.forEach(function(item) {

        let paragraph = document.createElement("p");

        let label = document.createElement("strong");
        label.textContent = item[0] + ": ";

        let value = document.createTextNode(item[1]);

        paragraph.appendChild(label);
        paragraph.appendChild(value);

        result.appendChild(paragraph);

    });

}