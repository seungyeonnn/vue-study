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
