<template>
  <div class="pokemon__card" @click="getPokemonDetails">
    <div class="pokemon__img_container">
      <!-- <img :src="pokemon.sprites.front_default" alt="" /> -->
      <img :src="pokemon.imgLink" :alt="pokemon.name + ' image'" />
    </div>
    <div class="pokemon__name">{{ pokemon.name }}</div>
  </div>
</template>

<script>
export default {
  name: "PokemonCard",
  props: {
    pokemon: {
      type: Object,
    },
  },
  methods: {
    getPokemonDetails() {
      this.$store.dispatch("getThePokemonDetails", this.pokemon.url);
      this.$emit("showCard");
    },
  },
};
</script>

<style lang="scss">
.pokemon__card {
  max-width: 50wh;
  cursor: pointer;
  padding: 10px;
  border: solid;
  border-radius: 10px;
  text-align: center !important;
  &:hover {
    background-color: #eee;
  }
  .pokemon__img_container {
    display: flex;
    img {
      margin: auto;
      width: 120px;
      height: 120px;
    }
  }
  .pokemon__name {
    font-size: 1.5em;
    text-transform: capitalize;
  }
}
</style>