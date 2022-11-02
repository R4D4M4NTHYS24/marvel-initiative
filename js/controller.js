"use stric";
import * as model from "./model.js";
import * as randomView from "./views/randomView.js";
import * as charactersView from "./views/charactersView.js";

const frameDataRandom = document.querySelector(".random");
const frameDataCharacters = document.querySelector(".character");
const buttonForward = document.querySelector(".button-forward");
const buttonBack = document.querySelector(".button-back");
const postElementsAll = document.getElementsByClassName("post");
const form = document.getElementById("contact");
let name = document.getElementById("name");
let email = document.getElementById("email");
let message = document.getElementById("message");

let userObject = {};
//const pagination = document.querySelector(".pagination");
const results = document.querySelector(".results");
const pagination = results;
let offset = 1;
let page = 1;
const cardsLimit = 25;
let flag = true;

await model.totalCharacterInit();

const totalcharacters = model.state;
let characters = model.state.totalcharacters;
//let characters = 37;
const totalPages = Math.ceil(characters / 25);
let randomPositions = [];
const promises = [];

/********************************flujo principal de la app **********************************/
console.log(totalcharacters);
for (let i = 0; i < 3; i++) {
  randomView.renderSpinner(frameDataRandom);
  const randomPosition =
    Math.floor(Math.random() * model.state.totalcharacters + 1) - 1;
  randomPositions.push(randomPosition);
  await model.loadCharacter(1, randomPositions[i]);

  promises.push(model.state.characters[0]);
}

for (let j = 0; j < 3; j++) {
  randomView.printCharacter(promises[j], frameDataRandom);
}

await model.loadCharacter(cardsLimit, offset);

if (offset === 1) {
  buttonBack.style.display = "none";
} else {
  document.querySelector(".page");
  buttonBack.style.display = "block";
}

for (let k = 24; k >= 0; k--) {
  charactersView.renderSpinnerAll(frameDataCharacters);
  charactersView.printCharacterAll(
    model.state.characters[k],
    frameDataCharacters
  );
}

charactersView.numberPage(page, totalPages, pagination);

/***************** listener encargado del boton de avanzar de la paginacion *****************************/

buttonForward.addEventListener("click", async function () {
  offset = offset + 25;
  page++;
  characters -= 25;

  if (characters < cardsLimit) {
    buttonForward.style.display = "none";
  } else {
    document.querySelector(".page");
    buttonForward.style.display = "block";
  }

  if (offset === 1) {
    buttonBack.style.display = "none";
  } else {
    document.querySelector(".page");
    buttonBack.style.display = "block";
  }

  charactersView.numberPage(page, totalPages, pagination);
  charactersView.removeNumberPage(page, totalPages, pagination);

  if (characters - 1 >= cardsLimit) {
    charactersView.removeCharactersAll(
      frameDataCharacters,
      cardsLimit,
      postElementsAll
    );
    for (let j = cardsLimit - 1; j >= 0; j--) {
      charactersView.renderSpinnerAll(frameDataCharacters);
    }
    await model.loadCharacter(cardsLimit, offset);
    for (let j = cardsLimit - 1; j >= 0; j--) {
      charactersView.printCharacterAll(
        model.state.characters[j],
        frameDataCharacters
      );
    }
  } else {
    characters--;
    charactersView.removeCharactersAll(
      frameDataCharacters,
      cardsLimit,
      postElementsAll
    );
    for (let j = characters - 1; j >= 0; j--) {
      charactersView.renderSpinnerAll(frameDataCharacters);
    }
    await model.loadCharacter(characters, offset);
    for (let j = characters - 1; j >= 0; j--) {
      charactersView.printCharacterAll(
        model.state.characters[j],
        frameDataCharacters
      );
    }
  }
});

/***************** listener encargado del boton del retroceder de la paginacion *****************************/

buttonBack.addEventListener("click", async function () {
  offset = offset - 25;
  if (characters < cardsLimit) {
    flag = false;

    charactersView.removeCharactersAll(
      frameDataCharacters,
      characters,
      postElementsAll
    );
    for (let j = cardsLimit - 1; j >= 0; j--) {
      charactersView.renderSpinnerAll(frameDataCharacters);
    }
    await model.loadCharacter(cardsLimit, offset);
    for (let j = cardsLimit - 1; j >= 0; j--) {
      charactersView.printCharacterAll(
        model.state.characters[j],
        frameDataCharacters
      );
    }
    characters++;
  }

  page--;
  characters += 25;

  if (characters < cardsLimit) {
    buttonForward.style.display = "none";
  } else {
    document.querySelector(".page");
    buttonForward.style.display = "block";
  }

  if (offset === 1) {
    buttonBack.style.display = "none";
  } else {
    document.querySelector(".page");
    buttonBack.style.display = "block";
  }

  charactersView.numberPage(page, totalPages, pagination);
  charactersView.removeNumberPage(page, totalPages, pagination);

  if (characters - 1 >= cardsLimit && flag === true) {
    charactersView.removeCharactersAll(
      frameDataCharacters,
      cardsLimit,
      postElementsAll
    );
    for (let j = cardsLimit - 1; j >= 0; j--) {
      charactersView.renderSpinnerAll(frameDataCharacters);
    }
    await model.loadCharacter(cardsLimit, offset);
    for (let j = cardsLimit - 1; j >= 0; j--) {
      charactersView.printCharacterAll(
        model.state.characters[j],
        frameDataCharacters
      );
    }
  }
  flag = true;
});

///////////////////////////////////////////////////////////
// Make mobile navigation work

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

/***************** formulario de contacto ****************************/

form.addEventListener("submit", function (event) {
  event.preventDefault();
  userObject.name = name.value;
  userObject.email = email.value;
  userObject.message = message.value;
  localStorage.setItem("submit", JSON.stringify(userObject));
  name.value = "";
  email.value = "";
  message.value = "Your message was sent successfully";

  //console.log(userObject);
});
