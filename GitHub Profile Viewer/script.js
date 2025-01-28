// Get the button and input field elements from the HTML
const fetchButton = document.getElementById('fetch-button');
const usernameInput = document.getElementById('username');
const profileInfoDiv = document.getElementById('profile-info');

// Add an event listener to the button to fetch the profile when clicked
fetchButton.addEventListener('click', function() {
    // Get the username from the input field
    const username = usernameInput.value;
    // Clear previous profile information
    profileInfoDiv.innerHTML = '';

    // Check if the username is empty
    if (!username) {
        profileInfoDiv.innerHTML = '<p>Please enter a username.</p>';
        return; // Exit the function if no username is provided
    }

    // Fetch the user data from GitHub API
    fetch(`https://api.github.com/users/${username}`)
        .then(response => {
            // Check if the response is okay (status code 200)
            if (!response.ok) {
                throw new Error('User not found'); // Throw an error if user is not found
            }
            return response.json(); // Parse the JSON data
        })
        .then(data => {
            // Display the user's profile information
            profileInfoDiv.innerHTML = `
                <h2>${data.name} (${username})</h2>
                <img src="${data.avatar_url}" alt="${data.name}'s profile picture" style="width: 100px; height: 100px; border-radius: 50%;">
                <p><strong>Bio:</strong> ${data.bio || 'No bio available'}</p>
                <p><strong>Location:</strong> ${data.location || 'Not specified'}</p>
                <p><strong>Blog:</strong> <a href="${data.blog}" target="_blank">${data.blog || 'No blog available'}</a></p>
                <p><strong>LinkedIn:</strong> ${data.linkedin_username ? `<a href="https://linkedin.com/in/${data.linkedin_username}" target="_blank">${data.linkedin_username}</a>` : 'Not specified'}</p>
                <p><strong>Followers:</strong> ${data.followers}</p>
                <p><strong>Following:</strong> ${data.following}</p>
                <p><strong>Public Repos:</strong> ${data.public_repos}</p>
                <p><strong>Profile URL:</strong> <a href="${data.html_url}" target="_blank">${data.html_url}</a></p>
            `;
        })
        .catch(error => {
            // Display an error message if something goes wrong
            profileInfoDiv.innerHTML = `<p>${error.message}</p>`;
        });
});
