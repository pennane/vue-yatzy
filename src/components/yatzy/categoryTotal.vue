<template>
  <div class="category">
    <div class="category-name">Total:</div>
    <div
      v-for="player in amountOfPlayers"
      class="category-player-points"
      :key="'total-' + (upper ? 'upper' : null) + (total ? 'total' : null) + '-' + player"
    >
      123
    </div>
  </div>
</template>

<script>
import gamelogic from "@/gamelogic";

export default {
  name: "CategoryTotal",
  data: () => {
    return {
      used: null
    };
  },
  props: {
    upper: {
      type: Boolean
    },
    total: {
      type: Boolean
    }
  },
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
