<template>
  <div class="bg-slate-100 p-3 hover:bg-slate-200 hover:cursor-pointer">
    <InputComponent
      type="checkbox"
      :id="subtask.name"
      :value="subtask.name"
      class="h-5 w-5 focus:border-indigo-300 focus:ring-purple-500 mr-2 hover:cursor-pointer"
      v-model="isChecked"
      @change="handleCheckBox"
    />
    <label :for="subtask.name" class="capitalize text-md font-bold">{{
      subtask.name
    }}</label>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type SubTask from "../../types/SubTask";
import InputComponent from "../dashboard/InputComponent.vue";

const isChecked = ref(false);
const emit = defineEmits(["updateCheckBox"]);
const props = defineProps<{
  subtask: SubTask;
}>();
const handleCheckBox = () => {
  emit("updateCheckBox", props.subtask.name, isChecked);
  isChecked.value = false;
};
</script>

<style scoped>
input[type="checkbox"]:checked + label {
  text-decoration: line-through;
  color: #888585;
}
</style>
