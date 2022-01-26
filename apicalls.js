export function getMovie(title) {
    return fetch(`http://www.omdbapi.com/?t=${title}&apikey=3d7cf028`)
        .then((movies) => movies.json());
}
export function getCountry(code) {
    return fetch(`https://restcountries.com/v3.1/name/${code}?fullText=true`)
        .then((countries) => countries.json());
}
export function getFlag(country) {
    return `https://flagpedia.net/data/flags/icon/36x27/${country}.png`;
}


