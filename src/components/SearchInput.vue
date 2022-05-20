<template>
  <div>
    <input type="text" v-model="searchText" @input="onChangeSearchInput" />
  </div>
</template>

<script>
export default {
  name: "SearchInput",
  data() {
    return {
      searchText: "",
    };
  },
  methods: {
    onChangeSearchInput() {
      this.$emit("onChangeSearchInput", this.searchText);
    },
  },
  
};
</script>

<style>
</style>