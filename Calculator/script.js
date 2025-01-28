const display = document.getElementById("display"); // Get the display element

// Function to append input to the display
function appendToDisplay(input) {
    display.value += input; // Add the input value to the display
}

// Function to clear the display
function clearDisplay() {
    display.value = ""; // Set the display value to an empty string
}

// Function to calculate the result of the expression in the display
function calculate() {
    try {
        display.value = eval(display.value); // Evaluate the expression and update the display
    } catch (error) {
        display.value = "Error"; // Show error message if evaluation fails
    }
}
