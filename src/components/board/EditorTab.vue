<template>
  <div
    class="shadow w-[200px] p-8 rounded-lg space-y-4 fixed top-[6rem] right-[2rem] md:right-[7rem] bg-red-100 lg:right-[12rem] z-50 slide-in"
    :class="{ 'slide-out': !showDetails }"
    v-show="showDetails"
  >
    <button @click="handleEdit">{{ firstValue }}</button>
    <button @click="handleDelete" class="text-red-400">
      {{ secondValue }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps<{
  showDetails: boolean;
  firstValue: String;
  secondValue: String;
}>();

const emit = defineEmits(["edit", "delete"]);

const handleEdit = () => {
  emit("edit");
};

const handleDelete = () => {
  emit("delete");
};
</script>

<style scoped></style>
