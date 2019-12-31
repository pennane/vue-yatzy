import Vue from 'vue';

const state = {
    amountOfPlayers: 2,
    currentPlayer: null,
    dice: [null, null, null, null, null],
    players: null,
    selectedDice: [false, false, false, false, false],
    moves: null,
    scores: null,
    totalLowScores: null,
    totalScores: null,
    bonusScores: null,
    rolling: false,
    displayDice: null,
    gameCompleted: null,
    noGameStarted: true,
    matching: null,
    categories: null
};

const getters = {
    getSelectedDice(state) {
        return state.selectedDice
    },
    getAmountOfPlayers(state) {
        return state.amountOfPlayers
    },
    getDice(state) {
        return state.dice
    },
    getCurrentPlayer(state) {
        return state.currentPlayer
    },
    getMatching: (state) => {
        return state.matching
    },
    getMoves: (state) => {
        return state.moves
    },
    getCurrentlyRolling: (state) => {
        return state.rolling
    },
    getDisplayDice: (state) => {
        return state.displayDice
    },
    getNoGameStarted: (state) => {
        return state.noGameStarted
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
    getScores: (state) => {
        return state.scores
    },
    getScore: (state) => (index) => state.scores[index],
    getGameCompleted: (state) => {
        return state.gameCompleted
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
};

const mutations = {
    START_NEW_GAME(state, payload) {
        Vue.set(state, "amountOfPlayers", payload.amountOfPlayers)
        Vue.set(state, "players", payload.players)
        Vue.set(state, "currentPlayer", payload.startingPlayer)
        Vue.set(state, "dice", payload.dice)
        Vue.set(state, "selectedDice", payload.selectedDice)
        Vue.set(state, "moves", payload.moves)
        Vue.set(state, "displayDice", payload.displayDice)
        Vue.set(state, "gameCompleted", payload.gameCompleted)
        Vue.set(state, "scores", payload.scores)
        Vue.set(state, "totalLowScores", payload.scores)
        Vue.set(state, "totalScores", payload.scores)
        Vue.set(state, "bonusScores", payload.scores)
        Vue.set(state, "noGameStarted", payload.noGameStarted)
        Vue.set(state, "categories", payload.categories)
    },
    NEXT_TURN(state, payload) {
        Vue.set(state, "currentPlayer", payload.player);
        Vue.set(state, "displayDice", payload.displayDice)
        Vue.set(state, "selectedDice", payload.selectedDice)
        Vue.set(state, "moves", payload.moves)
        Vue.set(state, "matching", payload.matched)
    },
    UPDATE_SCORE_FOR_PLAYER(state, payload) {
        if (!state.scores[payload.id]) {
            state.scores[payload.id] = []
        }
        let currentPlayer = state.currentPlayer
        state.scores[payload.id][currentPlayer] = payload.score
    },
    SET_DICE(state, payload) {
        Vue.set(state, "dice", payload.dice)
    },
    SET_SELECTED_DICE(state, payload) {
        Vue.set(state, "selectedDice", payload.selectedDice)
    },
    SELECT_DIE(state, payload) {
        Vue.set(state.selectedDice, payload.index, true)
    },
    UNSELECT_DIE(state, payload) {
        Vue.set(state.selectedDice, payload.index, false)
    },
    SET_MATCHING(state, payload) {
        Vue.set(state, "matching", payload.matching);
    },
    SET_MOVES(state, payload) {
        Vue.set(state, "moves", payload.moves)
    },
    SET_ROLLING_STATE(state, payload) {
        Vue.set(state, "rolling", payload.rolling)
    },
    SET_DISPLAY_DICE_STATE(state, payload) {
        Vue.set(state, "displayDice", payload.state)
    },
    SET_TOTAL_LOW_SCORES(state, payload) {
        Vue.set(state, "totalLowScores", payload.scores)
    },
    SET_TOTAL_SCORES(state, payload) {
        Vue.set(state, "totalScores", payload.scores)
    },
    SET_BONUS_SCORES(state, payload) {
        Vue.set(state, "bonusScores", payload.scores)
    },
    SET_GAME_COMPLETED_STATE(state, bool) {
        Vue.set(state, "gameCompleted", bool)
    },
    SET_NO_GAME_STARTED(state, bool) {
        Vue.set(state, "noGameStarted", bool)
    }
};

const module = {
    namespaced: true,
    state,
    getters,
    mutations
};

export default module;