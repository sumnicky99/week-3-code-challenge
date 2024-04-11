
// Your code here
const baseUrl = `http://localhost:3000/films`

fetch(baseUrl, {
method: 'GET',
headers: {
'Content-Type':'application/json'
}
}).then((res) => res.json())

.then((data) => {
const movieTitles = document.getElementById('films')
data.forEach((title) => {

const movieList = document.createElement('li')

movieList.classList.add('film', 'item')
movieList.addEventListener("click", async () => {
currentFilmId = title.id;
const selectedFilm = await fetchFilmById(currentFilmId);
updateFilmDetails(selectedFilm);
});
movieList.innerText = title.title
movieTitles.append(movieList) 

})
})

const fetchFilmById = async (id) => {
const response = await
fetch(`${baseUrl}/${id}`);
const filmData = await response.json()

return filmData 
}

const updateFilmDetails = selectedFilm => {
const posters = document.getElementById('poster')

posters.src = selectedFilm.poster

const movieTitles = document.getElementById('title')

movieTitles.innerHTML = selectedFilm.title
}
