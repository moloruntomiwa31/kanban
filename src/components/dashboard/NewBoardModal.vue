<template>
  <Modal
    v-if="currentUser.createNewBoard"
    @closeModal="currentUser.createNewBoard = false"
  >
    <template #header>
      <h2 class="capitalize font-bold text-xl">Add New board</h2>
    </template>
    <template #body>
      <label for="board-name">Board Name</label>
      <InputComponent
        type="text"
        class="outline-[#a8a4ff] border-1 border-[#828FA3] p-2 rounded-lg"
        placeholder="e.g Web Design"
        v-model.trim="newBoardName"
      />
      <label for="column-name">Board Columns</label>
      <NewColumn
        v-for="(i, index) in boardStore.numOfColumns"
        :key="i"
        @removeInput="removeColumn(index)"
        @updateInputValue="updateColumnValue(index, $event)"
      />
      <button
        class="bg-[#eee] text-[#635fc7] p-2 rounded-2xl"
        @click="addNewColumn"
      >
        <i class="bx bx-plus text-md"></i>Add New Column
      </button>
      <button
        @click="addBoard(newBoardName, columnValues)"
        class="bg-[#635fc7] text-white p-2 rounded-2xl"
      >
        Create New Board
      </button>
    </template>
    <!-- new board modal -->
  </Modal>
</template>

<script setup lang="ts">
import Modal from "../../components/dashboard/Modal.vue";
import { useUser } from "../../stores/user";
import { storeToRefs } from "pinia";
import { useCreateBoard } from "../../stores/board";
import NewColumn from "./NewColumn.vue";
import InputComponent from "./InputComponent.vue";

const currentUser = useUser();
const boardStore = useCreateBoard();
const { newBoardName, columnValues } = storeToRefs(boardStore);
const { addBoard } = boardStore;

const addNewColumn = () => {
  boardStore.numOfColumns++
};
const removeColumn = (index: number) => {
  boardStore.numOfColumns--
  columnValues.value.splice(index, 1);
};
const updateColumnValue = (index: number, value: string) => {
  columnValues.value[index] = value;
};
</script>

<style scoped></style>
