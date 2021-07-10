<template>
    <div>
        <canvas id="maincanvas" width="900" height="600"></canvas>

        <p>
            position x:
            <input type="range" v-model="position_x" min="-300" max="300" />
        </p>

        <p>
            position y:
            <input type="range" v-model="position_y" min="20" max="300" />
        </p>

        <p>
            position z:
            <input type="range" v-model="position_z" min="-300" max="300" />
        </p>

        <p>
            <button class="button is-light" @click="go">solve</button>
        </p>

        <hr />

        <p>
            theta1:
            <input type="range" v-model="theta1" min="0" max="360" />
        </p>

        <p>
            theta2:
            <input type="range" v-model="theta2" min="0" max="360" step="1" />
        </p>

        <p>
            theta3:
            <input type="range" v-model="theta3" min="0" max="360" />
        </p>

        <p>
            <button class="button is-light" @click="update">rotate</button>
        </p>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    data() {
        return {
            message: "hello",
            theta1: 0,
            theta2: 0,
            theta3: 0,

            position_x: 100,
            position_y: 100,
            position_z: 100,
        };
    },

    mounted() {
        this.$store.dispatch("init");
    },

    methods: {
        update() {
            this.$store.dispatch("update", {
                theta1: (this.theta1 / 180) * Math.PI,
                theta2: (this.theta2 / 180) * Math.PI,
                theta3: (this.theta3 / 180) * Math.PI,
            });
        },

        solve() {
            this.$store.dispatch("solve", {
                x: this.position_x,
                y: this.position_y,
                z: this.position_z,
            });
        },

        go() {
            this.$store.dispatch("go", {
                x: this.position_x,
                y: this.position_y,
                z: this.position_z,
            });
        },
    },

    watch: {
        position_x: function () {
            this.$store.dispatch("solve", {
                x: this.position_x,
                y: this.position_y,
                z: this.position_z,
            });
        },

        position_y: function () {
            this.$store.dispatch("solve", {
                x: this.position_x,
                y: this.position_y,
                z: this.position_z,
            });
        },

        position_z: function () {
            this.$store.dispatch("solve", {
                x: this.position_x,
                y: this.position_y,
                z: this.position_z,
            });
        },
    },
});
</script>

<style>
@import "~/node_modules/bulma/css/bulma.css";
</style>