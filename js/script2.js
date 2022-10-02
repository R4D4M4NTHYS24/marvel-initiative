const frameData = document.querySelector(".character");
const pagination = document.querySelector(".go-btn-results");

const getLocalStorage = function () {
  let character = JSON.parse(localStorage.getItem(`selected`));

  //console.log(character.extension);
  frameData.innerHTML = `
  <figure class="post-image">
  <img class="cards-home" src="${character.thumbnail}.${character.extension}" alt="marvel-character-image">
  </figure>
  <p class="title-card">${character.name}</p>
  <p class="title-card">${character.description}</p>
`;
};

getLocalStorage();
