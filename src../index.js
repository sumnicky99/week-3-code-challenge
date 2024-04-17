// Define the API endpoint URL
const url = "http://localhost:3000/films";

// Wait for the DOM content to be fully loaded before executing the code
document.addEventListener("DOMContentLoaded", () => {
    // Fetch movies and display them
    getMovies();
    // Add event listener for the "Buy Ticket" button
    document.querySelector("#buy-ticket").addEventListener("click", handleBuyTicket);
});

// Fetch movies data from the API endpoint
function getMovies() {
    fetch(url)
    .then(res => res.json())
    .then(movies => {
        // Render each movie in the list
        movies.forEach(movie => {renderMovieList(movie)})
        // Trigger click event for the first movie
        const firstMovie = document.querySelector("#id1");
        firstMovie.dispatchEvent(new Event("click"));
    })
}

// Render a movie in the list
function renderMovieList(movie) {
    // Create a new list item
    const li = document.createElement("li");
    // Set the text content of the list item to the movie title
    li.textContent = `${movie.title}`;
    // Set the id of the list item to "id" followed by the movie id
    li.id = "id" + movie.id;
    // Get the unordered list element
    const ul = document.querySelector("#films");
    // Append the list item to the unordered list
    ul.appendChild(li);
    // Add CSS classes to the list item
    li.classList.add("film");
    li.classList.add('item');
    // Add event listener for clicking on the list item
    li.addEventListener("click", () => {handleMovieClick(movie)});
   
    // Add a delete button next to the movie
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", (event) => {
        event.stopPropagation(); // Stop event propagation to avoid triggering handleMovieClick
        deleteMovie(movie.id);
        ul.removeChild(li); // Remove the movie from the client-side list
    });
    li.appendChild(deleteButton);
}

// Update movie details when a movie is clicked
function handleMovieClick(movie) {
    // Update movie poster
    const poster = document.querySelector("img#poster")
    poster.src = movie.poster;
    poster.alt = movie.title;
    // Update movie information
    const info = document.querySelector("#showing");
    info.querySelector("#title").textContent = movie.title;
    info.querySelector("#runtime").textContent = movie.runtime+" minutes";
    info.querySelector("#film-info").textContent = movie.description;
    info.querySelector("#showtime").textContent = movie.showtime;
    // Calculate and display remaining tickets
    const ticketDiv = info.querySelector("#ticket-num");
    const remainingTickets = movie.capacity - movie.tickets_sold;
    ticketDiv.textContent = remainingTickets + " remaining tickets";
    if (remainingTickets === 0) {
        // If no tickets are available, indicate that the movie is sold out
        ticketDiv.textContent = "Sold Out";
        ticketDiv.classList.add("sold-out");
    }
    else {
        // If tickets are available, remove the sold-out class
        ticketDiv.classList.remove("sold-out");
    }
}

// Handle buying tickets
function handleBuyTicket(e) {
    // Get the element displaying the remaining tickets
    const ticketDiv = document.querySelector("#ticket-num");
    const tickets = ticketDiv.textContent.split(" ")[0];
    // If tickets are available, decrement the count
    if (tickets > 0) {
        ticketDiv.textContent = tickets - 1 + " remaining tickets";
    }
    // If no tickets are available, alert the user
    else if (tickets == 0) {
        alert("Tickets Sold-out!!");
        // Change the style of the "Buy Ticket" button to indicate it's sold out
        e.target.classList.add("sold-out");
        e.target.textContent = "Sold Out";
    }
}
// Delete a movie from the server
function deleteMovie(movieId) {
    fetch(`${url}/${movieId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            console.log(`Movie with ID ${movieId} deleted successfully.`);
        } else {
            console.error(`Failed to delete movie with ID ${movieId}.`);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
