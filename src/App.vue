<template>
  <v-app>
    <v-container>
      <the-header></the-header>
    </v-container>
    <router-view></router-view>
    <v-container>
      <the-footer></the-footer>
    </v-container>
  </v-app>
</template>

<script setup>
import TheHeader from './components/layout/TheHeader.vue';
import TheFooter from './components/layout/TheFooter.vue';
</script>
