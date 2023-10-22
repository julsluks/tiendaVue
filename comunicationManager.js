export async function getMovies() {
    let response = await fetch("https://www.omdbapi.com/?s=cars&apikey=8c3be63e");
    let movies = await response.json();
    console.log(movies);
    return movies.Search;
}