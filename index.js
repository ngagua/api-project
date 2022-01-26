import { getFlag, getMovie, getCountry } from "./apicalls.js";
const renderHtmlMovies = (title, actors, year) => {
  const html =
    ` <div class="movie">
          <li class="movie-title">Movie Title: ${title}</li>          
          <li class="release-year">${year} years ago was this movie released</li>
            <li class="movie-actors">actors: ${actors}</li>
                
                </div> `
  injectPlacemovie.innerHTML = "";
  injectPlacemovie.insertAdjacentHTML("beforeend", html);
}
const renderHtmlcountries = (countryname, currency, flag) => {



  const html =
    `            <div  class=countries>
                    <li class="country">Country: ${countryname}</li>
                    <li class="currency">Currency: ${currency}</li>  
                    <img src="${flag}" alt="" class="flag">

                </div> `

  injectPlaceforcountry.insertAdjacentHTML("beforeend", html);
}

function convertToNames(actorNames) {
  const actors = actorNames.split(' ');
  const filtered = actors.filter(function (el, index) {
    return index % 2 === 0;
  });
  const actorsString = filtered.toString()

  return actorsString;
}

function releasedYear(movie) {
  const currentYear = 2022;
  const filmYear = movie.Year;
  let yearsAgo;
  if (currentYear - filmYear >= 1) {
    yearsAgo = currentYear - filmYear;
  } else {
    yearsAgo = "Few month ";
  }
  return yearsAgo;
};


const injectPlaceforcountry = document.querySelector(".country-info");
const injectPlacemovie = document.querySelector(".movie-info");
const search = document.querySelector(".search-button");

search.addEventListener('click', (event) => {
  injectPlaceforcountry.innerHTML = "";
  injectPlacemovie.innerHTML = "";
  moviesData(event);
});


async function moviesData(event) {
  event.preventDefault();
  const contentInput = document.querySelector(".movie-input");
  const movie = await getMovie(contentInput.value);

  if (movie.Response == "False") {
    injectPlaceforcountry.innerText = "Movie not found!";
    return;
  }

  const title = movie.Title
  const actors = convertToNames(movie.Actors);
  const year = releasedYear(movie);


  renderHtmlMovies(title, actors, year);


  const countryarray = movie.Country.split(", ");
  await generateCountryData(countryarray);
}

async function generateCountryData(countriesName) {
  for (let country of countriesName) {
    const countryName = await getCountry(country);
    const currencies = Object.keys(countryName[0].currencies)[0];
    const flagName = countryName[0].altSpellings[0];
    const flags = getFlag(flagName).toLowerCase();
    renderHtmlcountries(country, currencies, flags);

  }
}










