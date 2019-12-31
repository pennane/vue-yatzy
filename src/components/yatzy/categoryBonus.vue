<template>
  <div class="category">
    <div class="category-info">
      <span class="category-name">Bonus: (63 pisteestä)</span>
      <span class="category-possible-points">
        (50)
      </span>
    </div>
    <div
      v-for="(player, index) in amountOfPlayers"
      class="category-player-points"
      :key="'bonus-' + index"
    >
      <span v-if="bonusScores && bonusScores[index]">{{ bonusScores[index] }}</span>
    </div>
  </div>
</template>

<script>
import gamelogic from "@/gamelogic";

export default {
  name: "CategoryBonus",
  data: () => {
    return {
      calculated: []
    };
  },
  props: {},
  computed: {
    amountOfPlayers() {
      return this.$store.getters['game/getAmountOfPlayers'] || this.$store.getters['defaultData/getAmountOfPlayers'];
    },
    bonusScores() {
      return this.$store.getters['game/getBonusScores'];
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
