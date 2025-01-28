// API endpoint for fetching word definitions
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

// Get references to HTML elements
const result = document.getElementById("result"); // Element to display results
const btn = document.getElementById("search-btn"); // Search button
const inpWordField = document.getElementById("inp-word"); // Input field for the word

// Event listener for the search button click
btn.addEventListener("click", searchWord);

// Event listener for the Enter key press in the input field
inpWordField.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        searchWord(); // Trigger search when Enter is pressed
    }
});

// Function to search for the word and fetch its definition
function searchWord() {
    let inpWord = inpWordField.value.trim(); // Get the input word and trim whitespace
    
    if (inpWord) {
        // Fetch data from the API
        fetch(`${url}${inpWord}`)
        .then((response) => response.json()) // Parse the JSON response
        .then((data) => {
            console.log(data); // Log the data for debugging
            // Display the fetched data in the HTML
            result.innerHTML = `
            <div class="word">
                <h3>${inpWord}</h3>
                <button onclick="playSound()">
                    <i class="fas fa-volume-up"></i>
                </button>
            </div>
            <div class="details">
                <p>${data[0].meanings[0].partOfSpeech}</p>
                <p>${data[0].phonetic}</p>
            </div>
            <p class="word-meaning">
               ${data[0].meanings[0].definitions[0].definition}
            </p>
            <p class="word-example">
                ${data[0].meanings[0].definitions[0].example || "No example available."}
            </p>`;
        })
        .catch(() => {
            // Handle errors and display a message if the word is not found
            result.innerHTML = `<h3 class="error">Word not found!</h3>`;
        });
    } else {
        console.error("Input word is empty."); // Log an error if the input is empty
    }
}

// Function to play the pronunciation of the word
function playSound() {
    var word = inpWordField.value.trim(); // Get the input word
    if (word) {
        responsiveVoice.speak(word, "UK English Female"); // Play sound for the word
    } else {
        alert("Please enter a word to play sound."); // Alert if no word is entered
    }
}
