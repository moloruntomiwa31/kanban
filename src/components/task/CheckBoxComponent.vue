<template>
  <div class="bg-slate-100 p-3 hover:bg-slate-200 hover:cursor-pointer">
    <InputComponent
      type="checkbox"
      :id="subtask.name"
      :value="subtask.name"
      class="h-5 w-5 focus:border-indigo-300 focus:ring-purple-500 mr-2 hover:cursor-pointer"
      v-model="subtask.isChecked"
      @change="handleCheckBox"
    />
    <label :for="subtask.name" class="capitalize text-md font-bold">{{
      subtask.name
    }}</label>
  </div>
</template>

<script setup lang="ts">
import type SubTask from "../../types/SubTask";
import InputComponent from "../dashboard/InputComponent.vue";

const emit = defineEmits(["updateCheckBox"]);
const props = defineProps<{
  subtask: SubTask;
}>();
const handleCheckBox = () => {
  emit("updateCheckBox", props.subtask.name, props.subtask.isChecked);
};
</script>

<style scoped>
input[type="checkbox"]:checked + label {
  text-decoration: line-through;
  color: #888585;
}
</style>
