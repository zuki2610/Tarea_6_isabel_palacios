/*const axios = require("axios");*/

const getImage = async (url) => {
  const request = await axios.get(url);
  const image = request.data.sprites.front_default;
  return image;
};

const getPokemones = async () => {
  const { data } = await axios.get("https://pokeapi.co/api/v2/pokemon");
  const results = data.results;
  return results;
};

getPokemones().then((pokemones) => {
  const images = [];

  let pokemonesConImagenes =[];
  for (const pokemon of pokemones) {
    const image = getImage(pokemon.url);
    images.push(image);
  }

  Promise.all(images).then((images) => {
    console.log(images);
    for (let i = 0; i < images.length; i++) {   
        pokemonesConImagenes.push(`
            <tr>
                <td>${pokemones[i].name}</td>
                <td><img src="${images[i]}" alt="${pokemones[i].name}"></td>
            </tr>`);
        /*document.getElementById("data").innerHTML += `<img src="${images[i]}">`;*/
    } 

    pokemonesConImagenes = pokemonesConImagenes.join("");
    document.getElementById("data").innerHTML = pokemonesConImagenes;
    console.log(pokemonesConImagenes);
  });
});
