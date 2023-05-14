//Pegando o botao que altera tema
const botaoALterarTema = document.getElementById("botao-alterar-tema");

//Pegando o body
const body = document.querySelector("body");

//Criando a variavel de troca de imagem
const imgTema = document.querySelector(".imagem-botao");

const imgCentro = document.querySelector(".img-centro");

//Adicionando um espião para a tag | função de seta - usada para não passar nada na função
botaoALterarTema.addEventListener("click", () => {
    //Verifica se o body contem a classe modo-escuro
   modoEscuroOn = body.classList.contains("modo-escuro");
    //Alterna sem uma condição
    body.classList.toggle("modo-escuro");
    //Verificando se o modo escuro esta ativo
  if (modoEscuroOn) {
     //Alterando a imagem para o Sol
    imgTema.setAttribute("src", "./src/imagens/sun.png");
    imgCentro.setAttribute("src", "./src/imagens/pokeball-opened.png")
  } 
  else {
    //Alterando a imagem para a lua
    imgTema.setAttribute("src", "./src/imagens/moon.png");
    imgCentro.setAttribute("src", "./src/imagens/img-modo-escuro.png");
  }
})

//Consumo da API Poke.api
let currentPokemonId = 1; // ID do Pokémon atual
function fetchPokemonData(pokemonId) {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
    //Limpa os campos para que não se dupliquem
    document.getElementById("types").innerHTML = "";
    document.getElementById("evolutions").innerHTML = "";
    document.getElementById("abilities").innerHTML = "";

    fetch(apiUrl)
        .then(response => response.json())

        .then(pokemon => {
            // Atualiza as informações do Pokémon na página
            document.getElementById("name").textContent = pokemon.name.replace("-", " ");
            document.getElementById("id").textContent = pokemonId;
            document.getElementById("image").src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/" + currentPokemonId + ".gif";
            document.getElementById("status").innerHTML = "";
            //Adiciona os status
            pokemon.stats.forEach(stat => {
                const li = document.createElement("li");
                li.textContent = `${stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}: ${stat.base_stat}`.replace("-", " ");
                document.getElementById("status").appendChild(li);

            });
            //Adiciona as habilidades do pokemon
            pokemon.abilities.forEach(ability => {
                const li = document.createElement("li");
                li.innerHTML = `${ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1)}`.replace("-", " ");
                document.getElementById("abilities").appendChild(li);
            });
            // Loop pelos tipos e adiciona cada um como um elemento de lista
            pokemon.types.forEach(type => {
                const li = document.createElement("li");
                li.innerHTML = type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1);
                document.getElementById("types").appendChild(li);
                if (type.type.name == "fire") {
                    li.classList.add("fogo");
                } else if (type.type.name == "water") {
                    li.classList.add("agua");
                } else if (type.type.name == "grass") {
                    li.classList.add("grama");
                }
                else if (type.type.name == "poison") {
                    li.classList.add("veneno");
                }
                else if (type.type.name == "insect") {
                    li.classList.add("inseto");
                }
                else if (type.type.name == "flying") {
                    li.classList.add("voador");
                }
                else if (type.type.name == "bug") {
                    li.classList.add("bug");
                }
                else if (type.type.name == "dark") {
                    li.classList.add("dark");
                }
                else if (type.type.name == "ice") {
                    li.classList.add("gelo");
                }
                else if (type.type.name == "psychic") {
                    li.classList.add("psychic");
                }
                else if (type.type.name == "normal") {
                    li.classList.add("normal");
                }
                else if (type.type.name == "ghost") {
                    li.classList.add("fantasma");
                }
                else if (type.type.name == "dragon") {
                    li.classList.add("dragao");
                }
                else if (type.type.name == "electric") {
                    li.classList.add("eletrico");
                }
                else if (type.type.name == "ground") {
                    li.classList.add("ground");
                }
                else if (type.type.name == "fairy") {
                    li.classList.add("fada");
                }
                else if (type.type.name == "fighting") {
                    li.classList.add("lutador");
                }
                else if (type.type.name == "fighting") {
                    li.classList.add("lutador");
                }
                else if (type.type.name == "steel") {
                    li.classList.add("steel");
                }
                else if (type.type.name == "rock") {
                    li.classList.add("pedra");
                }

                document.getElementById("types").appendChild(li);
            });



            //Procura pelas evoluções
            if (pokemon.species.url) {
                fetch(pokemon.species.url)
                    .then(response => response.json())
                    .then(species => {
                        fetch(species.evolution_chain.url)
                            .then(response => response.json())
                            .then(evolutionChain => {
                                let evolution = evolutionChain.chain;
                                while (evolution) {
                                    const li = document.createElement("li");
                                    li.innerHTML = `<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolution.species.url.split('/').slice(-2, -1)}.png" alt="${evolution.species.name}">`;
                                    const name = document.createElement("span");
                                    name.textContent = `${evolution.species.name.charAt(0).toUpperCase() + evolution.species.name.slice(1)}`;
                                    name.classList.add("evolution-name");
                                    li.appendChild(name);
                                    document.getElementById("evolutions").appendChild(li);
                                    evolution = evolution['evolves_to'][0];
                                }


                            });
                    });
            }
        });

}

// Adiciona event listeners aos botões "anterior" e "próximo"
document.getElementById("previous-button").addEventListener("click", () => {
    if (currentPokemonId > 1) {
        currentPokemonId--;
        fetchPokemonData(currentPokemonId);
    }
});

document.getElementById("next-button").addEventListener("click", () => {
    currentPokemonId++;
    fetchPokemonData(currentPokemonId);
});

// Chama a função inicialmente para exibir o primeiro Pokémon
fetchPokemonData(currentPokemonId);


