<script setup lang="ts">
import { RouterView } from "vue-router";
import Toast from "./components/Toast.vue";
import { useToast } from "./stores/toast";
const toast = useToast();
</script>

<template>
  <Toast v-if="toast.showToast"/>
  <component :is="$route.meta.layout || 'div'">
    <RouterView />
  </component>
</template>

<style scoped></style>
