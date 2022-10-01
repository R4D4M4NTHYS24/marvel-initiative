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
const pagination = document.querySelector(".pagination");
const buttonForward = document.querySelector(".button-forward");
const buttonBack = document.querySelector(".button-back");
const spinner = document.getElementsByClassName("spinner");
let postElements = document.getElementsByClassName("post");
let cardsRandom;
let limitRanged;
let count = 0;
let markup;
let res;
let characters;
//characters = 36; uso solo para test en ultima pagina
let offset = 1;
let page = 1;
//let limit = 25;

const getLocalStoragePages = function () {
  let pages = JSON.parse(localStorage.getItem(`pagination`));
  offset = pages.offset;
  page = pages.page;
};

const getLocalStorageCharacters = function () {
  characters = JSON.parse(localStorage.getItem(`count`));
};

console.log(window.localStorage.length);
if (window.localStorage.length > 2) {
  getLocalStoragePages();
} else {
  offset = 1; //recordar volver a poner en 1(valor de prueba ultima pagina 1526)
  page = 1;
  //limit = 25;
}

/* 
Llamada inicial del API de aca se obtiene el total de personajes 
y el limite del ciclo encargado de mostrar las cards random del home
(Model)
*/
if (offset >= 1551) {
  getLocalStorageCharacters();
  res = await fetch(
    `https://gateway.marvel.com:443/v1/public/characters?limit=${characters}&offset=${offset}&ts=1&apikey=b9d822d427ddad8905c9e71d7f83b60f&hash=670d244bbd5442995de438e9125bfd80`
  );
} else {
  res = await fetch(
    `https://gateway.marvel.com:443/v1/public/characters?limit=25&offset=${offset}&ts=1&apikey=b9d822d427ddad8905c9e71d7f83b60f&hash=670d244bbd5442995de438e9125bfd80`
  );
}

buttonForward.addEventListener("click", async function () {
  offset = offset + 25;
  page++;
  if (characters >= 25) {
    for (let j = 24; j >= 0; j--) {
      frameData.removeChild(postElements[j]);
      //console.log(postElements[j], j);
    }
    res = await fetch(
      `https://gateway.marvel.com:443/v1/public/characters?limit=25&offset=${offset}&ts=1&apikey=b9d822d427ddad8905c9e71d7f83b60f&hash=670d244bbd5442995de438e9125bfd80`
    );
    controllerMarvelCharacter();
  } else {
    console.log("entre else");
    console.log(characters);
    for (let j = characters; j >= 0; j--) {
      frameData.removeChild(postElements[j]);
      console.log(postElements[j], j);
    }
    res = await fetch(
      `https://gateway.marvel.com:443/v1/public/characters?limit=${characters}&offset=${offset}&ts=1&apikey=b9d822d427ddad8905c9e71d7f83b60f&hash=670d244bbd5442995de438e9125bfd80`
    );
    controllerMarvelCharacter();
  }
  characters -= 25;
  localStorage.setItem("count", JSON.stringify(characters));
  document
    .querySelector(".pagination")
    .removeChild(document.querySelector(".page"));

  count = offset;

  console.log(page);
  localStorage.setItem(
    "pagination",
    JSON.stringify({
      page: page,
      offset: offset,
    })
  );
});

buttonBack.addEventListener("click", async function () {
  offset = offset - 25;
  page--;
  if (characters >= 25) {
    for (let j = 24; j >= 0; j--) {
      frameData.removeChild(postElements[j]);
      console.log(postElements[j], j);
    }
    res = await fetch(
      `https://gateway.marvel.com:443/v1/public/characters?limit=25&offset=${offset}&ts=1&apikey=b9d822d427ddad8905c9e71d7f83b60f&hash=670d244bbd5442995de438e9125bfd80`
    );
    controllerMarvelCharacter();
  } else {
    console.log("entre atras else");
    console.log(characters);
    for (let j = characters - 1; j >= 0; j--) {
      frameData.removeChild(postElements[j]);
      console.log(postElements[j], j);
    }
    characters += 25;
    res = await fetch(
      `https://gateway.marvel.com:443/v1/public/characters?limit=${characters}&offset=${offset}&ts=1&apikey=b9d822d427ddad8905c9e71d7f83b60f&hash=670d244bbd5442995de438e9125bfd80`
    );
    controllerMarvelCharacter();
  }

  document
    .querySelector(".pagination")
    .removeChild(document.querySelector(".page"));

  count = offset;

  console.log(page);
  localStorage.setItem(
    "pagination",
    JSON.stringify({
      page: page,
      offset: offset,
    })
  );
});

/* funcion encargada de pintar los personajes en el DOM (View) */
const numberPage = function (page) {
  let currentPage = `
  <div class="page">
    <p>${page}</p>
  </div>
  `;

  return pagination.insertAdjacentHTML("beforeend", currentPage);
};

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
  numberPage(page); //numero de la pagina actual
  if (offset === 1) {
    buttonBack.style.display = "none";
  } else {
    document.querySelector(".page");

    buttonBack.style.display = "block";
  } //codigo que oculta el boton de atras en la pagina 1
  console.log(offset);
  if (offset >= 1551) {
    //codigo para ocultar el boton avanzar en la pagina 1551
    buttonForward.style.display = "none";
  } else {
    console.log(document.querySelector(".page"));

    buttonForward.style.display = "block";
  }

  try {
    let data = await res.json();

    if (characters === undefined) {
      characters = data.data.total;
    }

    limitRanged = data.data.limit;

    //const allCharacters = data.data.results;
    //console.log(allCharacters);
    if (characters <= 25) {
      limitRanged = characters;
    }
    console.log(limitRanged);
    for (let k = 0; k < limitRanged; k++) {
      renderSpinner();
    }

    //console.log(characters);
    for (let i = limitRanged - 1; i >= 0; i--) {
      console.log(limitRanged);
      let character = data.data.results[i];
      //

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
