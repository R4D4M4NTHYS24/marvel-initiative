const frameData = document.querySelector(".character");
const pagination = document.querySelector(".go-btn-results");
let flag = true;

const getLocalStorage = function () {
  let character = JSON.parse(localStorage.getItem(`selected`));
  let pages = JSON.parse(localStorage.getItem(`pagination`));

  console.log(character.extension);
  frameData.innerHTML = `
  <figure class="post-image">
  <img class="cards-home" src="${character.thumbnail}.${character.extension}" alt="marvel-character-image">
  </figure>
  <p class="title-card">${character.name}</p>
  <p class="title-card">${character.description}</p>
`;
};

getLocalStorage();

pagination.addEventListener("click", function (params) {
  localStorage.setItem("pages", JSON.stringify(flag));
});
