<template>
  <div class="controls">
    <h1>{{ count }}</h1>
    <search-input @onChangeSearchInput="getInputSearchText" />
    <button @click="getMorePokemons">get more pokemons</button>
    <ol>
      <template v-for="pokemon in searchPokemonsArray" :key="pokemon.name">
        <li>{{ pokemon.name }}</li>
      </template>
    </ol>
  </div>

  <dialog-card
    :cardVisible="cardVisible"
    :pokemonDetails="pokemonDetails"
    @hideCard="toggleCard"
  />

  <div class="pokemon__container">
    <template v-for="pokemon in pokemons" :key="pokemon.name">
      <pokemon-card :pokemon="pokemon" @showCard="toggleCard" />
    </template>
  </div>
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
      hi: "hi",
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
    count() {
      return this.$store.state.count;
    },
    pokemons() {
      return !this.inputSearchText && this.$store.state.pokemons;
    },
    pokemonDetails() {
      return this.$store.state.pokemonDetails;
    },
    searchPokemonsArray() {
      return this.$store.state.allPokemons.filter(
        (pokemon, index) =>
          this.inputSearchText &&
          pokemon.name.includes(this.inputSearchText.toLowerCase()) &&
          index < 20
      );
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
  }
}
.pokemon__container {
  padding: 10px;
  max-width: 100%;
  display: flex;
  flex-flow: row wrap;
  // display: grid;
  // grid-template-columns: repeat(5, 1fr);
  // grid-gap: 10px;
  gap:10px;
  justify-content: center !important;
}
@media (max-width: 1140px) {
  .pokemon__container {
    grid-template-columns: repeat(4, 1fr);
  }
}
@media (max-width: 860px) {
  .pokemon__container {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 680px) {
  .pokemon__container {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 430px) {
  .pokemon__container {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
