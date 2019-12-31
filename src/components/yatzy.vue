<template>
  <div class="yatzy">
    <div class="game">
      <div class="left">
        <div class="left-inner">
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

          <div :style="{'opacity':(gameNotStarted || gameCompleted)?1:0,
          'pointerEvents':(gameNotStarted || gameCompleted)?'initial':'none'}" class="new-game-buttons">
            <button @click="newGame({players: 1})" class="yatzyButton">1 Pelaajan peli</button>
            <button @click="newGame({players: 2})" class="yatzyButton">2 Pelaajan peli</button>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="dice-visual-wrapper">
          <Cup />
          <div class="dice">
            <Die v-for="(die, i) in dice" :key="'die-' + i" :number="die" :index="i" />
          </div>
        </div>
        <div class="controls-and-information">
          <div class="rolling" v-if="true">
            <button
              :class="['yatzyButton', ableToRoll ? null : 'locked', rollsLeft <= 0 ? 'depleted' : null]"
              @click="rollDice()"
              class="yatzyButton"
            >Heitä ({{ rollsLeft }} jäljellä)</button>
          </div>
          <div v-if="gameCompleted" class="round-info">
            <h2>Peli loppui.</h2>
          </div>
          <div v-else class="round-info">
            <h2 :style="{'opacity':gameNotStarted?0:1}">Vuorossa Pelaaja {{ currentPlayer + 1 }}</h2>
            <h3 :style="{'opacity':gameNotStarted?0:1}">
              ({{ rollsLeft }}
              <span v-if="rollsLeft === 1">
                heitto jäljellä
              </span>
              <span v-else>heittoa jäljellä</span>
              )
            </h3>
          </div>
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
  props: {
    msg: String
  },
  methods: {
    async rollDice() {
      if (this.rollsLeft <= 0 || !this.ableToRoll) return;
      let sleep = this.$root.sleep;
      this.$store.commit("game/SET_ROLLING_STATE", {
        rolling: true
      });
      await sleep(2000);
      gamelogic.rollDice();
      this.$store.commit("game/SET_ROLLING_STATE", {
        rolling: false
      });
    },
    async newGame(options) {
      let sleep = this.$root.sleep;
      await sleep(1000);
      gamelogic.startNewGame(options);
    }
  },
  computed: {
    selectedDice() {
      return this.$store.getters["game/getSelectedDice"];
    },
    categories() {
      return this.$store.getters["defaultData/getCategories"];
    },
    upperCategories() {
      return this.categories.filter(category => category.upper);
    },
    lowerCategories() {
      return this.categories.filter(category => !category.upper);
    },
    currentPlayer() {
      return this.$store.getters["game/getCurrentPlayer"];
    },
    rollsLeft() {
      return this.$store.getters["game/getMoves"];
    },
    rolling() {
      return this.$store.getters["game/getCurrentlyRolling"];
    },
    dice() {
      return this.$store.getters["game/getDice"];
    },
    gameCompleted() {
      return this.$store.getters["game/getGameCompleted"];
    },
    gameNotStarted() {
      return this.$store.getters["game/getNoGameStarted"];
    },
    ableToRoll() {
      return this.rollsLeft > 0 && !this.rolling && !this.gameNotStarted;
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
  padding-top: 0.15em;
}

.category > div:last-child {
  border-right: none;
}

.category-info {
  flex: 0 0 50%;
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
.controls-and-information {
  max-width: 400px;
}

.round-info {
  box-shadow: inset 0px 0px 11px rgba(0, 0, 0, 0.3);
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 6px;
  padding: 1em;
  margin-top: 1.1em;
  backdrop-filter: blur(1px);
  color: white;
  margin-right: 1em;
}

.round-info h2 {
  margin: 0;
  font-weight: 200;
  font-size: 1.5em;
}

.round-info h3 {
  margin: 0;
  font-weight: 100;
  font-size: 1.2em;
  margin-top: 0.9em;
}

.new-game-buttons {
  display: flex;
  flex-wrap: wrap;
  margin-top: 5em;
}

.left {
  background-color: #d07e53;
  padding: 1em;
  padding-left: 0;
  margin-top: 1em;
  border-radius: 0 13px 13px 0;
  box-shadow: inset 0px 4px 1px #de8e66, 1px 1px 5px 0px rgba(0, 0, 0, 1);
  max-width: 470px;
}

.left-inner {
  background-color: #fafaf4;
  padding: 1.5em;
  padding-top: 0.5em;
  padding-bottom: 2em;
  border-radius: 0 3px 3px 0;
  box-shadow: 8px 7px 2px -3px rgba(0, 0, 0, 0.3);
}

.right {
  margin-left: 1em;
  padding-bottom: 1em;
}

.heading {
  margin-top: 1em;
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
  margin-bottom: 30px;
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
  margin-top: 2em;
}

.yatzyButton {
  -webkit-appearance: none;
  text-decoration: none;
  font-weight: 400;
  cursor: pointer;
  min-width: 75px;
  text-align: center;
  display: block;
  white-space: nowrap;
  outline: none;
  border: none;
  font-size: 0.9em;
  margin: 0.5em;
  box-sizing: border-box;
  box-shadow: 0 5px #234a6a;
  border-radius: 5px;
  color: white;
  padding: 0.68em 1em;
  background-color: hsl(208, 46%, 46%);
}

.yatzyButton:hover {
  background-color: hsl(208, 46%, 40%);
}

.yatzyButton:active {
  transform: translateY(2px);
  box-shadow: 0 3px #234a6a;
}

.yatzyButton.locked {
  transform: translateY(2px);
  box-shadow: 0 3px #234a6a;
  background-color: hsl(208, 46%, 35%);
  color: hsl(217, 23%, 57%);
}

.yatzyButton.depleted {
  cursor: initial;
}

.categories {
  margin: 1em 0;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}

.categories >>> .category:nth-child(even) {
  background-color: #f1f1f1;
}
.categories >>> .category:nth-child(odd) {
  background-color: #e6e6e6;
}

@media screen and (max-width: 600px) {
  .game {
    flex-direction: column-reverse;
  }
}
</style>
