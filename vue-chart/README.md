## 외부 라이브러리 타입 정의

```
npm i @types/라이브러리 이름
```

 <br />

> @types 라이브러리가 제공되지 않는 경우

1. src/types/project.d.ts

   ```
   declare module "라이브러리 이름"
   ```

2. 라이브러리 속성
   일단 any로 시작해서 라이브러리의 실행이 보장되도록!<br/>
   근데 커뮤니티에서 타입 정의 제공하지 않는 경우 개인적으로 해주기
   ```
   declare module "vue/types/vue"{
      interface Vue {
          $_chart: any
      }
   }
   ```
   <br /> <br />

## ref 속성

ref: 특정 DOM이나 컴포넌트의 정보를 접근하기 위해 사용 <br />

```vue
<div ref="my"></div>

<script>
new Vue({
  mounted() {
    console.log(this.$refs.my);
  },
});
</script>
```

div에 ref라는 속성을 달았을 때 <br />
컴포넌트 인스턴스 안에서 this.$refs 안에 템플릿에서 정의 했던 ref 속성에 접근 o

<br />

```vue
<template>
  <div><canvas id="myChart" ref="mychart"></canvas></div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  mounted() {
    // const canvasElement = document.getElementById(
    //   "myChart"
    // ) as HTMLCanvasElement;
    // ref를 사용하면 기존에 이 코드를 아래 쪽 코드처럼 쓸 수 있음
    // 근데 매번 as ~로 타입 지정을 해줘야함
    const canvasElement = this.$refs.myChart as HTMLCanvasElement;
    const ctx = canvasElement.getContext("2d");
  },
});
</script>
```

-> 얘를 매번 접근해서 as로 가져오는게 아닌 추론하게 하려면 <br/>
intersection 이용!

```vue
<script>
  export default (
  // Vue.extend -> Vue의 타입이 내부적으로 추론
  // 아래 얘는 constructor 안에 제네릭으로 vue와 ref 합집합의 타입을 넣을게~
  // Vue 안에 ref의 타입을 key string? 뿐만 아니라 my: ~element라는 타입까지 확장돼서 추론될 수 있게 정의한 것
  Vue as VueConstructor<Vue & { $refs: { myChart: HTMLCanvasElement } }>
).extend({
  methods: {
    sayHi() {
      this.$refs.my;
      //const canvasElement = this.$refs.myChart as HTMLCanvasElement
      // 여기서 as 지워도 myChart를 추론할 수 있게됨!
      const canvasElement = this.$refs.myChart;
    },
  },
</script>
```

- ref 속성 타입 정의 방법

  ```vue
  <template>
    <!--  template에 ref 속성 정의하기  -->
    <div ref="my"></div>
  </template>

  <script>
  export default (Vue as VueConstructor<
  // intersection을 이용해서 vue와 reference를 같이 처리
  // Vue2에서는 ref 속성에 대한 추가적인 속성이 추론 될 수 있게 타입 구조가 잡히지 x
  // 그래서 내부적으로 정의된 타입을 밖 컴포넌트에서 확장해서 쓰는 방식으로 사용
  Vue & { $refs: { my: HTMLDivElement } }
  >).extend({
  mounted() {
    this.$refs.my; // HTMLDivElement
  }
  });
  </script>
  ```

  위 형태를 매번 정의하기 번거로운 경우 매개타입을 통해 제네릭을 만들어서 반복을 줄일 수 ㅇ

  ```vue
  <script>
  // src/types.ts
  type MyVue<T> = VueConstructor<Vue & T>;
  type MyVueRefs<T> = VueConstructor<Vue & { $refs: T }>;

  // App.vue
  export default (Vue as MyVueRefs<{ my: HTMLDivElement }>).extend({
    mounted() {
      this.$refs.my; // HTMLDivElement
    }
  });
  </script>
  ```

  직접 적용하깅

  ````vue
  <script>


    // src>types>index.ts 만들기
    type MyVue<T> = VueConstructor<Vue & T>;
    type MyVueRefs<T> = VueConstructor<Vue & { $refs: T }>;


  // App.vue
  //  ref속성, 타입 넣어주는 것 말고는 위 코드가 매 컴포넌트 마다 계속 반복되니까
  // 이걸 그대로 타입으로 뽑아 낸 코드가 위에 칭구!
    export default (
      Vue as VueConstructor<Vue & { $refs: ref속성, 타입 }>
  )

  // -> 얘에 적용을 해보면
  // ref 속성, 타입 빼고는 그대로 들어온 것
  // <> 안에 컴포넌트 안에서 사용될 reference 타입만 계속 정의해 주면 됨 ({ myChart: HTMLCanvasElement })
  import { MyVueRefs } from "./types/index";
  ...
  export default (Vue as MyVueRefs<{ myChart: HTMLCanvasElement }>).extend({...})
  </script>
  ```
  ````
