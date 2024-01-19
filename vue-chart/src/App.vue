<template>
  <div><canvas id="myChart" ref="mychart"></canvas></div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from "vue";
import { MyVueRefs } from "./types/index";
// import { Chart } from "chart.js";

// Vue.extend -> Vue의 타입이 내부적으로 추론
// 아래 얘는 constructor 안에 제네릭으로 vue와 ref 합집합의 타입을 넣을게~
// Vue 안에 ref의 타입을 key string? 뿐만 아니라 my: ~element라는 타입까지 확장돼서 추론될 수 있게 정의한 것
export default (Vue as MyVueRefs<{ myChart: HTMLCanvasElement }>).extend({
  methods: {
    sayHi() {
      this.$refs.my;
      const canvasElement = this.$refs.myChart;
    },
  },
  mounted() {
    // const canvasElement = document.getElementById(
    //   "myChart"
    // ) as HTMLCanvasElement;
    const canvasElement = this.$refs.myChart;
    // 여기서의 ctx : canvas이거나 null이라는 2가지의 타입을 가짐
    const ctx = canvasElement.getContext("2d");

    // 여기를 통과하면서 null인 ctx는 리턴 시켜버림
    if (!ctx) {
      return;
    }

    // 여기서 ctx는 null이 아닌 애들만 남지롱
    const chart = new this.$_Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  },
});
</script>

<style scoped></style>
