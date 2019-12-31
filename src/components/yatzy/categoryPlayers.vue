<template>
  <div class="category player-category">
    <div class="category-info"></div>
    <div
      v-for="(player, index) in amountOfPlayers"
      :class="['category-player-points', currentPlayer === index ? 'currentPlayer' : null]"
      :key="'player' + '-' + index"
    >
      <span :style="{'opacity':gameNotStarted?0:1}"> Pelaaja {{ player }} </span>
      <span v-show="currentPlayer === index">*</span>
    </div>
  </div>
</template>

<script>
import gamelogic from "@/gamelogic";

export default {
  name: "Players",
  computed: {
    amountOfPlayers() {
      return this.$store.getters['game/getAmountOfPlayers'];
    },
    currentPlayer() {
      return this.$store.getters['game/getCurrentPlayer'];
    },
    gameNotStarted() {
      return this.$store.getters["game/getNoGameStarted"];
    },
  }
};
</script>

<style scoped>
.category-player-points {
  text-align: left;
}

.currentPlayer {
  font-weight: 700;
}
</style>
