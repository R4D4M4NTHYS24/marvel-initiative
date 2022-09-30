"use stric";
//import icons from "url:../../img/svg/capAmerica.svg";

/*Codigo para consumir API junto con los metodos manejadores de las promesas obtenidas
este es el primer paso para construir una web dinamica

primer paso: obtener datos y formatearlos como objeto

/////////////////////////////////////////////////////////
*/
//localhost/character/${character.id}
//let characterA = document.querySelector(".post-list");

const frameData = document.querySelector(".character");
const buttonForward = document.querySelector(".button-forward");
const buttonBack = document.querySelector(".button-back");
const spinner = document.getElementsByClassName("spinner");
let postElements = document.getElementsByClassName("post");
let cardsRandom;
let limitRanged;
let count = 0;
let markup;
let offset = 1526; //bug en 1551
let res;
let characters;
/* 
Llamada inicial del API de aca se obtiene el total de personajes 
y el limite del ciclo encargado de mostrar las cards random del home
(Model)
*/
res = await fetch(
  `https://gateway.marvel.com:443/v1/public/characters?limit=25&offset=${offset}&ts=1&apikey=b9d822d427ddad8905c9e71d7f83b60f&hash=670d244bbd5442995de438e9125bfd80`
);

buttonForward.addEventListener("click", async function () {
  console.log("adelante");
  console.log(characters);
  for (let j = 24; j >= 0; j--) {
    frameData.removeChild(postElements[j]);
    console.log(postElements[j], j);
  }

  offset = offset + 25;
  count = offset;
  console.log(count);

  res = await fetch(
    `https://gateway.marvel.com:443/v1/public/characters?limit=25&offset=${offset}&ts=1&apikey=b9d822d427ddad8905c9e71d7f83b60f&hash=670d244bbd5442995de438e9125bfd80`
  );
  controllerMarvelCharacter();
});

buttonBack.addEventListener("click", async function () {
  console.log("atras");
  for (let j = 24; j >= 0; j--) {
    frameData.removeChild(postElements[j]);
    console.log(postElements[j], j);
  }

  offset = offset - 25;
  count = offset;
  console.log(count);

  res = await fetch(
    `https://gateway.marvel.com:443/v1/public/characters?limit=25&offset=${offset}&ts=1&apikey=b9d822d427ddad8905c9e71d7f83b60f&hash=670d244bbd5442995de438e9125bfd80`
  );
  controllerMarvelCharacter();
});

/* funcion encargada de pintar los personajes en el DOM (View) */

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
/*
const removeRenderSpinner = function (markup) {
  frameData.clear();
};
*/
const printCharacter = function (character) {
  let contentHTML = "";
  contentHTML = `
 
  <a href="details.html" class="post ${character.id}" 
      <figure class="post-image">
        <img class="cards-home" src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="marvel-character-image">
      </figure>
      <p class="title-card">${character.name}</p>
    
   </a> `;

  //frameData.nodeName.removeChild(frameData2);
  frameData.insertAdjacentHTML("afterbegin", contentHTML);
  //removeRenderSpinner(spinner);

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
  });
  /* es el event listener encargado de detectar el click del usuario (controller) */
  frameData.removeChild(spinner[0]);
};

/* controlador principal de la app */
const controllerMarvelCharacter = async function () {
  try {
    let data = await res.json();

    characters = data.data.total;
    limitRanged = data.data.limit;

    const allCharacters = data.data.results;

    for (let k = 0; k < limitRanged; k++) {
      renderSpinner();
    }

    for (let i = limitRanged - 1; i >= 0; i--) {
      let character = data.data.results[i];
      printCharacter(character);
    }

    //console.log(data.data.results);

    //const randomPositions = [];

    //console.log(postElements);

    if (!res.ok) throw new Error(`conection API error status${res.status}`);
  } catch (err) {
    alert(`${err} please contact the administrator or try later...`);
  }
};

controllerMarvelCharacter(res);
console.log("online1");

//const valores = window.location.search;
