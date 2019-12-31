import Vue from 'vue';

const state = {
    defaultAmountOfPlayers: null,
    categories: null
};

const getters = {
    getCategories(state) {
        return state.categories
    },
    getAmountOfPlayers(state) {
        return state.defaultAmoutOfPlayers
    },
    getCategory: (state) => (index) => state.categories[index]
};

const mutations = {
    SET_DEFAULT_DATA(state, payload) {
        Vue.set(state, "categories", payload.categories);
        Vue.set(state, "defaultAmountOfPlayers", payload.defaultAmountOfPlayers)
    }
};

const module = {
    namespaced: true,
    state,
    getters,
    mutations
};

export default module;