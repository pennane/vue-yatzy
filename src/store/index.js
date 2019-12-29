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
    scores: []
  },
  mutations: {
    nextTurn(state, payload) {
      Vue.set(state, "currentPlayer", payload.player);
      Vue.set(state, "dice", payload.dice)
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
    setPlayers(state, payload) {
      state.amountOfPlayers = payload.amountOfPlayers;
      state.players = payload.players;
      state.currentPlayer = payload.startingPlayer
    },
    setCategories(state, payload) {
      Vue.set(state, "categories", payload.categories)
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
    getCategory: (state) => (index) => state.categories[index],
    getScore: (state) => (index) => state.scores[index]
  },
  actions: {
  },
  modules: {
  },
});