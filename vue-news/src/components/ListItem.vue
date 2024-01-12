<!-- 
  ListItem.vue
  - router로 불러와서 데이터가 준비 되면 해당 ListItems.vue의 데이터와 연결 
  - router에 들어가기 전에 데이터를 준비하기 위해 store(상태관리)에 
    데이터를 담아 놓고 front에서 가져오는 구조
-->
<template>
  <ul class="news-list">
    <li v-for="news in items" :key="news.id" class="post">
      <div class="points">
        {{ news.points || 0 }}
      </div>
      <div>
        <p class="news-title">
          <template v-if="news.domain">
            <a :href="news.url">{{ news.title }}</a
            ><small class="link-text" v-if="news.domain"
              >({{ news.domain }})</small
            >
          </template>
          <template v-else>
            <router-link :to="`/item/${news.id}`">{{ news.title }}</router-link
            ><small
              ><a class="link-text" :href="news.domain" v-if="news.domain"
                >({{ news.domain }})</a
              ></small
            >
          </template>
        </p>
        <small v-if="news.user" class="link-text">
          by
          <router-link :to="`/user/${news.user}`" class="link-text">{{
            news.user
          }}</router-link>
        </small>
        <small v-if="news.time_ago" class="link-text">
          {{ timeAgo(news) }}
        </small>
      </div>
    </li>
  </ul>
</template>
<script lang="ts">
import { NewsItem } from "@/api";
import Vue, { PropType } from "vue";
export default Vue.extend({
  props: {
    items: {
      type: Array as PropType<NewsItem[]>,
      required: true,
    },
  },
  methods: {
    timeAgo(news: NewsItem): string {
      return news.time_ago.concat(", 2021");
    },
  },
  // computed 많이 활용하기
  // template에서 연산식이 늘어나거나 조건식이 늘어났을 때 state 레벨에서 디버깅 가능
  // computed를 쓰면서 template을 간결하게 가져가기
  computed: {
    // timeAgo(): string {
    //   return this.items[0].time_ago.concat();
    // },
    listItems(): any {
      // state에 있는 값 가져와서 넣어줄게~
      return this.$store.getters.fetchedList;
    },
  },
});
</script>

<style scoped>
.news-list {
  padding: 0;
  margin: 0;
}
.post {
  list-style: none;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
}
.points {
  width: 80px;
  height: 60px;
  color: #42b883;
  display: flex;
  align-items: center;
  justify-content: center;
}
.link-text {
  color: #828282;
}
.news-title {
  margin: 0;
}
</style>
