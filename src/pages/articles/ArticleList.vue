<template>
  <v-container>
    <v-text-field
      v-model="search"
      label="Search"
      variant="solo-filled"
    ></v-text-field>
  </v-container>
  <v-container>
    <v-data-iterator :items="filteredArticles" :page="page">
      <template v-slot:default="{ items }">
        <template v-for="(item, i) in items" :key="i">
          <v-card v-bind="item.raw" @click="checkOut(item)"></v-card>

          <br />
        </template>
      </template>
      <template v-slot:footer="{ pageCount }">
        <v-pagination v-model="page" :length="pageCount"></v-pagination>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { getPageBlocks } from 'vue-notion';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const articles = ref([]);
const page = ref(1);
const search = ref('');

const checkOut = (article) => {
  router.push({ path: `${route.path}/${article.value}` });
};

const filteredArticles = computed(() => {
  const searchRegex = new RegExp(search.value.trim(), 'i');
  return articles.value.filter((article) => searchRegex.test(article.title));
});

onMounted(async () => {
  const blockMap = await getPageBlocks('3fed88e8089b4c3ba6defa2b16127a91');
  const blocks = Object.values(blockMap).slice(1);

  blocks.forEach((block) => {
    const title = block.value.properties?.title
      ?.map((item) => item[0])
      .join('');
    const id = block.value.id;
    const subtitle = new Date(block.value.created_time).toLocaleString();

    if (title) {
      articles.value.push({ id, title, subtitle });
    }
  });
});
</script>
