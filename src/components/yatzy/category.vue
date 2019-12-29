<template>
  <div
    :class="['category', matches ? 'matching' : null, scores[currentPlayer] ? 'used' : null]"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    @click="redeemPoints()"
  >
    <div class="category-info">
      <span class="category-name">{{ payload.name }}</span>
      <span v-if="hover" :class="['category-possible-points', matches ? 'matching' : null]"
        >({{ possiblePoints }})</span
      >
      <span v-else :class="['category-possible-points', matches ? 'matching' : null]">
        ({{ payload.best }})
      </span>
    </div>
    <div
      v-for="(player, index) in amountOfPlayers"
      class="category-player-points"
      :key="payload.name + '-' + index"
      :id="payload.id + '-' + index"
    >
      <span v-if="scores && scores[index]">
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
      }
    });
  }
};
</script>

<style>
.category {
  display: flex;
  border: 1px solid black;
  border-top: none;
}

.category:first-child {
  border: 1px solid black;
}

.category > div {
  border-right: 1px solid black;
  margin: 0 0.1em;
}

.category > div:last-child {
  border-right: none;
}

.category-info {
  flex: 0 0 35%;
  display: flex;
  justify-content: space-between;
}

.category-possible-points {
  margin-right: 0.5em;
}

.category-player-points {
  flex: 1 1 100%;
}

.category.matching {
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
