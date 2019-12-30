<template>
  <div
    :class="[
      'category',
      matches ? 'matching' : null,
      scores[currentPlayer] ? 'used' : null,
      useable ? 'useable' : null
    ]"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    @click="redeemPoints()"
  >
    <div class="category-info">
      <span class="category-name">{{ payload.name }}</span>
      <span
        v-if="hover && useable"
        :class="['category-possible-points', matches ? 'matching' : null]"
        >({{ possiblePoints }})</span
      >
      <span v-else :class="['category-possible-points', matches ? 'matching' : null]">
        <!-- ({{ payload.best }}) -->
      </span>
    </div>
    <div
      v-for="(player, index) in amountOfPlayers"
      class="category-player-points"
      :key="payload.name + '-' + index"
    >
      <span v-if="scores && scores[index] !== undefined">
        {{ scores[index] }}
      </span>
    </div>
  </div>
</template>

<script>
import gamelogic from "@/gamelogic";

export default {
  name: "Category",
  data: () => {
    return {
      used: null,
      matches: false,
      possiblePoints: 0,
      hover: false,
      scores: []
    };
  },
  props: {
    payload: {
      required: true,
      type: Object
    }
  },
  methods: {
    redeemPoints() {
      gamelogic.redeemPoints(this.payload.id);
    }
  },
  computed: {
    amountOfPlayers() {
      return this.$store.getters.amountOfPlayers;
    },
    currentPlayer() {
      return this.$store.getters.currentPlayer;
    },
    rolling() {
      return this.$store.getters.currentlyRolling;
    },
    displayDice() {
      return this.$store.getters.displayDice;
    },
    useable() {
      return !this.rolling && !this.displayDice
    }
  },
  created() {
    this.$store.watch(
      (state, getters) => getters.matching,
      (newValue, oldValue) => {
        let { categories, points } = newValue;
        if (!categories) return false;

        if (categories.some(category => category === this.payload.id)) {
          this.possiblePoints = points[categories.indexOf(this.payload.id)];
          this.matches = true;
        } else {
          this.matches = false;
          this.possiblePoints = 0;
        }
      }
    );
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "updateScoreForPlayer" && mutation.payload.id === this.payload.id) {
        this.scores[mutation.payload.player] = mutation.payload.score;
      } else if (mutation.type === "newGame") {
        for (let i = 0; i < this.amountOfPlayers; i++) {
          this.scores[i] = undefined;
        }
      }
    });
  }
};
</script>

<style scoped>
.category.useable {
  cursor: pointer;
}

.category:not(.matching):hover .category-possible-points {
  color: red;
}

.category.used.matching .category-possible-points {
  visibility: hidden;
}

.category.used {
  cursor: inherit;
}
</style>
