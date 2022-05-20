<template>
  <div v-if="cardVisible" class="pokemon__details_background" @click="hideCard">
    <div @click.stop class="pokemon__details-card">
      <div class="pokemon__details-header">
        <h1>
          {{ pokemonDetails.name }}
          <span>№{{ rightNumForImg(pokemonDetails.order) }}</span>
        </h1>
      </div>
      <div class="pokemon__details">
        <div class="pokemon__details-img-wrapper">
          <img
            class="pokemon__details-img"
            :src="
              'https://assets.pokemon.com/assets/cms2/img/pokedex/full/' +
              rightNumForImg(pokemonDetails.id) +
              '.png'
            "
            :alt="pokemonDetails.name + ' image'"
          />
        </div>
        <div>{{ pokemonDetails.name ? pokemonDetails.name : "" }}</div>
        <div>{{ pokemonDetails.height ? "Height: " +pokemonDetails.height : "" }}</div>
        <div>
          {{ pokemonDetails.weight ? "Weight: " + pokemonDetails.weight : "" }}
        </div>
        <div class="pokemon__details-stats">
          <h2>{{ pokemonDetails.stats ? "Stats" : "" }}</h2>
          <template v-for="(stat, i) in pokemonDetails.stats" :key="'stat' + i">
            <div class="pokemon__details-stats-item">
              <div>{{ stat.stat.name }}</div>
              <div>{{ stat.base_stat }}</div>
            </div>
          </template>
        </div>
        <div class="pokemon__details-abilities">
          <h2>{{ pokemonDetails.abilities ? "Abilities" : "" }}</h2>
          <div class="pokemon__details-abilities-list">
            <template
              v-for="(ability, i) in pokemonDetails.abilities"
              :key="'stat' + i"
            >
              <span class="pokemon__details-abilities-item">{{
                ability.ability.name
              }}</span>
            </template>
          </div>
        </div>
        <div class="pokemon__details-types">
          <h2>{{ pokemonDetails.types ? "Type" : "" }}</h2>
          <div class="pokemon__details-types-list">
            <template
              v-for="(type, i) in pokemonDetails.types"
              :key="'type' + i"
            >
              <span
                :class="
                  'pokemon__details-types-item background-color-' +
                  type.type.name
                "
                >{{ type.type.name }}
              </span>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "./DialogCard.scss";
export default {
  name: "DialogCard",
  props: {
    pokemonDetails: { type: Object },
    cardVisible: { type: Boolean },
  },
  methods: {
    hideCard() {
      this.$emit("hideCard");
    },
    rightNumForImg(num) {
      if (num < 10) {
        return "00" + num;
      } else if (num < 100) {
        return "0" + num;
      } else {
        return num;
      }
    },
  },
};
</script>