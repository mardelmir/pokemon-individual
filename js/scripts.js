// Creación de espacio para mostrar resultado
const main = document.querySelector('.pokemon-form');
const show = document.createElement('div');
show.classList.add('show');
main.insertAdjacentElement('afterend', show);

// Botones y función principal
const btn = document.getElementById('get-pokemon');

btn.addEventListener('click', () => {
  let pokemon = document.getElementById('pokemon-select').value;
  let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
  show.innerHTML = '';
  return getpokemon(url);
});

const getpokemon = (url) => {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('La solicitud no ha sido exitosa');
      }
      return response.json();
    })
    .then((data) => {
        const info = data.types.map((el) => el.type.name);
        const template =`
            <img class="pokeimg" src="${data.sprites.front_default}" alt="Pokemon: ${data.name}" />
            <p class="pokename"> ${data.name} </p>
            <p><span>Altura:</span> ${data.height}</p>
            <p><span>Peso:</span> ${data.weight}</p>
            <p><span>Tipo:</span> ${info.join(', ')}</p>
        `
        show.innerHTML = template
    })
    .catch((error) => {
      const errorMsg = document.createElement('p');
      errorMsg.textContent = 'Error: no se pudo obtener el contenido';
      show.appendChild(errorMsg);
    });
};
