<template>
  <div class="category">
    <div class="category-name">Bonus:</div>
    <div v-for="player in amountOfPlayers" class="category-player-points" :key="'bonus-' + player">
      123
    </div>
  </div>
</template>

<script>
import gamelogic from "@/gamelogic";

export default {
  name: "CategoryBonus",
  data: () => {
    return {
      used: null
    };
  },
  props: {},
  methods: {},
  computed: {
    amountOfPlayers() {
      return this.$store.getters.amountOfPlayers;
    }
  },
  created() {}
};
</script>

<style scoped>
.category {
  display: flex;
}

.category-name {
  flex: 0 0 35%;
}
</style>
