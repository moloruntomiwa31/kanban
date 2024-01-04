<template>
  <div
    class="shadow w-[200px] p-8 rounded-lg space-y-4 fixed top-[6rem] right-[2rem] md:right-[7rem] bg-red-100 lg:right-[12rem] z-10 slide-in"
    :class="{ 'slide-out': !showDetails }"
    v-show="showDetails"
  >
    <button @click="handleEditBoard">Edit Board</button>
    <button @click="handleDeleteBoard" class="text-red-400">
      Delete Board
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps<{
  showDetails: boolean;
}>();

const emit = defineEmits(["editBoard", "deleteBoard"]);

const handleEditBoard = () => {
  emit("editBoard");
};

const handleDeleteBoard = () => {
  emit("deleteBoard");
};
</script>

<style scoped></style>
