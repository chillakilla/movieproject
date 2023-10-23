//337b900e15c52de9d28faddf063e4885 api key

const apikey = '337b900e15c52de9d28faddf063e4885';

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMzdiOTAwZTE1YzUyZGU5ZDI4ZmFkZGYwNjNlNDg4NSIsInN1YiI6IjY1MmYzNmJmYTgwMjM2MDBhYjQwY2M1YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zLs09Telgn6NzSSZwcHnFbxIlpzVFdij9j9IhEnAJUU'
    }
};

function test(id) {
    alert(id);
}

fetch('https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1', options)
    .then(response => response.json())
    .then(response => {

        const movies = response.results;

        let temp_html = '';

        for (let i = 0; i < movies.length; i++) {
            const movie = movies[i];
            temp_html += `
            <div onclick="test(${movie.id})" class="movie-card" id="${movie.id}"><img class="posterimg" src="https://image.tmdb.org/t/p/w342/${movie.poster_path}" alt="poster">
                <h2 class="movie-title">${movie.title}</h2>
                <p class="overview">
                ${movie.overview}
                </p>
                <h3>${movie.vote_average}</h3>
            </div>`;
        }

        document.getElementById('movie-list').innerHTML = temp_html;

        // forEach로 사용한 카드 리스트
        // let movieCards = '';

        // movies.forEach(movie => {
        // movieCards +=
        // `<div class="movie-card"><img class="posterimg" src="https://image.tmdb.org/t/p/w342/${movie.poster_path}" alt="poster">
        // <h2 class="movie-title">${movie.title}</h2>
        // <p class="overview">
        // ${movie.overview}
        // </p>
        // <h3>${movie.vote_average}</h3>
        // </div>
        // `;
        // });


        // document.getElementById('movie-list').innerHTML = movieCards;
    })

    .catch(err => console.error(err));


// 위에까지 html에 데이터 다 불러옴
/*
<form class="searchbox">
<label for="input-search">영화 찾기 : </label>
<input type="text" id="input-search" placeholder="영화 제목을 입력하세요.">
<button type="submit" id="submit-btn" class="search-btn">검색</button>
</form>
*/
// ㄱㅣ존에 불러온 배열을 이용해서 검색에 쓰일 배열을 따로 만들어야 한다.
// 인풋에 올바른 조건 ~~ (나중에))
// 문자열을 입력하고 검색버튼을 했을 시 합당한 인ㅇ=풋
// 그러기 위해서는 기존에 존재하던 카드 리스트를 지우고
// 뽑아와서 다시 나타내야 한다.

function submit_btn() {
    document.querySelector('#submit_btn');
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.search_box');
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const input = document.querySelector('#input_search');
        const submit_btn = document.querySelector('#submit_btn');

        // document.querySelector('#submit_btn'); 이걸 사용할 때,
        // type = button은 내가 의도한 것과는 다르게 동작했다.

        const value = input.value.trim();

        if (value === '') {
            fetchMoviesAndPopulate();
        } else {
            searchMovies(value);
        }

    })
})

function searchMovies(value) {
    // console.log('god');
    // searchMovies 가 value 값에 올바르게 작동하나 확인.

    fetch('https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1', options)
        .then(response => response.json())
        .then(response => {
            const movies = response.results;
            //(영화에 대한 정보들의 객체)의 배열
            // 원하는 조건?
            // 영화의 제목 필요
            // 뭐하고 비교? 유저가 input한 value값하고
            // [1,5,6,7,87].filter(v => v > 5); filter 동작원리
            // => [6,7,87]
            const selectedMovies = movies.filter(movie => {
                // movies를 순회하면서
                // 참이 반환되면 그것을 빼와서 새로운 배열로 만든다
                const title = movie.title;

                return (
                    value === title ||
                    title.includes(value) ||
                    title.toLowerCase().includes(value.toLowerCase()) ||
                    title.toUpperCase().includes(value.toUpperCase()) ||
                    title.indexOf(value) !== -1
                );
            });
            // console.log(selectedMovies);
            // selectedMovies 가 올바르게 작동하는지 확인.

            let temp_html = '';


            for (let i = 0; i < selectedMovies.length; i++) {
                const movie = selectedMovies[i];
                temp_html += `
                <div onclick="test(${movie.id})" class="movie-card" id="${movie.id}"><img class="posterimg" src="https://image.tmdb.org/t/p/w342/${movie.poster_path}" alt="poster">
                    <h2 class="movie-title">${movie.title}</h2>
                    <p class="overview">
                        ${movie.overview}
                    </p>
                    <h3>${movie.vote_average}</h3>
                </div>`;
            }

            // ${selectedMovies.id} 를 넣었었는데 오류가 떴었음.
            // selectedMovies[i]; 가 movie 라고 지정해줬는데 저렇게 넣으면 오류가 나지...
            // ${movie.id} 이렇게 수정하니 오류 수정됨.
            document.getElementById('movie-list').innerHTML = temp_html;

        });
}













