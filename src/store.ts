import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

import { Simulator } from './simulator';

const store = new Vuex.Store({
    state: {
        simulator: new Simulator('maincanvas')
    },

    actions: {
        init({ state }) {
            state.simulator.init();
        },

        update({ state }, payload) {
            state.simulator.update(payload.theta1, payload.theta2, payload.theta3);
        }
    },
});

export default store;