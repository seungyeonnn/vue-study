/* eslint-disable @typescript-eslint/no-namespace */
export namespace VueEvent {
  // interface에 제네릭 넘기기 -> input에 <T>
  // 그냥 이렇게만 넘기면 error!
  // 이미 EventTarget에 정의 되어 있는 target의 속성 타입과 호환 되어야 함!
  // 그래서 extends EventTarget 넣어주기
  export interface Input<T extends EventTarget> extends InputEvent {
    target: T;
  }

  //   키보드 이벤트도 할 수 o!
  export interface Keyboard<T extends EventTarget> extends KeyboardEvent {
    target: T;
  }
}
