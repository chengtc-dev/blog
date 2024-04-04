<template>
  <NotionRenderer :blockMap="blockMap" fullPage />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { NotionRenderer, getPageBlocks } from 'vue-notion';
import { useRoute } from 'vue-router';

const route = useRoute();
const blockMap = ref(null);

onMounted(async () => {
  // get Notion blocks from the API via a Notion pageId
  blockMap.value = await getPageBlocks(route.params.id);
});
</script>

<style>
@import 'vue-notion/src/styles.css';
</style>
