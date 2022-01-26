import { getMovie, getCountry } from "./apicalls.js";
const renderHtmlpopulation = (population, Runtime) => {



    const html =
        `            <div  class=population>
                      <li class="country">Population: ${population}</li>
                      <li class="currency">Total minutes: ${Runtime}</li>  
                     
                  </div> `

    injectPlace.insertAdjacentHTML("beforeend", html);
}

const injectPlace = document.querySelector(".population-content");
const searchbutton = document.querySelector(".search-button2");

searchbutton.addEventListener('click', (event) => {
    injectPlace.innerHTML = "";

    moviesData2(event);
});


async function moviesData2(event) {
    event.preventDefault();
    const movieinput1 = document.querySelector(".movie-input1");
    const movieinput2 = document.querySelector(".movie-input2");
    const movieinput3 = document.querySelector(".movie-input3");


    const movie1 = await getMovie(movieinput1.value);
    const movie2 = await getMovie(movieinput2.value);
    const movie3 = await getMovie(movieinput3.value);

    let responses = [movie1.Response, movie2.Response, movie3.Response];



    const chekedresponses = responses.includes("True");


    if (chekedresponses == false) {
        injectPlace.innerText = "Movie not found!";
        return;
    }



    const splitedCountryArray = sumOfpopulation(movie1, movie2, movie3);


    const moviesRuntime = minutesSumfunction(movie1, movie2, movie3)


    const population = await generatepopulationData(splitedCountryArray);
    renderHtmlpopulation(population, moviesRuntime);
}




async function generatepopulationData(countriesName) {
    let population = 0;
    for (let country of countriesName) {
        const countryName = await getCountry(country);
        population += countryName[0].population;

    }
    return population;
}


function minutesSumfunction(movie1, movie2, movie3) {
    const movieInputArray = [parseInt(movie1.Runtime), parseInt(movie2.Runtime), parseInt(movie3.Runtime)];
    const filteredMovieInputArray = movieInputArray.filter(function (elem) {
        return !isNaN(elem);
    });
    const minutesSum = filteredMovieInputArray.reduce((x, y) => x + y);
    return minutesSum;

}

function sumOfpopulation(movie1, movie2, movie3) {
    const movieCountryArray = [movie1.Country, movie2.Country, movie3.Country];
    const filteredArray = movieCountryArray.filter(function (elem) {
        return elem !== undefined;
    });
    const newarr = new Set();

    filteredArray.forEach(x => {
        const y = x.split(", ")
            .forEach(x => { newarr.add(x) });
    });
    return Array.from(newarr);
}