import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    amountOfPlayers: null,
    categories: [],
    currentPlayer: null,
    dice: [null, null, null, null, null],
    players: [],
    selectedDice: [false, false, false, false, false],
    moves: null,
    scores: [],
    totalLowScores: [],
    totalScores: [],
    bonusScores: [],
    rolling: false,
    displayDice: null,
    gameCompleted: null
  },
  mutations: {
    newGame(state, payload) {
      Vue.set(state, "categories", payload.categories)
      state.amountOfPlayers = payload.amountOfPlayers;
      state.players = payload.players;
      state.currentPlayer = payload.startingPlayer
      Vue.set(state, "dice", payload.dice)
      Vue.set(state, "selectedDice", payload.selectedDice)
      Vue.set(state, "moves", payload.moves)
      Vue.set(state, "displayDice", payload.displayDice)
      Vue.set(state, "gameCompleted", payload.gameCompleted)
      Vue.set(state, "scores", payload.scores)
      Vue.set(state, "totalLowScores", payload.scores)
      Vue.set(state, "totalScores", payload.scores)
      Vue.set(state, "bonusScores", payload.scores)
    },
    nextTurn(state, payload) {
      Vue.set(state, "currentPlayer", payload.player);
      Vue.set(state, "displayDice", payload.displayDice)
      Vue.set(state, "selectedDice", payload.selectedDice)
      Vue.set(state, "moves", payload.moves)
      Vue.set(state, "matching", payload.matched)
    },
    setCurrentPlayer(state, payload) {
      state.currentPlayer = payload.player
    },
    updateScoreForPlayer(state, payload) {
      if (!state.scores[payload.id]) {
        state.scores[payload.id] = []
      }
      let currentPlayer = state.currentPlayer
      state.scores[payload.id][currentPlayer] = payload.score
    },
    setDice(state, payload) {
      Vue.set(state, "dice", payload.dice)
    },
    setSelectedDice(state, payload) {
      Vue.set(state, "selectedDice", payload.selectedDice)
    },
    selectDie(state, payload) {
      Vue.set(state.selectedDice, payload.index, true)
    },
    unselectDie(state, payload) {
      Vue.set(state.selectedDice, payload.index, false)
    },
    setMatching(state, payload) {
      Vue.set(state, "matching", payload.matching);
    },
    setMoves(state, payload) {
      Vue.set(state, "moves", payload.moves)
    },
    rolling(state, payload) {
      Vue.set(state, "rolling", payload.rolling)
    },
    displayDice(state, payload) {
      Vue.set(state, "displayDice", payload.state)
    },
    setTotalLowScores(state, payload) {
      Vue.set(state, "totalLowScores", payload.scores)
    },
    setTotalScores(state, payload) {
      Vue.set(state, "totalScores", payload.scores)
    },
    setBonusScores(state, payload) {
      Vue.set(state, "bonusScores", payload.scores)
    },
    gameCompleted(state, bool) {
      Vue.set(state, "gameCompleted", bool)
    }
  },
  getters: {
    selectedDice(state) {
      return state.selectedDice
    },
    amountOfPlayers(state) {
      return state.amountOfPlayers
    },
    getDice(state) {
      return state.dice
    },
    categories(state) {
      return state.categories
    },
    currentPlayer(state) {
      return state.currentPlayer
    },
    matching: (state) => {
      return state.matching
    },
    moves: (state) => {
      return state.moves
    },
    currentlyRolling: (state) => {
      return state.rolling
    },
    "die0": (state) => {
      return state.dice[0]
    },
    "die1": (state) => {
      return state.dice[1]
    },
    "die2": (state) => {
      return state.dice[2]
    },
    "die3": (state) => {
      return state.dice[3]
    },
    "die4": (state) => {
      return state.dice[4]
    },
    displayDice: (state) => {
      return state.displayDice
    },
    getTotalLowScores: (state) => {
      return state.totalLowScores
    },
    getTotalScores: (state) => {
      return state.totalScores
    },
    getBonusScores: (state) => {
      return state.bonusScores
    },
    getCategory: (state) => (index) => state.categories[index],
    getScore: (state) => (index) => state.scores[index],
    getScores: (state) => {
      return state.scores
    },
    gameCompleted: (state) => {
      return state.gameCompleted
    }
  },
  actions: {
  },
  modules: {
  },
});