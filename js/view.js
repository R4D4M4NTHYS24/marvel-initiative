"use stric";

export const renderSpinner = function () {
  const frameData = document.querySelector(".random");

  const markup = `
  <div class="spinner">
    <svg>
    <img src="/img/svg/portalStrange.svg" class="icons-home" alt="cap-shield"">
    </svg>
  </div>
  `;

  return frameData.insertAdjacentHTML("afterbegin", markup);
};

//funcion encargada de pintar los personajes en el DOM (View)

export const printCharacter = function (character) {
  const modalData = document.querySelector(".modal-content");
  const frameData = document.querySelector(".random");
  let postElements = document.getElementsByClassName("post");
  const spinner = document.getElementsByClassName("spinner");
  let offset = 1;
  let page = 1;

  let contentHTML = "";
  contentHTML = `
 
  <a href="#myModal" class="post ${character.id}" 
      <figure class="post-image">
        <img class="cards-home" src="${character.thumbnail}.${character.extension}" alt="marvel-character-image">
      </figure>
      <p class="title-card">${character.name}</p>
    
   </a> `;

  frameData.insertAdjacentHTML("afterbegin", contentHTML);

  //es el event listener encargado de detectar el click del usuario
  postElements[0].addEventListener("click", function () {
    const modalContent = `<figure class="post-image">
        <img class="cards-modal" src="${character.thumbnail}.${character.extension}" alt="marvel-character-image">
      </figure>
    <p class="modal-title-card">${character.name}</p>
    <p class="modal-description-card">${character.description}</p>
    <a class="close-modal" href="#"><strong>( X )</strong></a>`;
    console.log(modalContent);
    modalData.innerHTML = modalContent;
    /*
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
    localStorage.setItem("count", JSON.stringify(count));*/
  });

  frameData.removeChild(spinner[0]);
};

/*
const frameData = document.querySelector(".character");

const getLocalStorage = function () {
  let character = JSON.parse(localStorage.getItem(`selected`));

  frameData.innerHTML = `
  <figure class="post-image">
  <img class="cards-home" src="${character.thumbnail}.${character.extension}" alt="marvel-character-image">
  </figure>
  <p class="title-card">${character.name}</p>
  <p class="title-card">${character.description}</p>
`;
};

getLocalStorage();
*/
