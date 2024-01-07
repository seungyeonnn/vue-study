# 1. Vue 시작하기
## Vue
사용자 인터페이스 구축을 위한 JavaScript Framework

## Progressive Framework
- 빌드 과정 없이 정적 HTML에 적용
- 모든 페이지에 웹 컴포넌트로 추가
- Single Page Application
- FullStack/SSR
- JamStack/SSG(Static-Site-Generation, 정적 사이트 생성)
- 데스크톱, 모바일, WebGL 또는 터미널 대상

    
## Single File Component
- 빌드 도구를 사용하는 대부분의 Vue project에서 HTML과 유사한 Single File Component(SFC, *.vue)
파일 형식을 사용하여 컴포넌트 작성
- Vue SFC
  컴포넌트의 논리(JavaScript), 템플릿(HTML), 스타일(CSS)을 하난의 파일에 캡슐화 함

    
```
<script>
export default {
  data() {
    return {
      count: 0
    }
  }
}
</script>

<template>
  <button @click="count++">숫자 세기: {{ count }}</button>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>
```
=> Vue를 빌드 방식으로 사용하는 경우 컴포넌트 생성, 정의 시 SFC 권장  

  
  
## API 스타일
### 1. 옵션(Option) API
- option API를 사용하여 option의 data, method, mounted 같은 객체를 사용하여 컴포넌트 로직 정의
- option으로 정의된 속성은 컴포넌트 인스턴스를 가리키는 함수 내부의 this에 노출
```
<script>
export default {
  // data()에서 반환된 속성들은 반응적인 상태가 되어 this에 노출
  data() {
    return {
      count: 0
    }
  },

  // methods는 속성 값을 변경하고 업데이트 할 수 있는 함수
  // 템플릿 내에서 이벤트 리스너로 바인딩 됟 수 o
  methods: {
    increment() {
      this.count++
    }
  },

// 생명주기 훅(Lifecycle hooks)은 컴포넌트 생명주기의 여러 단계에서 호출
// 이 함수는 컴포넌트가 마운트 된 후 호출
  mounted() {
    console.log(`숫자 세기의 초기 값은 ${this.count} 입니다.`)
  }
}
</script>

<template>
  <button @click="increment"> 숫자세기: {{ count }}</button>
</template>
```

### 2. 컴포지션(Composition) API
- 컴포지션 API를 사용하는 경우, import 해서 가져온 API 함수들을 사용하여 컴포넌트 로직 정의
- SFC에서 컴포지션 API는 일반적으로 <script setup>과 함께 사용
- setup 속성은 Vue가 더 적은 코드 문맥으로 컴포지션 API를 사용하고, 컴파일 시 의도한 대로 올바르게 동작할 수 있도록 코드를 변환하게 하는 힌트 역할
- <script setup>에 import 되어 가져온 객체들과 선언된 최상위 변수 및 함수는 템플릿에서 직접 사용 가능  

```
<script setup>
  import { ref, onMounted } from 'vue'

  // 반응적인 상태의 속성
  const count = ref(0)

  // 속성 값을 변경하고 업데이트 할 수 있는 함수
  function increment(){
    count.value++
  }

  // 생명주기 훅
  onMounted(() => {
    console.log(`숫자 세기의 초기 값은 ${ count.value } 입니다.`)
  })
</script>

<template>
  <button @click="increment"> 숫자세기: {{ count }} </button>
</template>
```

  
### 3. Option API VS Composition API
동일한 기본 시스템 위에서 구동 되는 서로 다른 인터페이스
-> option API는 composition API 위에서 구현  

- Option API
  OOP 언어 배경을 가진 사용자를 위함
  클래스 기반 모델과 더 잘 맞는 "컴포넌트 인스턴스"(this)의 개념 중심
  반응형 세부 사항을 추상화 하고 옵션 그룹을 통해 코드 구조를 실행하여 초보자에게 더욱 친숙
  
- Composition API
  함수 범위에서 직접 반응형 변수를 선언, 복잡성 처리를 위해 여러 함수의 상태를 함께 구성하는데 중점
  보다 자유로운 형식 but vue에서 반응형이 효과적으로 사용되는 방식에 대한 이해 필요
  
∴ 제품용으로 사용하는 경우,
   빌드 도구 사용x, 복잡성이 낮은 시나리오 -> Option API
   규모가 있는 앱의 전체 구축 -> component API + SFC



# 2. 템플릿 문법
Vue는 컴포넌트 인스턴스의 데이터를 서술적으로 렌더링된 DOM에 바인딩 할 수 있는 HTML 기반 템플릿 문법 사용

## 텍스트 보간법
데이터 바인딩의 가장 기본적인 형태 : "Mustache" (이중 중괄호) 문법
```
<span>메세지: {{ msg }}</span>
```
이중 중괄호 태그 내 msg는 해당 컴포넌트 인스턴스의 msg 속성 값으로 대체, 속성이 변경될 때마다 업데이트

## HTML 출력
이중 중괄호는 데이터를 HTML이 아닌 일반 텍스트로 해석
실제 HTML을 출력하려면 v-html 디렉티브 사용
```
<p>
```






