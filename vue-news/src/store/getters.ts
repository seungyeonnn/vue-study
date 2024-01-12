import { RootState } from "./state";
/*
  getters -> computed 속성과 mapping이 됨
  컴포넌트에서 computed로 쓸 것들을 store에서 getters로 꺼내면 됨

  * 그럼 getters를 언제 쓸까?
      일반적인 state 접근 시에도 사용? 
      그럴 때는 그냥 굳이 getters로 감싸지 않고
      this.$store.state.news; 사용 추천!
      getters를 가져오기 위해 많은 코드가 생성 됨

      *추가) 컴포넌트에서 state 값 변경 x! mutation을 사용해서 바꿔줘야함
*/

export const getters = {
  fetchedNews(state: RootState) {
    return state.news;
  },
};

export type Getters = typeof getters;

// export default {
//   fetchedItem(state) {
//     return state.item;
//   },
//   fetchedUser(state) {
//     return state.user;
//   },
//   fetchedList(state) {
//     return state.list;
//   },
//   // ItemView
//   userName(state) {
//     return state.item.user;
//   },
//   userContent(state) {
//     return state.item.content;
//   },
//   userQuestion(state) {
//     return state.item.title;
//   },
//   userTimeAgo(state) {
//     return state.item.time_ago;
//   },
//   contentPoints(state) {
//     return state.item.points;
//   },
// };
