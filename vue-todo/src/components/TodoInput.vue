<template>
  <div>
    <label for="todo-input">오늘 할 일: </label>
    <!-- input에 입력될 값을 가져올 @input이벤트 핸들러로 handleInput 가져오기 -->
    <input id="todo-input" type="text" :value="item" @input="handleInput" />
    <button @click="addTodo" type="button">add</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  // props : ["item"], item이라는 props를 받을 준비 완료~
  props: {
    item: {
      type: String,
      // 필수 여부 -> true
      required: true,
    },
  },
  methods: {
    // 키보드 이벤트에서 target.value 가져올게
    handleInput(event: InputEvent) {
      const eventTarget = event.target as HTMLInputElement;
      // $emit : 이벤트와 함께 특정 값을 내보낼 수 있음
      //         input이라는 이름으로 event.target.value 값을 보내줄게!
      this.$emit("input", eventTarget.value);
    },
    // button 클릭 시 addTodo 메소드 실행!
    // $emit을 통해서 부모 컴포넌트에게 add라는 이름의 이벤트 발생
    addTodo() {
      this.$emit("add");
    },
  },
});
</script>

<style scoped></style>
