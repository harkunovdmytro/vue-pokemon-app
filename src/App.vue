<template>
  <div class="controls">
    <h1 class="text-3xl font-bold py-2">Pokemons</h1>
    <search-input @onChangeSearchInput="getInputSearchText" />
    <div class="pokemon__container" v-show="inputSearchText">
      <template v-for="pokemon in searchPokemonsArray" :key="pokemon.name">
        <pokemon-card :pokemon="pokemon" @showCard="toggleCard" />
      </template>
    </div>
  </div>
  <div class="pokemon__container" v-show="!inputSearchText">
    <template v-for="pokemon in pokemons" :key="pokemon.name">
      <pokemon-card :pokemon="pokemon" @showCard="toggleCard" />
    </template>
  </div>
  <div class="text-center" v-show="!inputSearchText">
    <button
      @click="getMorePokemons"
      class="
        my-10
        bg-sky-600
        hover:bg-sky-700
        text-white
        font-bold
        py-6
        px-12
        rounded-lg
      "
    >
      get more pokemons
    </button>
  </div>
  <dialog-card
    :cardVisible="cardVisible"
    :pokemonDetails="pokemonDetails"
    @hideCard="toggleCard"
  />
</template>

<script>
import PokemonCard from "./components/PokemonCard.vue";
import SearchInput from "./components/SearchInput.vue";
import DialogCard from "./components/DialogCard.vue";

export default {
  name: "App",
  components: { SearchInput, PokemonCard, DialogCard },
  data() {
    return {
      inputSearchText: "",
      cardVisible: false,
    };
  },
  methods: {
    getInputSearchText(newText) {
      this.inputSearchText = newText;
    },
    getMorePokemons() {
      this.$store.dispatch("getMorePokemons");
    },
    getAllPokemons() {
      this.$store.dispatch("getAllPokemons");
    },
    toggleCard() {
      this.cardVisible = !this.cardVisible;
    },
  },
  computed: {
    pokemons() {
      // return !this.inputSearchText && this.$store.getters.getPokemons;
      return this.$store.getters.getPokemons;
    },
    pokemonDetails() {
      return this.$store.getters.getPokemonDetails;
    },
    searchPokemonsArray() {
      // console.log(this.$store.getters.getAllPokemons);
      return this.$store.getters.getAllPokemons
        .filter(
          (pokemon, index) =>
            pokemon.name.includes(this.inputSearchText.toLowerCase()) &&
            index < 1000
        )
        .filter((_, index) => index < 20);
    },
  },
  beforeMount() {
    this.getAllPokemons();
    this.getMorePokemons();
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  .controls {
    text-align: center;
    max-width: 800px;
    margin: auto;
    padding: 10px;
    * {
      width: 100% !important;
    }
  }
}
.pokemon__container {
  padding: 10px;
  max-width: 800px;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  gap: 10px;
  justify-content: center !important;
}
@media (max-width: 680px) {
  .pokemon__container {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}
</style>
