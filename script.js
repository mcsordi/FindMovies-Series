import { apikey } from "./key.js";
let input = document.getElementById("searchInput");
let valueInput = null;
let img = document.getElementById("imgMovie");
let searchMoviesDiv = document.getElementById("showMovies");
let infoTextMovie = document.getElementById("info");
let resturnTextMovies = document.getElementById("movieInfos");

/*const response = () => {
  let api = `http://www.omdbapi.com/?s=${valueInput}&apikey=${apikey}`;
  fetch(api)
    .then((response) => response.json())
    .then((data) => {
      let image = document.createElement("img");
      image.setAttribute("src", ``);
    });
};*/

const clickContainer = () => {
  document.addEventListener("click", (evt) => {
    let target = evt.target.className;
    let idTarget = evt.target.id;

    let view = document.getElementById("showContent");

    if (
      target != "infoMovies" ||
      target != "nameMoviePoster" ||
      target != "posterImage" ||
      idTarget != "searchInput"
    ) {
      input.value = "";
      view.style.display = "none";
    }
  });
};

const hiddenList = (response) => {
  let listMovies = document.getElementById("showContent");

  let trueResponse = response.Response;

  if (trueResponse === "True") {
    listMovies.style.display = "flex";
  } else {
    listMovies.style.display = "none";
  }
  clickContainer();
};

const onloadMovie = (movieName, display) => {
  let api = `http://www.omdbapi.com/?${movieName}&apikey=${apikey}`;
  fetch(api)
    .then((response) => response.json())
    .then((data) => {
      img.innerHTML = "";
      resturnTextMovies.innerHTML = "";
      let image = document.createElement("img");
      let divStars = document.createElement("div");
      let divRating = document.createElement("div");
      let divShowMoviesSeries = document.createElement("div");
      divShowMoviesSeries.setAttribute("class", "showContentContainer");
      divShowMoviesSeries.setAttribute("id", "showContent");
      divShowMoviesSeries.style.display = display;
      let paragraphRating = document.createElement("p");
      divRating.setAttribute("class", "ratingContainer");
      divStars.setAttribute("class", "starsContent");
      let icon1 = document.createElement("i");
      let icon2 = document.createElement("i");
      let icon3 = document.createElement("i");
      let divTitle = document.createElement("div");
      let pTitle = document.createElement("p");
      let pYear = document.createElement("p");
      let divGenre = document.createElement("div");
      let plotDiv = document.createElement("div");
      let pPlot = document.createElement("p");
      let starsDiv = document.createElement("div");
      let pStars = document.createElement("p");
      let runTime = document.createElement("div");
      let pRuntime = document.createElement("p");
      let pType = document.createElement("p");
      let pRated = document.createElement("p");
      let writer = document.createElement("div");
      let pWriter = document.createElement("p");
      let director = document.createElement("div");
      let pDirector = document.createElement("p");

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
      pTitle.append(data.Title);
      pTitle.style.fontSize = "30px";
      let yearMovie = `(${data.Year})`;
      pYear.append(yearMovie);
      divTitle.append(pTitle);
      divTitle.append(pYear);
      pYear.setAttribute("class", "marginLeft");
      divTitle.setAttribute("class", "yearTitle");
      let genres = data.Genre;
      let splitGenres = genres.split(",");
      resturnTextMovies.append(divTitle);
      splitGenres.map((element) => {
        let eachDiv = document.createElement("div");
        let pGenre = document.createElement("p");
        eachDiv.setAttribute("class", "widhtGenre");
        divGenre.setAttribute("class", "rowContainer");
        pGenre.append(element);
        eachDiv.append(pGenre);
        divGenre.append(eachDiv);
        resturnTextMovies.append(divGenre);
      });
      pPlot.append(data.Plot);
      pPlot.setAttribute("class", "alightStart");
      plotDiv.append(pPlot);
      plotDiv.setAttribute("class", "marginTop");
      pStars.append(`Stars: ${data.Actors}`);
      pStars.setAttribute("class", "marginTop");
      pStars.style.textAlign = "start";

      starsDiv.append(pStars);
      starsDiv.style.width = "100%";
      pType.append(data.Type);
      pRated.append(data.Rated);
      pRuntime.append(data.Runtime);
      pType.setAttribute("class", "infoParagraph");
      pRated.setAttribute("class", "infoParagraph");
      pRuntime.setAttribute("class", "infoParagraph");
      runTime.append(pType, pRuntime, pRated);
      runTime.setAttribute("class", "infosTime");
      let nameWriter = `Writer: ${data.Writer}`;
      pWriter.append(nameWriter);
      writer.append(pWriter);
      writer.style.display = "flex";
      let nameDirector = `Director: ${data.Director}`;
      pWriter.setAttribute("class", "alightStart");
      pWriter.style.marginTop = "10px";
      writer.style.width = "100%";
      pDirector.setAttribute("class", "alightStart");
      pDirector.style.marginTop = "10px";
      pDirector.append(nameDirector);
      director.append(pDirector);
      director.style.display = "flex";
      director.style.width = "100%";
      resturnTextMovies.append(plotDiv, runTime, starsDiv, writer, director);
    });
};

const loadListMovies = () => {
  let endpoint = `http://www.omdbapi.com/?s=${valueInput}&apikey=${apikey}`;
  fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      hiddenList(data);
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
          }
        }
      } catch (error) {
        return error;
      }

      const showThem = [...document.querySelectorAll(".infoMovies")];
      const loadList = () => {
        showThem.map((el) => {
          el.addEventListener("click", (evt) => {
            let child = null;
            if (evt.target.id == "") {
              child = evt.target.parentNode.id;
              onloadMovie(`i=${child}`);
            } else {
              child = evt.target.id;
              onloadMovie(`i=${child}`, "flex");
            }
          });
        });
      };
      loadList();
    });
};

document.addEventListener(
  "load",
  input.focus(),
  onloadMovie("t=guardians of the galaxy vol.3")
);

const keyDownMovie = () => {
  document.addEventListener("keyup", () => {
    valueInput = input.value;
    loadListMovies();
  });
};
keyDownMovie();
