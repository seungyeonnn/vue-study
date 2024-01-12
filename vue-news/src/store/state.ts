import { NewsItem } from "@/api";

const state = {
  news: [] as NewsItem[],
};

// news: [] as NewsItem[] 을 그대로 state에 넣을 거야
type RootState = typeof state;

export { state, RootState };
