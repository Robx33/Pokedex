const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

// Só se utiliza o await em função assincrona (onde se coloca o async), onde precisa esperar para receber uma informação
const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200) { // Condição que só vai extrair as informações se o status for de 200 = OK 'True'
    const data = await APIResponse.json(); // Extrair os dados em json da resposa da API, por ser assincrona tambem se utiliza o await
    return data;
  }
}
// Função que vai pegar a informação da fetchPokemon e vai renderizar na tela
const renderPokemon = async (pokemon) => {

  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon);

// Condicional para buscar o nome, numero e imagem
  if (data) { // Só vai mostrar o nome do pokemon se exister o data, ou seja com o nome ou numero certo
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    searchPokemon = data.id;
  } else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Not found :c';
    pokemonNumber.innerHTML = '';
  }
}
// Função para definir a informação do nome do pokemon ou numero do input ao dar ENTER
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Bloqueia o evento padrão de envio do form
  renderPokemon(input.value.toLowerCase()); // Render é a função que vai retornar as informações do poke na tela, input.value mostra o que foi digitado, tolowercase permite pesquisar com caracter maiusculo ou minusculo
});
// Função para retornar o pokemon
buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});
// Função para avançar o pokemon
buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon); // Para começar a tela mostrando o pokémon na posição 1

