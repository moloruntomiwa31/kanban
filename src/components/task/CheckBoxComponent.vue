<template>
  <div class="bg-slate-100 p-3 hover:bg-slate-200 hover:cursor-pointer">
    <input
      type="checkbox"
      v-model="subtask.isChecked"
      @change="handleCheckBox"
      class="mr-2"
    />
    <span
      class="capitalize text-md font-bold"
      :class="{ 'line-through-class': subtask.isChecked }"
      >{{ subtask.name }}</span
    >
  </div>
</template>

<script setup lang="ts">
import type SubTask from "../../types/SubTask";

const emit = defineEmits(["updateCheckBox"]);
const props = defineProps<{
  subtask: SubTask;
}>();
const handleCheckBox = () => {
  emit("updateCheckBox", props.subtask.name, props.subtask.isChecked);
};
</script>

<style scoped>
.line-through-class {
  text-decoration: line-through;
  color: #888585;
}
</style>
