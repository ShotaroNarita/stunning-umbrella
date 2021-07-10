import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

import { Simulator } from './simulator';

const store = new Vuex.Store({
    state: {
        simulator: new Simulator('maincanvas')
    },

    getters: {
        simulator: (state) => state.simulator,
    },

    actions: {
        init({ state }) {
            state.simulator.init();
        },

        update({ state }, payload) {
            state.simulator.update(payload.theta1, payload.theta2, payload.theta3);
        },

        solve({state}, payload){
            state.simulator.solve(payload.x, payload.y, payload.z);
        },

        go({state}, payload){
            state.simulator.go(payload.x, payload.y, payload.z);
        }
    },
});

export default store;