import Vue, { VueConstructor } from "vue";

type MyVue<T> = VueConstructor<Vue & T>;
export type MyVueRefs<T> = VueConstructor<Vue & { $refs: T }>;
