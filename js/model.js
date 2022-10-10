"use stric";

export const state = {
  totalcharacters: {},
  characters: {},
};
//el offset y el limit deben ser suministrados por el controller
export const loadCharacter = async function (limit, offset) {
  try {
    const res = await fetch(
      `https://gateway.marvel.com:443/v1/public/characters?limit=${limit}&offset=${offset}&ts=1&apikey=b9d822d427ddad8905c9e71d7f83b60f&hash=670d244bbd5442995de438e9125bfd80`
    );

    let data = await res.json();

    const limitRanged = data.data.limit;
    let characters = [];
    for (let i = 0; i < limitRanged; i++) {
      state.characters[i] = {
        id: data.data.results[i].id,
        name: data.data.results[i].name,
        thumbnail: data.data.results[i].thumbnail.path,
        extension: data.data.results[i].thumbnail.extension,
        description: data.data.results[i].description,
      };
    }

    if (!res.ok) throw new Error(`conection API error status${res.status}`);
  } catch (err) {
    alert(`${err} please contact the administrator or try later...`);
  }
};

export const totalCharacterInit = async function () {
  try {
    const res = await fetch(
      `https://gateway.marvel.com:443/v1/public/characters?limit=1&offset=1&ts=1&apikey=b9d822d427ddad8905c9e71d7f83b60f&hash=670d244bbd5442995de438e9125bfd80`
    );
    let data = await res.json();
    const totalcharacters = data.data.total;
    state.totalcharacters = data.data.total;

    if (!res.ok) throw new Error(`conection API error status${res.status}`);
  } catch (err) {
    alert(`${err} please contact the administrator or try later...`);
  }
};
