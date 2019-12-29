<template>
  <div class="yatzy">
    <div class="top">
      <h1>jatsi my son</h1>
    </div>
    <div class="game">
      <div class="left">
        <div v-if="categories" class="categories">
          <Category
            v-for="(category, i) in upperCategories"
            :key="'upper-category-' + i"
            :payload="category"
          />
          <Total upper />
          <Bonus />
          <Category
            v-for="(category, i) in lowerCategories"
            :key="'lower-category-' + i"
            :payload="category"
          />
          <Total total />
        </div>
      </div>
      <div class="right">
        <div class="dice">
          <Die v-for="(die, i) in dice" :key="'die-' + i" :number="die" :index="i" />
        </div>
        <div v-if="readyForRoll">
          <button @click="rollDice()">Roll dice</button>
        </div>
        <h2>pelaaja {{ currentPlayer + 1 }}</h2>
        <h3>Rolls left {{ rollsLeft }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import gamelogic from "@/gamelogic";
import Die from "@/components/yatzy/die.vue";
import Category from "@/components/yatzy/category.vue";
import Bonus from "@/components/yatzy/categoryBonus.vue";
import Total from "@/components/yatzy/categoryTotal.vue";

export default {
  name: "Yatzy",
  components: {
    Die,
    Category,
    Bonus,
    Total
  },
  data: () => {
    return {
      dice: null,
      readyForRoll: true
    };
  },
  props: {
    msg: String
  },
  methods: {
    rollDice() {
      gamelogic.rollDice();
    }
  },
  computed: {
    selectedDice() {
      return this.$store.getters.selectedDice;
    },
    categories() {
      return this.$store.getters.categories;
    },
    upperCategories() {
      return this.categories.filter(category => category.upper);
    },
    lowerCategories() {
      return this.categories.filter(category => !category.upper);
    },
    currentPlayer() {
      return this.$store.getters.currentPlayer;
    },
    rollsLeft() {
      return this.$store.getters.moves;
    }
  },
  created() {
    this.$store.watch(
      (state, getters) => getters.getDice,
      (newValue, oldValue) => {
        this.dice = newValue;
      }
    );
  }
};
</script>

<style scoped>
.dice {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

.game {
  display: flex;
}

.game > div {
  flex: 1 1 100%;
}

.categories >>> .category:nth-child(even) {
  background-color: #f1f1f1;
}
.categories >>> .category:nth-child(odd) {
  background-color: #e6e6e6;
}
</style>
