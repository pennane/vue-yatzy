<template>
  <div class="yatzy">
    <div class="game">
      <div class="left">
        <div class="heading">
          <h1>jatsi my son</h1>
        </div>
        <div v-if="categories" class="categories">
          <Players />
          <Category
            v-for="(category, i) in upperCategories"
            :key="'upper-category-' + i"
            :payload="category"
          />
          <LowTotal />
          <Bonus />
          <Category
            v-for="(category, i) in lowerCategories"
            :key="'lower-category-' + i"
            :payload="category"
          />
          <Total />
        </div>
        <h2>Nyt vuorossa Pelaaja {{ currentPlayer + 1 }}</h2>
        <h3>Heittoja jäljellä {{ rollsLeft }}</h3>
      </div>
      <div class="right">
        <div class="dice-visual-wrapper">
          <Cup />
          <div class="dice">
            <Die v-for="(die, i) in dice" :key="'die-' + i" :number="die" :index="i" />
          </div>
        </div>

        <div class="rolling" v-if="rollsLeft > 0">
          <button @click="rollDice()" class="rollButton">Heitä ({{ rollsLeft }} jäljellä)</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gamelogic from "@/gamelogic";
import Cup from "@/components/yatzy/cup.vue";
import Die from "@/components/yatzy/die.vue";
import Category from "@/components/yatzy/category.vue";
import Bonus from "@/components/yatzy/categoryBonus.vue";
import Total from "@/components/yatzy/categoryTotal.vue";
import LowTotal from "@/components/yatzy/categoryLowTotal.vue";
import Players from "@/components/yatzy/categoryPlayers.vue";

export default {
  name: "Yatzy",
  components: {
    Cup,
    Die,
    Category,
    Bonus,
    LowTotal,
    Total,
    Players
  },
  data: () => {
    return {};
  },
  props: {
    msg: String
  },
  methods: {
    async rollDice() {
      if (this.rollsLeft <= 0) return;
      let sleep = this.$root.sleep;
      this.$store.commit("rolling", {
        rolling: true
      });
      await sleep(2000);
      gamelogic.rollDice();
      this.$store.commit("rolling", {
        rolling: false
      });
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
    },
    rolling() {
      return this.$store.getters.currentlyRolling;
    },
    dice() {
      return this.$store.getters.getDice;
    }
  },
  created() {}
};
</script>

<!--NON SCOPED STYLE -->
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
  margin: 0 0.19em;
}

.category > div:last-child {
  border-right: none;
}

.category-info {
  flex: 0 0 35%;
  min-width: 100px;
  display: flex;
  justify-content: space-between;
  font-weight: 500;
}

.category-possible-points {
  margin-right: 0.2em;
}

.category-player-points {
  flex: 1 1 100%;
  text-align: right;
}
</style>

<style scoped>
.yatzy {
}

.game {
  margin-top: 1em;
  max-width: 1200px;
}

.left {
  background-color: white;
  padding: 1.5em;
  padding-top: 0.5em;
  padding-bottom: 2em;
}

.right {
  margin-left: 1em;
  padding-bottom: 1em;
}

.heading {
  margin-bottom: 0.5em;
  color: #506975;
}

h1 {
  margin: 0;
}

.dice {
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
  margin: 50px 0;
}

.dice-visual-wrapper {
  position: relative;
  height: 320px;
  display: flex;
}

.game {
  display: flex;
}

.game > div {
  flex: 1 1 100%;
}

.rolling {
  padding-top: 1em;
}

.rollButton {
  -webkit-appearance: none;
  text-decoration: none;
  padding: 0.8em 1.5em;
  background-color: #556ebe;
  background: linear-gradient(90deg, #556ebe, #566dbc);
  border-radius: 1.3em;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 1px 2px 4px 0 rgba(0, 0, 0, 0.3);
  min-width: 75px;
  text-align: center;
  display: block;
  margin: 0;
  white-space: nowrap;
  outline: none;
  border: none;
  font-size: 0.9em;
}

.rollButton:hover {
  filter: brightness(0.9);
}

.categories >>> .category:nth-child(even) {
  background-color: #f1f1f1;
}
.categories >>> .category:nth-child(odd) {
  background-color: #e6e6e6;
}

@media screen and (max-width: 520px) {
  .game {
    flex-direction: column-reverse;
  }
}
</style>
