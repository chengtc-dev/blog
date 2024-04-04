<template>
  <v-card hover class="mx-auto" width="300" align="center" variant="outlined">
    <v-img
      class="align-end text-white"
      height="200"
      :src="article.pageCover"
      cover
    >
    </v-img>

    <v-tooltip :text="article.title" location="top">
      <template v-slot:activator="{ props }">
        <v-card-title v-bind="props">{{ article.title }}</v-card-title>
      </template>
    </v-tooltip>

    <v-card-subtitle class="pt-4 pb-8">{{
      article.createdTime
    }}</v-card-subtitle>
  </v-card>
</template>

<script setup>
const props = defineProps({
  article: Object,
});
</script>
