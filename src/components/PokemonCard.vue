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
  cursor: pointer;
  padding: 20px;
  // margin: 20px auto;
  border: solid;
  border-radius: 10px;
  text-align: center;
  &:hover {
    background-color: #eee;
  }
  .pokemon__img_container {
    img {
      width: 150px;
      height: 150px;
    }
  }
  .pokemon__name {
    font-size: 1.5em;
    text-transform: capitalize;
  }
}
</style>