<template>
  <Modal @closeModal="handleClose" v-if="subTaskModal">
    <template #header>
      <div class="flex justify-between">
        <h3 class="capitalize font-bold text-xl text-[#b365b3]">
          {{ currentColumnTask.name }}
        </h3>
        <button @click="handleTaskDetails">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 8 8"
          >
            <g transform="rotate(90 4 4)">
              <path
                fill="#828fa3"
                d="M0 3v2h2V3H0zm3 0v2h2V3H3zm3 0v2h2V3H6z"
              />
            </g>
          </svg>
        </button>
      </div>
    </template>
    <template #body>
      <p class="text-gray-500 font-bold tracking-widest text-sm">
        Subtasks ({{ checkedSubTasks.length }} of
        {{ currentColumnTask.subtasks.length }})
      </p>
      <CheckBoxComponent
        :subtask="subtask"
        v-for="subtask in currentColumnTask.subtasks"
        :key="subtask"
        @updateCheckBox="handleInputUpdate(subtask.name, $event)"
      />
      <p class="block">
        <label>Current Status</label>
        <select
          @change="handleSelectInput($event)"
          class="block w-full outline-[#a8a4ff] border-1 border-[#828FA3] p-3 rounded-lg hover:cursor-pointer"
        >
          <option :value="boardColumnStatus" class="capitalize" selected>
            {{ boardColumnStatus }}
          </option>
          <option v-for="data in updatedOption">{{ data.name }}</option>
        </select>
      </p>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import Modal from "../dashboard/Modal.vue";
import CheckBoxComponent from "./CheckBoxComponent.vue";
import type Column from "@/types/Column";

const props = defineProps([
  "currentColumnTask",
  "currentBoardColumns",
  "subTaskModal",
  "checkedSubTasks",
  "boardColumnStatus",
]);
const emit = defineEmits([
  "close",
  "handleTask",
  "handleInputUpdate",
  "handleSelectInput",
]);
const newStatus = ref(props.boardColumnStatus);
const updatedOption = computed<Column[]>(() => {
  return props.currentBoardColumns.filter(
    (column: Column) => column.name != props.boardColumnStatus
  );
});

const handleClose = () => {
  emit("close");
};
const handleTaskDetails = () => {
  emit("handleTask");
};
const handleInputUpdate = (name: string, value: boolean) => {
  emit("handleInputUpdate", name, value);
};
const handleSelectInput = (event: Event) => {
  const selectedValue = (event.target as HTMLSelectElement).value;
  emit("handleSelectInput", selectedValue);
};
</script>

<style scoped></style>
