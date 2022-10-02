"use stric";
//import icons from "url:../../img/svg/capAmerica.svg";

// definir 25 en variable para si se decide cambiar el limite de las cards sea mas escalable y tambien usar los selectores en variables
/*Codigo para consumir API junto con los metodos manejadores de las promesas obtenidas
este es el primer paso para construir una web dinamica

primer paso: obtener datos y formatearlos como objeto

/////////////////////////////////////////////////////////
*/

const frameData = document.querySelector(".character");
const pagination = document.querySelector(".pagination");
const buttonForward = document.querySelector(".button-forward");
const buttonBack = document.querySelector(".button-back");
const spinner = document.getElementsByClassName("spinner");
let postElements = document.getElementsByClassName("post");
let limitRanged;
let count = 0;
let markup;
let res;
let characters;
let offset = 1;
let page = 1;
const cardsLimit = 25;
/*
if (window.localStorage.length < 3) {
  characters = 36; //uso solo para test en ultima pagina
}
*/
const getLocalStorageCharacters = function () {
  characters = JSON.parse(localStorage.getItem(`count`));
};

const getLocalStoragePages = function () {
  let pages = JSON.parse(localStorage.getItem(`pagination`));
  offset = pages.offset;
  page = pages.page;
  getLocalStorageCharacters();
};

/* funcion encargada de pintar la precarga (View) */
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

//console.log(window.localStorage.length);
if (window.localStorage.length > 2) {
  getLocalStoragePages();
} else {
  offset = 1; //recordar volver a poner en 1(valor de prueba ultima pagina 1526)
  page = 1;
}

/* 
Llamada inicial del API de aca se obtiene el total de personajes 
y el limite del ciclo encargado de mostrar las cards random del home
(Model)
*/
if (characters < cardsLimit) {
  res = await fetch(
    `https://gateway.marvel.com:443/v1/public/characters?limit=${characters}&offset=${offset}&ts=1&apikey=b9d822d427ddad8905c9e71d7f83b60f&hash=670d244bbd5442995de438e9125bfd80`
  );
} else {
  res = await fetch(
    `https://gateway.marvel.com:443/v1/public/characters?limit=${cardsLimit}&offset=${offset}&ts=1&apikey=b9d822d427ddad8905c9e71d7f83b60f&hash=670d244bbd5442995de438e9125bfd80`
  );
}

buttonForward.addEventListener("click", async function () {
  offset = offset + 25;
  page++;
  if (characters >= cardsLimit) {
    for (let j = 24; j >= 0; j--) {
      frameData.removeChild(postElements[j]);
      //console.log(postElements[j], j);
    }
    res = await fetch(
      `https://gateway.marvel.com:443/v1/public/characters?limit=${cardsLimit}&offset=${offset}&ts=1&apikey=b9d822d427ddad8905c9e71d7f83b60f&hash=670d244bbd5442995de438e9125bfd80`
    );
    controllerMarvelCharacter(res);
  } else {
    console.log("entre else");
    console.log(characters);
    for (let j = characters; j >= 0; j--) {
      frameData.removeChild(postElements[j]);
    }
    res = await fetch(
      `https://gateway.marvel.com:443/v1/public/characters?limit=${characters}&offset=${offset}&ts=1&apikey=b9d822d427ddad8905c9e71d7f83b60f&hash=670d244bbd5442995de438e9125bfd80`
    );
    controllerMarvelCharacter(res);
  }
  characters -= 25;
  localStorage.setItem("count", JSON.stringify(characters));

  pagination.removeChild(document.querySelector(".page"));

  count = offset;

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
  if (characters >= cardsLimit) {
    for (let j = 24; j >= 0; j--) {
      frameData.removeChild(postElements[j]);
    }
    res = await fetch(
      `https://gateway.marvel.com:443/v1/public/characters?limit=${cardsLimit}&offset=${offset}&ts=1&apikey=b9d822d427ddad8905c9e71d7f83b60f&hash=670d244bbd5442995de438e9125bfd80`
    );
    controllerMarvelCharacter(res);
  } else {
    for (let j = characters - 1; j >= 0; j--) {
      frameData.removeChild(postElements[j]);
      console.log(postElements[j], j);
    }

    res = await fetch(
      `https://gateway.marvel.com:443/v1/public/characters?limit=${characters}&offset=${offset}&ts=1&apikey=b9d822d427ddad8905c9e71d7f83b60f&hash=670d244bbd5442995de438e9125bfd80`
    );
    controllerMarvelCharacter(res);
  }
  characters += 25;

  localStorage.setItem("count", JSON.stringify(characters));

  pagination.removeChild(document.querySelector(".page"));

  count = offset;

  localStorage.setItem(
    "pagination",
    JSON.stringify({
      page: page,
      offset: offset,
    })
  );
});

const numberPage = function (page) {
  let currentPage = `
  <div class="page">
    <p>${page}</p>
  </div>
  `;

  return pagination.insertAdjacentHTML("beforeend", currentPage);
};

/* funcion encargada de pintar los personajes en el DOM (View) */
const printCharacter = function (character) {
  let contentHTML = "";
  contentHTML = `
 
  <a href="details.html" class="post ${character.id}" 
      <figure class="post-image">
        <img class="cards-home" src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="marvel-character-image">
      </figure>
      <p class="title-card">${character.name}</p>
    
   </a> `;

  frameData.insertAdjacentHTML("afterbegin", contentHTML);

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
  /* es el event listener encargado de detectar el click del usuario en las cards */
  frameData.removeChild(spinner[0]);
};

/* controlador principal de la app */
const controllerMarvelCharacter = async function (res) {
  numberPage(page); //numero de la pagina actual

  try {
    let data = await res.json();

    if (characters === undefined) {
      characters = data.data.total;
    }

    limitRanged = data.data.limit;

    //codigo que oculta el boton de atras en la pagina 1
    if (offset === 1) {
      buttonBack.style.display = "none";
    } else {
      document.querySelector(".page");
      buttonBack.style.display = "block";
    }
    console.log(characters);
    console.log(offset);

    //codigo para ocultar el boton avanzar en la ultima pagina
    if (characters < cardsLimit) {
      buttonForward.style.display = "none";
    } else {
      document.querySelector(".page");
      buttonForward.style.display = "block";
    }

    if (characters <= cardsLimit) {
      limitRanged = characters;
    }
    console.log(limitRanged);

    /*codigo encargado de pintar la precarga en las cards*/
    for (let k = 0; k < limitRanged; k++) {
      renderSpinner();
    }

    for (let i = limitRanged - 1; i >= 0; i--) {
      let character = data.data.results[i];

      printCharacter(character);
    }

    if (!res.ok) throw new Error(`conection API error status${res.status}`);
  } catch (err) {
    alert(`${err} please contact the administrator or try later...`);
  }
};

controllerMarvelCharacter(res);
console.log("online1");
