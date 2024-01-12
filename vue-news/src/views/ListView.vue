<template>
  <div>
    <!-- 
      items로 props newsItems 내려주기 
      type은 interface로 정의한 NewsItem[]
    -->
    <ListItem :items="newsItems"></ListItem>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { fetchNews, NewsItem } from "@/api";
import ListItem from "../components/ListItem.vue";

export default Vue.extend({
  components: {
    ListItem,
  },
  data() {
    return {
      // 밑의 response.data와 type 맞춰주깅
      newsItems: [] as NewsItem[],
    };
  },
  methods: {
    // api의 index.ts의 fetchNews 호출하기
    // async, await
    // async의 기본적인 return 값은 promise
    // -> async로 비동기처리 하는 데 있어서 실수 방지 o, 사용 하는 게 좋음
    async fetchNewsItems() {
      // fetchNews에 대한 결과를 response로 받아올게
      const response = await fetchNews();
      this.newsItems = response.data;
    },
  },
  // ListView 컴포넌트가 생성되자 마자 fetchNewsItems(API) 호출
  // 데이터를 newsItems에 넣음
  created() {
    this.fetchNewsItems();
  },
});
</script>

<style></style>
