<template>
  <div><canvas id="myChart"></canvas></div>
</template>

<script lang="ts">
import Vue from "vue";
// import { Chart } from "chart.js";

export default Vue.extend({
  mounted() {
    const canvasElement = document.getElementById(
      "myChart"
    ) as HTMLCanvasElement;
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
