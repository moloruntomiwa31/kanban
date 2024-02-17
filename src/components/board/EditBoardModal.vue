<template>
  <Modal @closeModal="handleEditBoard" v-if="editBoard">
    <template #header>
      <h2 class="capitalize font-bold text-xl">Edit Board</h2>
    </template>
    <template #body>
      <label for="board-name">Title</label>
      <InputComponent
        :initialValue="boardTitle"
        class="outline-[#a8a4ff] border-1 border-[#828FA3] p-2 rounded-lg"
        placeholder="e.g Design Patterns"
        @updateInput="updateTitle($event)"
      />
      <label for="board-column">Columns</label>
      <NewColumn
        v-for="(value, index) in currentBoardColumns"
        :key="index"
        :initialValue="value.name"
        @removeInput="removeColumn(index)"
        @updateInputValue="updateInputValue(index, $event)"
      />
      <button
        class="bg-[#eee] text-[#635fc7] p-2 rounded-2xl"
        @click="addNewColumn"
      >
        <i class="bx bx-plus text-md"></i>Add New Column
      </button>
      <button
        @click="saveChanges"
        class="bg-[#635fc7] text-white p-2 rounded-2xl"
      >
        Save Changes
      </button>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import Modal from "../dashboard/Modal.vue";
import InputComponent from "../dashboard/InputComponent.vue";
import NewColumn from "../dashboard/NewColumn.vue";
import type Column from "../../types/Column";

defineProps<{
  editBoard: boolean;
  boardTitle: string;
  currentBoardColumns: Column[];
}>();
const emit = defineEmits([
  "closeModal",
  "updateTitle",
  "updateInputValue",
  "saveChanges",
  "addNewColumn",
  "removeColumn",
]);

const handleEditBoard = () => {
  emit("closeModal");
};
const updateTitle = (e: any) => {
  emit("updateTitle", e);
};
const removeColumn = (index: number) => {
  emit("removeColumn", index);
};
const updateInputValue = (index: number, value: string) => {
  emit("updateInputValue", index, value);
};
const addNewColumn = () => {
  emit("addNewColumn");
};
const saveChanges = () => {
  emit("saveChanges");
};
</script>

<style scoped></style>
