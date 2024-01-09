<template>
  <div>
    <header><h1>Vue todo with TypeScript</h1></header>
    <main>
      <!-- :item이라는 이름의 props로 전달할게! -->
      <TodoInput
        :item="todoText"
        @input="updateTodoText"
        @add="addTodoItem"
      ></TodoInput>
      <div>
        <ul>
          <TodoListItem
            v-for="(todoItem, index) in todoItems"
            :key="index"
            :todoItem="todoItem"
            :index="index"
            @toggle="toggleTodoItemComplete"
            @remove="removeTodoItem"
          ></TodoListItem>
        </ul>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TodoInput from "./components/TodoInput.vue";
import TodoListItem from "./components/TodoListItem.vue";

// localStorage.getItem 해서 가져올 key 값
const STORAGE_KEY = "vue-todo-ts-v1";
const storage = {
  save(todoItems: Todo[]) {
    // 배열 -> 문자열 된 것을 setItem에 그대로 넣게 됨
    const parsed = JSON.stringify(todoItems);
    // stoarge_key에 저장
    localStorage.setItem(STORAGE_KEY, parsed);
  },
  // fetch method -> return type은 Todo[]
  // storage.fetch를 하면 localStorage에 있는 데이터를 불러와서
  // component에서 쓸 수 o 상태 변환해 주는 기능
  fetch(): Todo[] {
    // STORAGE_KEY를 가지고 값들을 가져올거야 없다면 빈 배열을 줄게
    const todoItems = localStorage.getItem(STORAGE_KEY) || "[]";
    // 가져온 item 변환해 줄게 (JSON.parse로 배열 -> 객체)
    const result = JSON.parse(todoItems);
    return result;
  },
};

// interface: 객체를 위한 type
// export로 모듈화해서 내보내줘야 다른 곳에서도 사용할 수 o
export interface Todo {
  title: string;
  done: boolean;
}

export default Vue.extend({
  components: { TodoInput, TodoListItem },
  data() {
    return {
      todoText: "",
      // todoItems는 위에서 정의한 interface가 배열로 들어오는 거야!
      // type 정의 시, as를 사용해서 initialize
      todoItems: [] as Todo[],
    };
  },
  // 자식 컴포넌트에서 input으로 보내준 값이 updateTodoText 메서드를 통해 value로 들어오게 됨
  // 그리고 그 값은 todoText의 값을 갱신해줌 -> TodoInput의 :item="todoText" 값을 업데이트
  methods: {
    updateTodoText(value: string) {
      this.todoText = value;
    },
    addTodoItem() {
      // input에 입력할 때마다 바뀌는 todoText 값이 위에서 이미 관리 되고 있기 때문에
      // 값을 value에 저장해서 얘를 localStorage에 저장해주는 역할
      const value = this.todoText;
      // 아래 push에 들어갈 type
      const todo: Todo = {
        title: value, // this.todoText로 가져온 value를 title에 엮어주기
        done: false, // 완료 유무의 초기 값은 false
      };
      // todoItems 라는 배열에 value 값을 넣어줄게
      this.todoItems.push(todo);
      storage.save(this.todoItems);
      // localStorage.setItem(value, value); // key, value를 같은 형태로 저장
      // initTodoText 함수를 불러와서 input창 비워주기
      this.initTodoText();
    },
    // todoText를 초기화 해주는 메서드
    initTodoText() {
      this.todoText = "";
    },
    fetchTodoItems() {
      // storage의 fetch를 호출할게
      // fetch의 결과에 sort API 사용하기
      this.todoItems = storage.fetch().sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
    },
    removeTodoItem(index: number) {
      console.log("remove", index);
      // splice로 index부터 시작해서 1개 지울게
      this.todoItems.splice(index, 1);
      storage.save(this.todoItems);
    },
    // toggle 이벤트 발생 시, 상태가 index로 넘어옴
    toggleTodoItemComplete(todoItem: Todo, index: number) {
      this.todoItems.splice(index, 1, {
        ...todoItem,
        // 기존에 있었던 값을 전처리
        done: !todoItem.done, // 기존의 상태를 T/F로 변경
      });
      // 배열 업데이트 후 storage에 저장
      storage.save(this.todoItems);
    },
  },
  // created
  // 인스턴스가 작성된 후 동기적으로 호출
  // 부모, 자식 관계의 컴포넌트가 렌더링 될 때 mounted보다 먼저 호출
  // 부모 -> 자식 순으로 실행
  created() {
    // 인스턴스 생성 되자마자 fetchTodoItems 실행
    this.fetchTodoItems();
  },
});
</script>

<style scoped></style>
