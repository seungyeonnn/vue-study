<template>
  <li>
    <span class="item" :class="todoItemClass" @click="toggleItem">
      <!-- todoItem.done에 done이 있으면 complete 없으면 null -->
      {{ todoItem.title }}
    </span>
    <button @click="removeItem">delete</button>
  </li>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Todo } from "@/App.vue";

export default Vue.extend({
  props: {
    todoItem: Object as PropType<Todo>, // PropType에는 내가 원하는 type 지정 o
    index: Number,
  },
  // class
  computed: {
    // Vue.extend 문법을 썼을 때, computed의 특정 클래스
    // return 값의 타입은 반드시 지정!
    todoItemClass(): string | null {
      return this.todoItem.done ? "complete" : null;
    },
  },
  methods: {
    toggleItem() {
      // 클릭한 listItem text 보냄
      this.$emit("toggle", this.todoItem, this.index);
    },
    removeItem() {
      this.$emit("remove", this.index);
    },
  },
});
</script>

<style scoped>
.item {
  cursor: pointer;
}
.complete {
  text-decoration: line-through;
}
</style>
