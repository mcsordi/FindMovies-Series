import { apikey } from "./key.js";
let input = document.getElementById("searchInput");
let valueInput = null;
let img = document.getElementById("imgMovie");
let searchMoviesDiv = document.getElementById("showMovies");
let returnTextMovie = document.getElementById("movieInfos");

const clickContainer = () => {
  document.addEventListener("click", (evt) => {
    let idTarget = evt.target.id;

    let view = document.getElementById("showContent");
    view.style.display = "flex";

    if (idTarget == "searchInput") {
      view.style.display = "flex";
    } else {
      input.value = "";
      valueInput = "";

      view.style.display = "none";
    }
  });
};

const hiddenList = (response) => {
  let listMovies = document.getElementById("showContent");
  let ShowimageNotFound = document.getElementById("imgMovie");
  let hideInfos = document.getElementById("movieInfos");

  let trueResponse = response.Response;

  if (trueResponse === "True") {
    listMovies.style.display = "flex";
  } else if (trueResponse === "False") {
    listMovies.style.display = "none";
  }
  clickContainer();
};
/*hideInfos.style.display = "flex";
    ShowimageNotFound.style.width = "40%";*/

/*ShowimageNotFound.innerHTML = `<div><img src="./src/png/popcorn.png"/></div>`;
    ShowimageNotFound.style.width = "100%";
    hideInfos.style.display = "none";*/
const onloadMovie = (movieName) => {
  let api = `http://www.omdbapi.com/?${movieName}&apikey=${apikey}`;
  fetch(api)
    .then((response) => response.json())
    .then((data) => {
      img.innerHTML = "";
      returnTextMovie.innerHTML = "";
      let image = document.createElement("img");
      let divStars = document.createElement("div");
      let divRating = document.createElement("div");
      let showMovies = document.getElementById("showContent");

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
      searchMoviesDiv.append(showMovies);
      divStars.appendChild(icon1);
      divStars.appendChild(icon2);
      divStars.appendChild(icon3);
      img.appendChild(divStars);
      if (data.imdbRating != "N/A") {
        paragraphRating.append(data.imdbRating);
        divRating.appendChild(paragraphRating);
        img.appendChild(divRating);
      }
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
      returnTextMovie.append(divTitle);
      splitGenres.map((element) => {
        let eachDiv = document.createElement("div");
        let pGenre = document.createElement("p");
        eachDiv.setAttribute("class", "widhtGenre");
        divGenre.setAttribute("class", "rowContainer");
        pGenre.append(element);
        eachDiv.append(pGenre);
        divGenre.append(eachDiv);
        returnTextMovie.append(divGenre);
      });
      if (data.Plot != "N/A") {
        pPlot.append(data.Plot);
        pPlot.setAttribute("class", "alightStart");
        plotDiv.append(pPlot);
        plotDiv.setAttribute("class", "marginTop");
        returnTextMovie.append(plotDiv);
      }
      pStars.append(`Stars: ${data.Actors}`);
      pStars.setAttribute("class", "marginTop");
      pStars.style.textAlign = "start";

      starsDiv.append(pStars);
      starsDiv.style.width = "100%";
      if (data.Type != "N/A") {
        pType.setAttribute("class", "infoParagraph");
        pType.append(data.Type);
      }

      if (data.Rated != "N/A") {
        pRated.setAttribute("class", "infoParagraph");
        pRated.append(data.Rated);
      }

      if (data.Runtime != "N/A") {
        pRuntime.append(data.Runtime);
        pRuntime.setAttribute("class", "infoParagraph");
      }

      runTime.append(pType, pRuntime, pRated);
      runTime.setAttribute("class", "infosTime");
      let nameWriter = `Writer: ${data.Writer}`;

      writer.style.display = "flex";
      let nameDirector = `Director: ${data.Director}`;
      pWriter.setAttribute("class", "alightStart");
      pWriter.style.marginTop = "10px";
      writer.style.width = "100%";
      pDirector.setAttribute("class", "alightStart");
      pDirector.style.marginTop = "10px";
      director.style.display = "flex";
      director.style.width = "100%";
      returnTextMovie.append(runTime, starsDiv);
      if (nameWriter != `Writer: N/A`) {
        pWriter.append(nameWriter);
        writer.append(pWriter);
        returnTextMovie.append(writer);
      }
      if (nameDirector != `Director: N/A`) {
        pDirector.append(nameDirector);
        director.append(pDirector);
        returnTextMovie.append(director);
      }
    });
};

const loadListMovies = (value) => {
  let endpoint = `http://www.omdbapi.com/?s=${value}&apikey=${apikey}`;
  fetch(endpoint)
    .then((response) => response.json())

    .then((data) => {
      hiddenList(data);

      let contentPostWrite = document.getElementById("showContent");
      contentPostWrite.innerHTML = "";
      try {
        let searchContent = data.Search;

        searchContent.map((el) => {
          let poster = el.Poster;

          if (poster === "N/A") {
            return poster != "N/A";
          }
          if (poster !== `N/A`) {
            let divPosterMovies = document.createElement("div");
            let nameMovie = document.createElement("p");
            nameMovie.setAttribute("class", "nameMoviePoster");
            divPosterMovies.setAttribute("class", "infoMovies");
            divPosterMovies.setAttribute("id", `${el.imdbID}`);

            let posterFilm = document.createElement("img");
            posterFilm.setAttribute("src", `${el.Poster}`);
            posterFilm.setAttribute("class", "posterImage");
            divPosterMovies.append(posterFilm);

            nameMovie.append(`${el.Title}`);
            divPosterMovies.append(nameMovie);
            contentPostWrite.append(divPosterMovies);
          } else {
            contentPostWrite.style.display = "none";
          }
        });

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

                onloadMovie(`i=${child}`);
              }
            });
          });
        };
        loadList();
      } catch (error) {
        return;
      }
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
    loadListMovies(valueInput);
  });
};
keyDownMovie();
