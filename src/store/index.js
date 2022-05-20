import { createStore } from 'vuex'
const GET_POKEMONS_URL_SEARCH = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'

const GET_POKEMONS_URL = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20"
const IMG_RAW_URL_START = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"
    // const IMG_RAW_URL_START = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" // 000 - 999
    // FULL URL IS IMG_RAW_URL_START + pokemon's id + IMG_RAW_URL_END
const IMG_RAW_URL_END = ".png"

export default createStore({
    state() {
        return {
            nextPokemonsLink: GET_POKEMONS_URL,
            allPokemons: [],
            pokemons: [],
            pokedex: [],
            pokemonDetails: {},
            count: 0,
        }
    },
    mutations: {
        increment(state) {
            state.count++
        },
        pushAllPokemons(context, pokemons) {
            pokemons.results.forEach(pokemon => {
                context.allPokemons.push(pokemon)
            });
        },
        pushMorePokemons(context, newPokemons) {
            context.nextPokemonsLink = newPokemons.next
            newPokemons.results.forEach(pokemon => {
                pokemon.imgLink = getImgUrl(pokemon.url)
            });
            context.pokemons = context.pokemons.concat(newPokemons.results)

        },
        pushPokemonDetails(context, thePokemon) {
            context.pokemonDetails = {...thePokemon }
        },
    },
    actions: {
        async getAllPokemons(context) {
            await fetch(GET_POKEMONS_URL_SEARCH)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    context.commit('pushAllPokemons', data)
                });
        },
        async getMorePokemons(context) {
            const url = context.state.nextPokemonsLink ? context.state.nextPokemonsLink : GET_POKEMONS_URL
            await fetch(url)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    context.commit('pushMorePokemons', data)
                    context.commit('increment')
                });
        },
        async getThePokemonDetails(context, link) {
            await fetch(link)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    context.commit('pushPokemonDetails', data)
                });

        }
    },
})

const getImgUrl = (pokemonUrl) => {
    const pokemonId = pokemonUrl.split('/')
        // return (IMG_RAW_URL_START + rightNumForImg(pokemonId[pokemonId.length - 2]) + IMG_RAW_URL_END)
    return (IMG_RAW_URL_START + (pokemonId[pokemonId.length - 2]) + IMG_RAW_URL_END)
}

// const rightNumForImg = (num) => {
//     if (num < 10) {
//         return '00' + num;
//     } else if (num < 100) {
//         return '0' + num;
//     } else if (num < 1000) {
//         return num;
//     }
// }