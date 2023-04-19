const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

const descrName = document.querySelector('.title-descricao');
const pokeStyle = document.querySelector('.type-name');
const buttonDescr = document.getElementById('descr');
const descricao = document.querySelector('.descricao');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');



let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}

const renderPokemon = async (pokemon) => {

  pokemonName.innerHTML = 'Carregando...';
  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    
    descrName.innerHTML = data.name;
    pokeStyle.innerHTML = data['types']['0']['type']['name'];
    hp.innerHTML = data['stats']['1']['base_stat'];
    attack.innerHTML = data['stats']['2']['base_stat'];
    defense.innerHTML = data['stats']['3']['base_stat'];
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    searchPokemon = data.id;
  } else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Não encontrado!';
    pokemonNumber.innerHTML = '';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

buttonDescr.addEventListener('click', function() {
    if (descricao.style.display === 'none') {
        descricao.style.display = 'block';
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
    })
      } 
    else {
        descricao.style.display = 'none';
      }
});

renderPokemon(searchPokemon);
