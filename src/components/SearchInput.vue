<template>
  <div>
    <input
      class="
        bg-gray-50
        border border-gray-300
        text-gray-900 text-sm
        rounded-lg
        focus:ring-blue-500 focus:border-blue-500
        box-border
        p-2.5
        mx-auto
        dark:bg-gray-700
        dark:border-gray-600
        dark:placeholder-gray-400
        dark:text-white
        dark:focus:ring-blue-500
        dark:focus:border-blue-500
      "
      type="text"
      v-model="searchText"
      @input="onChangeSearchInput"
    />
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
      const text = this.searchText.trim().toLowerCase()
      this.$emit("onChangeSearchInput", text);
    },
  },
};
</script>

<style>
</style>