<template>
  <div class="category">
    <div class="category-info">
      <span class="category-name">Total:</span>
      <span class="category-possible-points">
        (374)
      </span>
    </div>
    <div
      v-for="(player, index) in amountOfPlayers"
      class="category-player-points"
      :key="'total-' + index"
    >
      <span v-if="totalScores && totalScores[index]">{{ totalScores[index] }}</span>
    </div>
  </div>
</template>

<script>
import gamelogic from "@/gamelogic";

export default {
  name: "CategoryTotal",
  computed: {
    amountOfPlayers() {
      return this.$store.getters['game/getAmountOfPlayers'];
    },
    totalScores() {
      this.forceRecomputeCounter;
      return this.$store.getters['game/getTotalScores'];
    }
  }
};
</script>

<style scoped>
.category-info {
  font-weight: 500;
  color: gray;
}

.category-player-points {
  color: gray;
}
</style>
