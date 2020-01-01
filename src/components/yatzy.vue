<template>
  <div v-hotkey="keymap" class="yatzy">
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

          <div v-if="gameNotStarted || gameCompleted" class="new-game-buttons">
            <button @click="newGame({players: 1})" class="yatzyButton">1 Pelaajan peli</button>
            <button @click="newGame({players: 2})" class="yatzyButton">2 Pelaajan peli</button>
          </div>
          <div v-if="!gameNotStarted && !gameCompleted" class="stop-game-buttons">
            <button class="yatzyButton warning" @click="setModalState">Lopeta peli</button>
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
             :style="{'opacity':gameNotStarted?0:1}"
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
              <span v-if="rollsLeft === 1">heitto jäljellä</span>
              <span v-else>heittoa jäljellä</span>
              )
            </h3>
          </div>
        </div>
      </div>
    </div>

    <div class="modal" v-if="modalOpen" v-scroll-lock="modalOpen">
      <div class="modal-inner" v-click-outside="onClickOutside">
        <div class="modal-upper">
          <p class="modal-title">Oletko varma?</p>
          <button class="crossButton" @click="setModalState(false)">✖</button>
        </div>
        <div class="modal-content">
          <div class="modal-buttons">
            <button class="yatzyButton" @click="stopGame">kyllä</button>
            <button class="yatzyButton" @click="setModalState(false)">kumoa</button>
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
  data: () => {
    return {
      showRestartModal: true,
      modalOpen: false
    };
  },
  methods: {
    setModalState(bool) {
      if (typeof bool === "undefined") {
        this.modalOpen = !this.modalOpen;
      } else {
        this.modalOpen = bool;
      }
    },
    onClickOutside() {
      if (this.modalOpen) {
        this.setModalState(false);
      }
    },
    selectDie() {
      if (!this.ableToRoll) return;
      this.$store.commit("game/SET_ROLLING_STATE", {
        rolling: true
      });
    },
    async rollDice() {
      if (this.rollsLeft <= 0 || !this.ableToRoll) return;
      let sleep = this.$root.sleep;
      this.$store.commit("game/SET_ROLLING_STATE", {
        rolling: true
      });
      await sleep(1700);
      gamelogic.rollDice();
      this.$store.commit("game/SET_ROLLING_STATE", {
        rolling: false
      });
    },
    async newGame(options) {
      let sleep = this.$root.sleep;
      await sleep(100);
      gamelogic.startNewGame(options);
    },
    async stopGame(options) {
      this.setModalState(false);
      this.$store.commit("game/SET_GAME_COMPLETED_STATE", true);
    }
  },
  computed: {
    keymap() {
      return {
        'space': {
          keydown: this.rollDice
        }
      }
    },

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
.modal {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  padding: 1em;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  padding-top: calc(2em + 10vw);
}

.modal-inner {
  background-color: white;
  display: flex;
  flex-direction: column;
  align-self: baseline;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
.modal-content {
  padding: 1em;
}
.modal-upper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  margin: 0;
  margin-left: 0.5em;
  font-size: 1.1em;
  font-weight: 600;
}

.modal-buttons {
  display: flex;
}

.crossButton {
  background-color: transparent;
  color: black;
  padding: 0;
  margin: 0;
  border: 0;
  box-shadow: none;
  min-width: unset;
  padding: 0.5em;
  font-size: 1.1em;
  cursor: pointer;
  width: 2.5em;
  height: 2.5em;
  text-align: center;
}

.yatzyButton.warning {
  background-color: hsla(0, 49%, 46%, 1);
  box-shadow: 0 5px#6a2323;
}

.yatzyButton.warning:hover {
  background-color: hsl(0, 46%, 40%);
}

.yatzyButton.warning:active {
  transform: translateY(2px);
  box-shadow: 0 3px #6a2323;
}

.yatzyButton.warning.locked {
  transform: translateY(2px);
  box-shadow: 0 3px #6a2323;
  background-color: hsl(0, 46%, 35%);
  color: hsl(0, 23%, 57%);
}

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
  height: 7em;
  align-items: flex-end;
}

.stop-game-buttons {
  display: flex;
  flex-wrap: wrap;
  height: 7em;
  align-items: flex-end;
  justify-content: flex-end;
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
