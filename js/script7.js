"use stric";
//import icons from "url:../../img/svg/capAmerica.svg";

/*******************  Definicion de variables ***********************************/

const frameData = document.querySelector(".character");
const pagination = document.querySelector(".pagination");
const buttonForward = document.querySelector(".button-forward");
const buttonBack = document.querySelector(".button-back");
const spinner = document.getElementsByClassName("spinner");
const postElements = document.getElementsByClassName("post");
let limitRanged;
let count = 0;
let res;
let characters;
let offset = 1;
let page = 1;
let totalPages;
let totalPagesNumber;
let lastPage = 0;
const cardsLimit = 25;

/*
if (window.localStorage.length < 3) {
  characters = 37; //uso solo para test en ultima pagina
}
*/
/*******************  Definicion de funciones ***********************************/

const getLocalStoragePages = function () {
  let pages = JSON.parse(localStorage.getItem(`pagination`));
  offset = pages.offset;
  page = pages.page;
};

/* funcion encargada de pintar la precarga (View) */
const renderSpinner = function () {
  const markup = `
  <div class="spinner">
    <svg>
    <img src="/img/svg/portalStrange.svg" class="icons-home" alt="cap-shield"">
    </svg>
  </div>
  `;

  return frameData.insertAdjacentHTML("afterbegin", markup);
};

const numberPage = function (page) {
  let currentPage = `
  <div class="page">
    <p>${page} of ${totalPagesNumber}</p>
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

  /* es el event listener encargado de detectar el click del usuario en las cards */
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

  frameData.removeChild(spinner[0]);
};

/*************************flujo principal de la aplicacion ****************************/

//console.log(window.localStorage.length);
if (window.localStorage.length > 2) {
  characters = JSON.parse(localStorage.getItem(`count`));
  getLocalStoragePages();
} else {
  offset = 1; //recordar volver a poner en 1(valor de prueba ultima pagina 1526)
  page = 1;
}

/*
Codigo para consumir API junto con los metodos manejadores de las promesas obtenidas
este es el primer paso para construir una web dinamica

primer paso: obtener datos y formatearlos como objeto

/////////////////////////////////////////////////////////
*/

if (characters < cardsLimit) {
  //characters--;
  console.log(characters);
  res = await fetch(
    `https://gateway.marvel.com:443/v1/public/characters?limit=${
      characters - 1
    }&offset=${offset}&ts=1&apikey=b9d822d427ddad8905c9e71d7f83b60f&hash=670d244bbd5442995de438e9125bfd80`
  );
} else {
  res = await fetch(
    `https://gateway.marvel.com:443/v1/public/characters?limit=${cardsLimit}&offset=${offset}&ts=1&apikey=b9d822d427ddad8905c9e71d7f83b60f&hash=670d244bbd5442995de438e9125bfd80`
  );
}

/***************** listener encargado del boton de avanzar de la paginacion ******************************/
buttonForward.addEventListener("click", async function () {
  console.log("btn");
  offset = offset + 25;
  page++;

  characters -= 25;
  console.log(characters);
  localStorage.setItem("count", JSON.stringify(characters));

  if (characters - 1 >= cardsLimit) {
    console.log("entre al 25");
    for (let j = cardsLimit - 1; j >= 0; j--) {
      frameData.removeChild(postElements[j]);
    }
    res = await fetch(
      `https://gateway.marvel.com:443/v1/public/characters?limit=${cardsLimit}&offset=${offset}&ts=1&apikey=b9d822d427ddad8905c9e71d7f83b60f&hash=670d244bbd5442995de438e9125bfd80`
    );
    controllerMarvelCharacter(res);
  } else {
    console.log("entre forward");

    for (let j = cardsLimit - 1; j >= 0; j--) {
      frameData.removeChild(postElements[j]);
    }

    res = await fetch(
      `https://gateway.marvel.com:443/v1/public/characters?limit=${
        characters - 1
      }&offset=${offset}&ts=1&apikey=b9d822d427ddad8905c9e71d7f83b60f&hash=670d244bbd5442995de438e9125bfd80`
    );
    controllerMarvelCharacter(res);
  }

  //console.log(characters);

  pagination.removeChild(document.querySelector(".page"));

  count = characters;

  localStorage.setItem(
    "pagination",
    JSON.stringify({
      page: page,
      offset: offset,
      totalPagesNumber: totalPagesNumber,
    })
  );
});

/***************** listener encargado del boton de retroceder de la paginacion ******************************/
buttonBack.addEventListener("click", async function () {
  offset = offset - 25;
  page--;

  characters += 25;

  localStorage.setItem("count", JSON.stringify(characters));

  if (lastPage > 0) {
    characters = lastPage;
    localStorage.setItem("count", JSON.stringify(characters));
    lastPage = 0;
  }

  if (characters >= cardsLimit) {
    for (let j = cardsLimit - 1; j >= 0; j--) {
      frameData.removeChild(postElements[j]);
    }
    res = await fetch(
      `https://gateway.marvel.com:443/v1/public/characters?limit=${cardsLimit}&offset=${offset}&ts=1&apikey=b9d822d427ddad8905c9e71d7f83b60f&hash=670d244bbd5442995de438e9125bfd80`
    );
    controllerMarvelCharacter(res);
  } else {
    console.log("al else");

    for (let j = characters - 1; j >= 0; j--) {
      frameData.removeChild(postElements[j]);
      console.log(postElements[j], j);
    }
    console.log(characters);
    characters = characters + cardsLimit + 1;
    console.log(characters);
    localStorage.setItem("count", JSON.stringify(characters));
    res = await fetch(
      `https://gateway.marvel.com:443/v1/public/characters?limit=${cardsLimit}&offset=${offset}&ts=1&apikey=b9d822d427ddad8905c9e71d7f83b60f&hash=670d244bbd5442995de438e9125bfd80`
    );
    controllerMarvelCharacter(res);
  }

  pagination.removeChild(document.querySelector(".page"));

  count = characters;

  localStorage.setItem(
    "pagination",
    JSON.stringify({
      page: page,
      offset: offset,
      totalPagesNumber: totalPagesNumber,
    })
  );
});

/* controlador principal de la app */
const controllerMarvelCharacter = async function (res) {
  try {
    let data = await res.json();

    if (characters === undefined) {
      characters = data.data.total;
    }

    if (totalPages === undefined) {
      console.log("entre totalPages");
      totalPages = data.data.total;
      totalPagesNumber = Math.ceil(totalPages / cardsLimit);
    }

    /*totalPages = characters; linea para test en ultima pagina */

    numberPage(page); //numero de la pagina actual
    limitRanged = data.data.limit;

    //codigo que oculta el boton de atras en la pagina 1
    if (offset === 1) {
      buttonBack.style.display = "none";
    } else {
      document.querySelector(".page");
      buttonBack.style.display = "block";
    }

    console.log(offset);

    //codigo para ocultar el boton avanzar en la ultima pagina
    if (characters < cardsLimit) {
      buttonForward.style.display = "none";
    } else {
      document.querySelector(".page");
      buttonForward.style.display = "block";
    }

    if (characters < cardsLimit) {
      limitRanged = characters - 1;
      console.log("265", characters);
      lastPage = limitRanged;
    } else {
      limitRanged = cardsLimit;
      console.log("265 else", cardsLimit);
    }
    console.log(characters);

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
