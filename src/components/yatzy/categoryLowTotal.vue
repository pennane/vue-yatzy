<template>
  <div class="category">
    <div class="category-info">
      <span class="category-name">Total:</span>
      <span class="category-possible-points">
        (105)
      </span>
    </div>
    <div
      v-for="(player, index) in amountOfPlayers"
      class="category-player-points"
      :key="'total-low-' + index"
    >
      <span v-if="lowTotalScores && lowTotalScores[index]">{{ lowTotalScores[index] }}</span>
    </div>
  </div>
</template>

<script>
import gamelogic from "@/gamelogic";

export default {
  name: "CategoryLowTotal",
  data: () => {
    return {};
  },
  props: {},
  methods: {},
  computed: {
    amountOfPlayers() {
      return this.$store.getters.amountOfPlayers;
    },
    lowTotalScores() {
      return this.$store.getters.getTotalLowScores;
    }
  },
  created() {}
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
