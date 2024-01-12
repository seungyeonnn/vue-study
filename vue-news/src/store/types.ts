import { CommitOptions, DispatchOptions, Store } from "vuex";
import { Mutations } from "./mutations";
import { RootState } from "./state";
import { Actions } from "./actions";
import { Getters } from "./getters";

type MyMutations = {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
};

type MyActions = {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
};

type MyGetters = {
  getters: {
    /*
       [K in keyof Getters] -> mapped type
       반복문 형태로 Getters의 속성 중 key만 뽑아낼게~
       한 개면 하나의 string, 여러 개면 여러개의 union으로 들어옴
      ReturnType<Getters[K]>
      key를 뽑아낸 다음에 key에 해당하는 속성함수의 반환 타입을 key value 형태로 매칭
      key: [K in keyof Getters] (속성함수 이름)
      value : ReturnType<Getters[K]> (반환 타입)
    */
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
};

/* 
types.ts에서 내보내는 type은 MyStore라는 타입
 Omit<Store<RootState>, "commit"> & MyMutations
 -> &: 앞에 있는 타입과 뒤에 있는 타입을 합칠게

Omit<Store<RootState>, "commit"> <br />
-> Store에서 commit만 빼고 다 가져올게~ <br />
MyMutations <br />
->프로젝트에서 정의한 mutation들의 타입
<br />
commit에 대해 프로젝트 내에서 재정의가 가능 <br />
Vuex의 mutations 타입만 따로 갈아끼워줄 수 o
*/
// export type MyStore = Omit<Store<RootState>, "commit"> & MyMutations;

// Omit으로 commit, dispatch 빼줄게
// 요기에 intersection으로 dispatch와 commit에 대한 타입 재정의
export type MyStore = Omit<Store<RootState>, "commit | dispatch" | "getters"> &
  MyMutations &
  MyActions &
  MyGetters;
