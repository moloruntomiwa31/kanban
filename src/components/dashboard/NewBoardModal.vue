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
      <input
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
import { useColumn } from "@/stores/column";
import NewColumn from "./NewColumn.vue";

const currentUser = useUser();
const boardStore = useCreateBoard();
const columnStore = useColumn();
const { newBoardName } = storeToRefs(boardStore);
const { columnValues } = storeToRefs(columnStore);
const { addBoard } = boardStore;
// const { incrementColumn, decrementColumn } = columnStore;

const addNewColumn = () => {
  boardStore.numOfColumns++
  columnValues.value.push("");
};
const removeColumn = (index: number) => {
  boardStore.numOfColumns--
  columnValues.value.splice(index, 1);
};
const updateColumnValue = (index: number, value: string) => {
  columnValues.value[index] = value;
};
// const columnsData = [
//   {
//     name: "Column 1",
//     tasks: [
//       {
//         name: "Task 1",
//         subtasks: [{ name: "Subtask 1" }, { name: "Subtask 2" }],
//       },
//       // Other tasks for Column 1
//     ],
//   },
// ];
</script>

<style scoped></style>
