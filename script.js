import { apikey } from "./key.js";
let input = document.getElementById("searchInput");
let valueInput = null;
let img = document.getElementById("imgMovie");
let searchMoviesDiv = document.getElementById("showMovies");
let imbd = null;

/*const response = () => {
  let api = `http://www.omdbapi.com/?s=${valueInput}&apikey=${apikey}`;
  fetch(api)
    .then((response) => response.json())
    .then((data) => {
      let image = document.createElement("img");
      image.setAttribute("src", ``);
    });
};*/

const loadListMovies = () => {
  let endpoint = `http://www.omdbapi.com/?s=${valueInput}&apikey=${apikey}`;
  fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let contentPostWrite = document.getElementById("showContent");
      contentPostWrite.innerHTML = "";

      try {
        for (let i of data.Search) {
          if (i.Poster != "N/A") {
            let divPosterMovies = document.createElement("div");
            let nameMovie = document.createElement("p");
            nameMovie.setAttribute("class", "nameMoviePoster");
            divPosterMovies.setAttribute("class", "infoMovies");
            divPosterMovies.setAttribute("id", `${i.imdbID}`);
            let posterFilm = document.createElement("img");
            posterFilm.setAttribute("src", `${i.Poster}`);
            posterFilm.setAttribute("class", "posterImage");
            divPosterMovies.append(posterFilm);
            nameMovie.append(`${i.Title}`);
            divPosterMovies.append(nameMovie);
            contentPostWrite.append(divPosterMovies);
          } else {
            return;
          }
        }
      } catch (error) {
        return error;
      }
      const responseMovie = () => {
        let showThem = [...document.querySelectorAll(".infoMovies")];
        showThem.map((el) => {
          el.addEventListener("click", (evt) => {
            console.log(evt);
          });
        });
      };
      responseMovie();
    });
};
const onloadMovie = (movieName) => {
  let api = `http://www.omdbapi.com/?${movieName}&apikey=${apikey}`;
  fetch(api)
    .then((response) => response.json())
    .then((data) => {
      let image = document.createElement("img");
      let divStars = document.createElement("div");
      let divRating = document.createElement("div");
      let divShowMoviesSeries = document.createElement("div");
      divShowMoviesSeries.setAttribute("class", "showContentContainer");
      divShowMoviesSeries.setAttribute("id", "showContent");
      let paragraphRating = document.createElement("p");
      divRating.setAttribute("class", "ratingContainer");
      divStars.setAttribute("class", "starsContent");

      let icon1 = document.createElement("i");
      let icon2 = document.createElement("i");
      let icon3 = document.createElement("i");
      icon1.setAttribute("class", "fa-solid fa-star");
      icon1.style.color = "yellow";
      icon1.style.fontSize = "15px";
      icon2.setAttribute("class", "fa-solid fa-star");
      icon2.style.color = "yellow";
      icon3.setAttribute("class", "fa-solid fa-star");
      icon3.style.color = "yellow";
      icon3.style.fontSize = "15px";
      image.setAttribute("src", `${data.Poster}`);
      image.setAttribute("class", "positionImage");
      img.appendChild(image);
      searchMoviesDiv.appendChild(divShowMoviesSeries);
      divStars.appendChild(icon1);
      divStars.appendChild(icon2);
      divStars.appendChild(icon3);
      img.appendChild(divStars);
      paragraphRating.append(data.imdbRating);
      divRating.appendChild(paragraphRating);
      img.appendChild(divRating);
      console.log(data);
    });
};

document.addEventListener(
  "load",
  input.focus(),
  onloadMovie("t=guardians of the galaxy vol.3")
);

document.addEventListener("keyup", () => {
  valueInput = input.value;
  loadListMovies();
});
