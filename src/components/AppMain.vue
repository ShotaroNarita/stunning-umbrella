<template>
    <div>
        <p>canvas here</p>
        <canvas id="maincanvas" width="900" height="600"></canvas>

        <p>
            theta1:
            <input type="range" v-model="theta1" min="0" max="360" />
        </p>

        <p>
            theta2:
            <input type="range" v-model="theta2" min="0" max="360" />
        </p>

        <p>
            theta3:
            <input type="range" v-model="theta3" min="0" max="360" />
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
        };
    },

    mounted() {
        this.$store.dispatch("init");
        this.$store.dispatch("update", {
            theta1: 1,
            theta2: 0,
            theta3: 0,
        });
    },

    methods: {
        update() {
            this.$store.dispatch("update", {
                theta1: (this.theta1 / 180) * Math.PI,
                theta2: (this.theta2 / 180) * Math.PI,
                theta3: (this.theta3 / 180) * Math.PI,
            });
        },
    },

    watch: {
        theta1: function () {
            this.update();
        },

        theta2: function () {
            this.update();
        },

        theta3: function () {
            this.update();
        },
    },
});
</script>