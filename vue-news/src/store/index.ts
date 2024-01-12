import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { RootState, state } from "./state";
import { mutations } from "./mutations";
// import getters from "./getters.js";
import { actions } from "./actions";

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  //  state 별도의 파일로 선언 후 가져옴
  state: state,
  mutations: mutations,
  actions: actions,
};
// vuex의 state 정의
export default new Vuex.Store(store);
// export default new Vuex.Store({
//   //   strict: process.env.NODE_ENV !== "production",
//   //   state: {
//   //     news: [],
//   //     ask: [],
//   //     jobs: [],
//   //     user: {},
//   //     item: {},
//   //     list: [],
//   //   },
//   //   getters,
//   //   mutations,
//   //   actions,
// });
