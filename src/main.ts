import Vue from 'vue'
import AppMain from './components/AppMain.vue';
import store from './store';

new Vue({
    el: '#app',
    components: { AppMain },
    store,
});