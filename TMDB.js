//337b900e15c52de9d28faddf063e4885 api key
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
function donghak(movies) {
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
}



// 현재 fetch는 처음에 영화 데이터를 받아오고 그것을 기준으로 html에 데이터를 채워넣는거죠(동적)
fetch('https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1', options)
    .then(response => response.json())
    .then(response => {

        const movies = response.results;

        donghak(movies);
    

    
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
// 위에까지 html에 데이터 다 불러옴
/* 
<form class="searchbox">
    <label for="input-search">영화 찾기 : </label>
    <input type="text" id="input-search" placeholder="영화 제목을 입력하세요.">
    <button type="submit" id="submit-btn" class="search-btn">검색</button>
</form>
*/
// ㄱㅣ존에 불러온 배열을 이용해서 검색에 쓰일 배열을 따로 만들어야 한다.
// 인풋에 올바른 조건 ~~  (나중에))
// 문자열을 입력하고 검색버튼을 했을 시 합당한 인ㅇ=풋
// 그러기 위해서는 기존에 존재하던 카드 리스트를 지우고
// 뽑아와서 다시 나타내야 한다.
const form = document.querySelector('form.searchbox');
form.addEventListener('submit',(event)=>{
    event.preventDefault(); // 리로드를 안한다.
    
    const input = document.querySelector('#input-search');
    const value = input.value;

    
    fetch('https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1', options)
    .then(response => response.json())
    .then(response => {
        const movies = response.results;
        //(영화에 대한 정보들의 객체)의 배열
        // 원하는 조건이 뭐죠?
        // 영화의 제목이 필요하죠
        // 뭐하고 비교할거죠? 유저가 작성한 value값하고
        // [1,5,6,7,87].filter(v => v > 5); filter 동작원리
        // => [6,7,87]
        const selectedMovies = movies.filter(movie => { 
            // movies를 순회하면서
            // 참이 반환되면 그것을 빼와서 새로운 배열로 만든다
            const title = movie.title;

            // indexOf()

            return value === title ||
                    title.includes(value) || 
                    title.toLowerCase().inclues(value.toLowerCase()) ||
                    title.toUpperCase().inclues(value.toUpperCase()) ||
                    title.indexOf(value) !== -1 
        });

        donghak(selectedMovies);



    });

    
});