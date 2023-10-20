//337b900e15c52de9d28faddf063e4885 api key

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMzdiOTAwZTE1YzUyZGU5ZDI4ZmFkZGYwNjNlNDg4NSIsInN1YiI6IjY1MmYzNmJmYTgwMjM2MDBhYjQwY2M1YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zLs09Telgn6NzSSZwcHnFbxIlpzVFdij9j9IhEnAJUU'
    }
};



fetch('https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1', options)
    .then(response => response.json())
    .then(response => {

        const movies = response.results;

        const movielist = [];

        movielist = results;



        let temp_html = '';


        for (let i = 0; i < movies.length; i++) {
            const movie = movies[i];
            temp_html += `
            <div class="movie-card"><img class="posterimg" src="https://image.tmdb.org/t/p/w342/${movie.poster_path}" alt="poster">
                <h2 class="movie-title">${movie.title}</h2>
                <p class="overview">
                  ${movie.overview}
                </p>
                <h3>${movie.vote_average}</h3>
                </div>`;
        }


        document.getElementById('movie-list').innerHTML = temp_html;

            
    
        // let movieCards = '';

        // movies.forEach(movie => {
        //     movieCards +=
        //         `<div class="movie-card"><img class="posterimg" src="https://image.tmdb.org/t/p/w342/${movie.poster_path}" alt="poster">
        //         <h2 class="movie-title">${movie.title}</h2>
        //         <p class="overview">
        //         ${movie.overview}
        //         </p>
        //         <h3>${movie.vote_average}</h3>
        //         </div>
        //         `;
        // });


        // document.getElementById('movie-list').innerHTML = movieCards;
    })
    .catch(err => console.error(err));

