<template>
  <v-container>
    <v-text-field
      v-model="search"
      label="Search"
      variant="solo-filled"
    ></v-text-field>
  </v-container>
  <v-container>
    <v-row align="center" justify="center">
      <v-col v-for="article in filteredArticles" :key="article.id" cols="auto">
        <base-card :article="article" @click="checkOut(article)"></base-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import BaseCard from '../../components/ui/BaseCard.vue';
import { ref, onMounted, computed } from 'vue';
import { getPageBlocks } from 'vue-notion';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const blockMap = ref(null);
const articles = ref([]);
const search = ref('');

const checkOut = (article) => {
  router.push({ path: `${route.path}/${article.id}` });
};

const filteredArticles = computed(() => {
  return articles.value.filter((article) =>
    article.title.toLowerCase().includes(search.value.toLowerCase())
  );
});

onMounted(async () => {
  // get Notion blocks from the API via a Notion pageId
  blockMap.value = await getPageBlocks('3fed88e8089b4c3ba6defa2b16127a91');
  blockMap.value = Object.values(blockMap.value).slice(1);

  for (const block of blockMap.value) {
    const title = block.value.properties?.title[0][0];
    const id = block.value.id;
    const createdTime = new Date(block.value.created_time).toLocaleString();
    const pageCover = block.value.format?.page_cover;

    articles.value.push({
      id: id,
      title: title,
      createdTime: createdTime,
      pageCover: pageCover,
    });
  }
});
</script>
