<template>
  <v-app>
    <v-container>
      <the-header></the-header>
    </v-container>
    <router-view></router-view>
  </v-app>
</template>

<script setup>
import TheHeader from './components/layout/TheHeader.vue';
</script>
