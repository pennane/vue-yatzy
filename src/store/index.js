import Vue from 'vue';
import Vuex from 'vuex';

import defaultData from './modules/defaultData'
import game from './modules/game';

const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    defaultData,
    game
  },
  strict: debug
});