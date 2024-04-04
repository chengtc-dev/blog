<template>
  <div>
    <v-container>
      <v-row align="center" justify="center">
        <v-col v-for="article in articles" :key="article.id" cols="auto">
          <base-card :article @click="checkOut(article)"></base-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import BaseCard from '../../components/ui/BaseCard.vue';
import { ref, onMounted } from 'vue';
import { getPageBlocks } from 'vue-notion';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const blockMap = ref(null);
const articles = ref([]);

const checkOut = (article) => {
  router.push({ path: `${route.path}/${article.id}` });
};

onMounted(async () => {
  // get Notion blocks from the API via a Notion pageId
  blockMap.value = await getPageBlocks('3fed88e8089b4c3ba6defa2b16127a91');
  blockMap.value = Object.values(blockMap.value).slice(1);

  for (const pageId in blockMap.value) {
    const title = blockMap.value[pageId].value.properties?.title[0][0];
    const id = blockMap.value[pageId].value.id;
    const createdTime = new Date(
      blockMap.value[pageId].value.created_time
    ).toLocaleString();
    const pageCover = blockMap.value[pageId].value.format?.page_cover;

    articles.value.push({
      id: id,
      title: title,
      createdTime: createdTime,
      pageCover: pageCover,
    });
  }
});
</script>
