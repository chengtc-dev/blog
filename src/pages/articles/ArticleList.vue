<template>
  <v-container>
    <v-text-field
      v-model="search"
      label="Search"
      variant="solo-filled"
    ></v-text-field>
  </v-container>
  <v-container>
    <v-chip-group multiple selected-class="text-primary">
      <v-chip
        v-for="tag in tags"
        :key="tag"
        :text="tag"
        @click="toggleTag(tag)"
      ></v-chip>
    </v-chip-group>
  </v-container>
  <v-container>
    <v-row align="center" justify="center">
      <v-col v-for="article in paginatedArticles" :key="article.id" cols="auto">
        <base-card :article="article" @click="checkOut(article)"></base-card>
      </v-col>
    </v-row>
  </v-container>
  <v-container>
    <v-pagination
      v-model="currentPage"
      :length="totalPages"
      @input="paginateArticles"
      next-icon="mdi-menu-right"
      prev-icon="mdi-menu-left"
    ></v-pagination>
  </v-container>
</template>

<script setup>
import BaseCard from '../../components/ui/BaseCard.vue';
import { ref, onMounted, computed } from 'vue';
import { getPageBlocks } from 'vue-notion';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const articles = ref([]);
const tags = ref([]);
const selectedTags = ref([]);
const search = ref('');
const currentPage = ref(1);
const pageSize = ref(10);

const checkOut = (article) => {
  router.push({ path: `${route.path}/${article.id}` });
};

const paginateArticles = (page) => {
  currentPage.value = page;
};

const toggleTag = (tag) => {
  const index = selectedTags.value.indexOf(tag);
  if (index !== -1) {
    selectedTags.value.splice(index, 1);
  } else {
    selectedTags.value.push(tag);
  }
};

const updatePageSize = () => {
  if (window.innerWidth <= 768) {
    pageSize.value = 4;
  } else if (768 < window.innerWidth && window.innerWidth <= 1600) {
    pageSize.value = 6;
  } else if (1600 < window.innerWidth) {
    pageSize.value = 10;
  }
};

const paginatedArticles = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value;
  const endIndex = startIndex + pageSize.value;
  return filteredArticles.value.slice(startIndex, endIndex);
});

const filteredArticles = computed(() => {
  const filteredArticles = articles.value.filter((article) => {
    const searchRegex = new RegExp(search.value.trim(), 'i');
    const matchesSearch = searchRegex.test(article.title);
    const matchesTags =
      selectedTags.value.length === 0 ||
      selectedTags.value.includes(article.tag);
    return matchesSearch && matchesTags;
  });
  currentPage.value = 1;

  return filteredArticles;
});

const totalPages = computed(() => {
  return Math.ceil(filteredArticles.value.length / pageSize.value);
});

onMounted(async () => {
  const blockMap = await getPageBlocks('3fed88e8089b4c3ba6defa2b16127a91');
  const blocks = Object.values(blockMap).slice(1);

  blocks.forEach((block) => {
    const title = block.value.properties?.title
      ?.map((item) => item[0])
      .join('');
    const id = block.value.id;
    const createdTime = new Date(block.value.created_time).toLocaleString();
    const pageCover = block.value.format?.page_cover;

    if (title) {
      const tagMatch = title.match(/\[(.*?)\]/);
      const tag = tagMatch ? tagMatch[1] : '';
      if (!tags.value.includes(tag)) {
        tags.value.push(tag);
      }

      articles.value.push({
        id,
        title,
        createdTime,
        pageCover,
        tag,
      });
    }
  });

  updatePageSize();
});

window.addEventListener('resize', updatePageSize);
</script>
