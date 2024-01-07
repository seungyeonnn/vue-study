# Vue.js TypeScript 프로젝트 생성

### 1. Vue cli로 프로젝트 생성
```
vue create "project_name"
```
<br /><br />
### 2. 개발 환경 설정
  ![image](https://github.com/seungyeonnn/vue-study/assets/42060859/decbfc05-7da5-49a2-93c7-caf5bda291fe)

  1) preset 설정 어떤걸로 할거야? (preset : 뷰 플러그인의 집합)
  2) 프로젝트에서 사용할 필요한 기능을 골라 -> Babel, TS, Linter 쓸게
  3) Vue 버전 선택 -> 2.x 버전 쓸게
  4) 클래스 컴포넌트 사용할거야? -> 아니
  5) Babel과 TS 같이 쓸거야? -> 웅
  6) linter, formatter 어떤 거 쓸래? -> ESLint, Prettier 쓸게
  7) 추가적인 lint 기능 -> Lint on save
  8) 설정 파일 위치 어떻게 할래? -> 별도의 파일로 분리할게~
  9) 다음 프로젝트를 위해 이 설정들 저장해 놓을래? 아니
<br /><br /><br />
### 3. Vue.js에서 TypeScript 적용하는 방법
  1. 서비스 구축 시, 처음부터 TS 사용 -> option으로 선택해서 TypeScript 기반 프로젝트 생성<br />
  2. 이미 구현된 서비스에 TS 점진적 적용 
<br /><br /><br />
---
<br /><br /><br />
# 컴포넌트 간 데이터 전달하기
![image](https://github.com/seungyeonnn/vue-study/assets/42060859/960bbcf1-9bfa-4b73-bf93-861045729144)

<br />

## Props 전달하기 (부모 -> 자식)
1. 부모 컴포넌트에서 자식HTML 태그 안에 넘겨줄 Props 선언 <br />
   **v-bind:key="value"  or  :key="value"**
  ```
  <div>
    <h1>Vue todo with TypeScript</h1>
    <!-- :item이라는 이름의 props로 전달할게! -->
    <TodoInput :item="todoText"></TodoInput>
  </div>
  ```

<br />

2. 자식 컴포넌트의 script 안에 props 넣어주기 <br />
   props 안에는 data type, default 값, object 넣어줄 수 o <br />
   **props: ['key']**
```
<script lang="ts">
  import Vue from "vue";

  export default Vue.extend({
    // item이라는 props를 받을 준비 완료~
    props: ["item"],

    //
    },
  });
</script>
```
<br /><br /><br />

## emit 전달하기 (자식 -> 부모)
1. 자식 컴포넌트
   **this.$emit("이름", 데이터)**
  ```
<template>
  ...
    <!-- input에 입력될 값을 가져올 @input이벤트 핸들러로 handleInput 가져오기 -->
    <input @input="handleInput" />
  ...
</template>

<script lang="ts">
...
export default Vue.extend({
  methods: {
    // 키보드 이벤트에서 target.value 가져올게
    handleInput(event: any) {
      event.target.value;
      this.$emit("input", event.target.value);
    },
  },
});
</script>
  ```
input이라는 이름으로 event.target.value 값을 보내줄게!
   
2. 부모 컴포넌트의 자식 컴포넌트를 호출하는 부분
   **@이름 = "JavaScript code"**

```
<template>
  ...
    <!-- 자식 컴포넌트에서 받아온 input에 부모 컴포넌트의 메서드 updateTodoText 바인딩 -->
    <TodoInput :item="todoText"  @input="updateTodoText"></TodoInput>
  ...
</template>

<script lang="ts">
  ...
  export default Vue.extend({
    ...
    // 자식 컴포넌트에서 input으로 보내준 값이 updateTodoText 메서드를 통해 value로 들어오게 됨
    // 그리고 그 값은 todoText의 값을 갱신해줌 -> TodoInput의 :item="todoText" 값을 업데이
    methods: {
      updateTodoText(value: any) {
        this.todoText = value;
      },
    },
  });
</script>
```

<br /><br /><br />


## Vuex 전달하기
