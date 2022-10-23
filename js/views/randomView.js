"use stric";

export const renderSpinner = function (frameData) {
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

export const printCharacter = function (character, frameData) {
  const modalData = document.querySelector(".modal-content");

  let postElements = document.getElementsByClassName("randomPost");
  const spinner = document.getElementsByClassName("spinner");

  let contentHTML = "";
  contentHTML = `
 
  <a href="#myModal" class="randomPost ${character.id}">
      <figure class="post-image">
        <img class="cards-home" src="${character.thumbnail}.${character.extension}" alt="marvel-character-image">
      </figure>
      <p class="title-card">${character.name}</p>
    
   </a> `;

  frameData.insertAdjacentHTML("afterbegin", contentHTML);

  //es el event listener encargado de detectar el click del usuario
  postElements[0].addEventListener("click", function () {
    const modalContent = `
    <div class="grid grid--3-cols">
    <ul class="modal-description">
      <li><p class="modal-title-card">${character.name}</p></li>
      <li><p class="modal-description-card">${character.description}</p></li>
    </ul>
    
    <figure class="post-image-selected">
        <img class="cards-modal" src="${character.thumbnail}.${character.extension}" alt="marvel-character-image">
      </figure>
      <a class="close-modal" href="#"><strong>X</strong></a>  
    </div>`;
    modalData.innerHTML = modalContent;
  });

  frameData.removeChild(spinner[0]);
};

///////////////////////////////////////////////////////////
// Sticky navigation

const sectionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    //console.log(ent);

    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }

    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },
  {
    // In the viewport
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroEl);

///////////////////////////////////////////////////////////
