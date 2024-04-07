<template>
  <v-app-bar
    color="transparent"
    scroll-behavior="hide collapse elevate"
    scroll-threshold="50"
  >
    <template v-slot:prepend>
      <v-app-bar-nav-icon icon="mdi-alpha-i-circle" to="/"></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>Ian Cheng's Blog</v-app-bar-title>

    <template v-slot:append>
      <v-btn icon="mdi-theme-light-dark" @click="toggleTheme"></v-btn>
      <v-btn icon="mdi-github" href="https://github.com/chengtc-dev"></v-btn>
    </template>
  </v-app-bar>
</template>

<script setup>
import { useTheme } from 'vuetify';

const theme = useTheme();

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
}
</script>
