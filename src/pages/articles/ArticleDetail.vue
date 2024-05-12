<template>
  <NotionRenderer :blockMap="blockMap" fullPage />
  <v-container>
    <section class="comments" aria-labelledby="comment">
      <h2 id="comment">Comments</h2>
      <Disqus shortname="chengtc-dev" />
    </section>
  </v-container>
  <button @click="scrollToTop" class="scroll-to-top">
    <v-icon>mdi-arrow-up</v-icon>
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { NotionRenderer, getPageBlocks } from 'vue-notion';
import { useRoute } from 'vue-router';
import { Disqus } from 'vue-disqus';

const route = useRoute();
const blockMap = ref(null);

onMounted(async () => {
  // get Notion blocks from the API via a Notion pageId
  blockMap.value = await getPageBlocks(route.params.id);
});

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>

<style>
@import 'vue-notion/src/styles.css';

.scroll-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #000000;
  color: white;
  border: none;
  border-radius: 100%;
  padding: 10px 20px;
  cursor: pointer;
  z-index: 1000;
}

.scroll-to-top:hover {
  background-color: #0056b3;
}
</style>
