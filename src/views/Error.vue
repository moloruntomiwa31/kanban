<template>
  <div
    class="flex flex-col-reverse md:flex-row items-center justify-around md:justify-between p-[6rem] w-full h-screen"
  >
    <div class="space-y-8 p-2 h-[500px] md:h-[250px]">
      <div class="space-y-2 text-center md:text-left">
        <h1 class="font-extrabold text-4xl text-blue-600">Oopps!</h1>
        <h3 class="text-xl tracking-widest font-semibold">Page not found</h3>
        <p class="text-lg">
          This page doesn't exist, I suggest you go back home.
        </p>
      </div>
      <div class="flex justify-center items-center md:justify-start">
        <button
          class="p-3 border-2 rounded-full w-[150px] bg-blue-600 text-white shadow-md hover:bg-blue-500 hover:border-blue-300 font-bold duration-200"
          @click="router.push({ name: 'home' })"
        >
          <i class="bx bx-left-arrow-alt"></i>Back home
        </button>
      </div>
    </div>
    <div>
      <img src="../assets/error-illustration.png" alt="error-illustration" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<style scoped lang="scss"></style>
