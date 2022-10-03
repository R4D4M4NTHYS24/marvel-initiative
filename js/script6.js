"use stric";
//import icons from "url:../../img/svg/capAmerica.svg";

/*Codigo para consumir API junto con los metodos manejadores de las promesas obtenidas
este es el primer paso para construir una web dinamica

primer paso: obtener datos y formatearlos como objeto

/////////////////////////////////////////////////////////
*/
/* selectores */
const frameData = document.querySelector(".random");
const spinner = document.getElementsByClassName("spinner");
let postElements = document.getElementsByClassName("post");

/* variables */
let cardsRandom;
let limitRanged;
let count;
let markup;
let totalPages;
/* 
Llamada inicial del API de aca se obtiene el total de personajes 
y el limite del ciclo encargado de mostrar las cards random del home
(Model)
*/

const res = await fetch(
  `https://gateway.marvel.com:443/v1/public/characters?limit=3&offset=${1}&ts=1&apikey=b9d822d427ddad8905c9e71d7f83b60f&hash=670d244bbd5442995de438e9125bfd80`
);

const renderSpinner = function () {
  markup = `
  <div class="spinner">
    <svg>
    <img src="/img/svg/portalStrange.svg" class="icons-home" alt="cap-shield"">
    </svg>
  </div>
  `;

  return frameData.insertAdjacentHTML("afterbegin", markup);
};

/* funcion encargada de pintar los personajes en el DOM (View) */
const printCharacter = function (character) {
  let offset = 1;
  let page = 1;
  let contentHTML = "";
  contentHTML = `
 
  <a href="details.html" class="post ${character.id}" 
      <figure class="post-image">
        <img class="cards-home" src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="marvel-character-image">
      </figure>
      <p class="title-card">${character.name}</p>
    
   </a> `;

  frameData.insertAdjacentHTML("afterbegin", contentHTML);

  /* es el event listener encargado de detectar el click del usuario */
  postElements[0].addEventListener("click", function () {
    localStorage.setItem(
      "selected",
      JSON.stringify({
        id: character.id,
        name: character.name,
        thumbnail: character.thumbnail.path,
        description: character.description,
        extension: character.thumbnail.extension,
      })
    );
    localStorage.setItem(
      "pagination",
      JSON.stringify({
        page: page,
        offset: offset,
      })
    );
    localStorage.setItem("count", JSON.stringify(count));
  });

  frameData.removeChild(spinner[0]);
};

/* controlador principal de la app */
const controllerMarvelCharacter = async function () {
  try {
    let data = await res.json();

    const characters = data.data.total;
    limitRanged = data.data.limit;

    count = data.data.total;

    for (let k = 0; k < limitRanged; k++) {
      renderSpinner();
    }

    const randomPositions = [];

    for (let i = 0; i < limitRanged; i++) {
      const randomPosition = Math.floor(Math.random() * characters + 1) - 1;
      randomPositions.push(randomPosition);
    }

    console.log("1");
    await charactersPromiseAll(randomPositions);
    console.log("3");

    if (!res.ok) throw new Error(`conection API error status${res.status}`);
  } catch (err) {
    alert(`${err} please contact the administrator or try later...`);
  }
};

/* (controller) */
async function charactersPromiseAll(positions) {
  const promises = buildApiCall(positions);
  const responses = await Promise.all(promises);

  responses.forEach(async (res) => {
    const data = await res.json();
    const character = data.data.results[0];

    printCharacter(character);
  });
  console.log("2");
  return responses;
}

/* (model) */
function buildApiCall(positions) {
  const promises = [];
  for (let i = 0; i < positions.length; i++) {
    promises.push(
      fetch(
        `https://gateway.marvel.com:443/v1/public/characters?limit=1&offset=${positions[i]}&ts=1&apikey=b9d822d427ddad8905c9e71d7f83b60f&hash=670d244bbd5442995de438e9125bfd80`
      )
    );
  }

  return promises;
}

controllerMarvelCharacter(res);
console.log("online1");
