<template>
  <v-app-bar
    color="transparent"
    scroll-behavior="hide collapse elevate"
    scroll-threshold="50"
  >
    <template v-slot:prepend>
      <router-link to="/">
        <v-app-bar-nav-icon
          ><svg-icon type="mdi" :path="mdiAlphaICircle"></svg-icon
        ></v-app-bar-nav-icon>
      </router-link>
    </template>

    <v-app-bar-title>Ian Cheng's Blog</v-app-bar-title>

    <template v-slot:append>
      <v-btn icon>
        <svg-icon
          type="mdi"
          :path="mdiThemeLightDark"
          @click="toggleTheme"
        ></svg-icon>
      </v-btn>
      <v-btn icon>
        <a href="https://github.com/chengtc-dev">
          <svg-icon type="mdi" :path="mdiGithub"></svg-icon>
        </a>
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script setup>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiAlphaICircle, mdiThemeLightDark, mdiGithub } from '@mdi/js';
import { useTheme } from 'vuetify';

const theme = useTheme();

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
}
</script>
