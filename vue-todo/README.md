# Vue.js TypeScript 프로젝트 생성

### 1. Vue cli로 프로젝트 생성
```vue
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

<br />

# 컴포넌트 간 데이터 전달하기
![image](https://github.com/seungyeonnn/vue-study/assets/42060859/960bbcf1-9bfa-4b73-bf93-861045729144)

<br />

## 1) Props 전달하기 (부모 -> 자식)
1. 부모 컴포넌트에서 자식HTML 태그 안에 넘겨줄 Props 선언 <br />
   **v-bind:key="value"  or  :key="value"** <br />
-  데이터 타입 / default / object 넣어줄 수 o

```vue
props : {
  props명 : {
    type: data type,
    default: () => {
      key1: value1,
      key2: value2,
      ...
    }  
  }
}
```
```vue
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
   
```vue
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

## 2) emit 전달하기 (자식 -> 부모)
1. 자식 컴포넌트 <br />
   **this.$emit("이벤트 이름", 데이터)**
   
  ```vue
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
      // input이라는 이름으로 event.target.value 값을 보내줄게!
      this.$emit("input", event.target.value);
    },
  },
});
</script>
```

<br />
   
2. 부모 컴포넌트의 자식 컴포넌트를 호출하는 부분 <br />
   **@이름 = "JavaScript code"**

```vue
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


## 3) Vuex로 전달하기

<br /><br /><br />

---

<br />

# props 속성 유효성 검사 및 타입 정의

<br />

```vue
methods: {
  handleInput(event: InputEvent) {
    this.$emit("input", event.target.value)
  },
}
```

event의 type: InputEvent <br />
이렇게 하면 evnet.target.value에서 에러를 토해냄🧐<br />
> Object is possibly 'null' <br />
> 객체는 null일수도 있어 null인데 속성 접근하면 안돼! <br />
-> 얘 null 아니야!를 보장해줘야 함 <br />

<br />

```vue
<script>
// 방법 1. ! (non-null assertion type)으로 알려주기
methods: {
  handleInput(event: InputEvent) {
    this.$emit("input", event.target!.value)
  },
}

// 방법 2. event.target이 있는지 검사하고 없는 경우 return
methods: {
  handleInput(event: InputEvent) {
    if (!event.target){
      return
    }
    this.$emit("input", event.target.value)
  },
}

// 근데 이렇게 해도 value가 오류를 토해낼 수 있음

// 방법 3. Type을 지정해주기
methods: {
  handleInput(event: InputEvent) {
    // event.target 타입은 HTMLInputElement니까 TS 너 신경쓰지마
    const eventTarget = event.target as HTMLInputElement
    this.$emit("input", eventTarget.value)
  },
}
</script>
```

<br /> <br /> 

---

<br />

# localStorage

<br />

## input 값 localStorage에 저장하기
### 1. setItem으로 저장

```vue
loaclStorage.setItem('저장할 이름', 저장할 값)
```

```vue
// TodoInput.vue
<template>
  // 버튼에 클릭 이벤트가 적용되면 addTodo라는 메서드 불러줄게
  <button @click="addTodo></button>
</template>
<script>
  methods:{
    addTodo(){
      // 부모 컴포넌트에게 add라는 이름의 이벤트 발생
      this.$emit("add")
    }
  }
</script>
```

```vue
// App.vue
<template>
  // 자식 컴포넌트에서 $emit으로 받아온 add 이벤트가 들어오면
  // addTodoItem 메서드 불러줄게~
  // 자식 컴포넌트에서 $emit으로 @input 값 받아오기 그 값은 updateTodoText로 전달!
  <TodoInput :item="todoText" @input="updateTodoText" @add="addTodoItem"></TodoInput>
...
</template>
<script>
  data: {
    return {
      // 
      todoText: "",
    }
  },
  mehtods: {
    // $emit으로 받아온 값을 value라는 이름으로 가져와서 todoText값으로 갱신해줄게~
    updateTodoText(value: string){
      this.todoText = value
    },
    addTodoItem() {
      // input에 값을 입력할 때마다 바뀌는 todoText 값은 이미 관리 되고 있음
      // 값을 value에 저장해서 localStorage에 저장해줄거야
      const value = this.todoText
      localStorage.setItem(value, value)
      // initTodoText 함수를 불러와서 input 창 비워주기
      this.initTodoText()
    }
    initTodoText(){
      this.todoText = ""
    }
}
</script>
```
<br />

### 2. STORAGE_KEY 활용해서 저장 (save)

```vue
<script>
// localStorage.getItem 해서 가져올 key 값
const STORAGE_KEY = "vue-todo-ts-v1";
const storage = {
  save(todoItems: Todo[]) {
    // 배열 -> 문자열 된 것을 setItem에 그대로 넣게 됨
    const parsed = JSON.stringify(todoItems);
    // stoarge_key에 저장
    localStorage.setItem(STORAGE_KEY, parsed);
  }
};

// interface: 객체를 위한 type
// export로 모듈화해서 내보내줘야 다른 곳에서도 사용할 수 o
export interface Todo {
  title: string;
  done: boolean;
}

export default Vue.extend({
  data() {
    return {
      todoText: "",
      // todoItems는 위에서 정의한 interface가 배열로 들어오는 거야!
      // type 정의 시, as를 사용해서 initialize
      todoItems: [] as Todo[],
    };
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
    
  },
</script>
```

<br />

## localStoarge 값 가져와서 저장하기 (fetch)

```vue
<script>
// localStorage.getItem 해서 가져올 key 값
const STORAGE_KEY = "vue-todo-ts-v1";
const storage = {
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
</script>
```

<br /><br /><br />

---

<br />

# .vue 파일에서의 타입스크립트 정의 방식
  - data
    초기화를 할 때 as Type 을 통해서 어떤 타입인지 정의<br />
    -> 이후 파일 안에서 타입을 벗어나면 error    
    ```vue
    data(){
      return {
        todoText: "",
        todoItems: [] as Todo[]
      }
    }
    ```
    todoItems는 Todo 객체를 갖는 배열

    ```vue
    fetchTodoItems(){
      this.todoItems = 1
    }
    ```
    -> 이렇게 타입에 맞지 않는 애를 넣어주면 너 이거 뭐야 타입 뭐야!! 하고 에러 토해냄😥
    <br />
  - methods
    * 메서드의 반환 타입 정의
      메서드에 return이 없는 경우 알아서 void로 지정 <br />
    ```vue
    fetchTodoItems() {
      return "hi"
    }
    ```
    이렇게 return이 있는 경우 타입을 지정해줌(여기선 string) <br />
    근데 다른 곳에서 타입이 맞지 않는 애를 넣어주면 또 에러 토해줌
    <br />
    * 파라미터 타입 정의
      ```vue
      removeTodoItem(index: number){
        ...
      }
      ```
      메서드를 사용했을 때 원하지 않는 타입이 들어가는 것을 방지 <br />
      
  - props
    ```vue
    <script>
    // JavaScirpt ver
    export default Vue.extend({
      props: {
        item: {
          type: String,
          required: true
        }
      }
    })

    // TypeScript ver
    export default Vue.extend({
      props: {
        // todoItem은 object인데 실제 들어가는 Object의 Type은 Todo
        // 이 Todo 안에는 title과 done이라는 boolean 선택 값이 정의 될 거야~
        todoItem: Object as PropType<Todo>
      }
    })
    </script>
    ```
    -> 이렇게하면 컴포넌트 내부에서 todoItem에 대한 추론이 가능 <br />
    맞지 않는 타입을 넣으면 에러
    <br />
    
  - computed
    메서드와 다르게 꼭 반환타입을 지정해줘야 함! <br />
    그래야 반환 타입에 대해 올바른 추론 값을 받을 수 ㅇ
    





<br /> <br /> <br/>

---

# Vue LifeCylcle
![image](https://github.com/seungyeonnn/vue-study/assets/42060859/de7efde7-22a4-479e-aa85-302eca67e059)

<br />









