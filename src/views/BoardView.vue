<template>
  <div class="main-content">
    <div class="header z-50">
      <h1 class="text-2xl font-bold">{{ boardTitle || "Overview" }}</h1>
      <div class="flex items-center">
        <button
          @click="taskModal = true"
          :disabled="isButtonDisabled"
          class="add-task-btn whitespace-nowrap font-bold p-3"
        >
          <i class="bx bx-plus-medical"></i>New Task
        </button>
        <button @click="showDetails = !showDetails">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
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
    </div>
    <!-- To edit and Delete with each modals -->
    <EditorTab
      :showDetails="showDetails"
      :firstValue="'Edit Board'"
      :secondValue="'Delete Board'"
      @edit="editBoard = true"
      @delete="deleteBoard = true"
    />
    <!-- Edit Modal -->
    <EditBoardModal
      :editBoard="editBoard"
      :currentBoardColumns="currentBoardColumns"
      :boardTitle="boardTitle"
      @closeModal="editBoard = false"
      @updateTitle="updateTitle"
      @removeColumn="removeColumn"
      @updateInputValue="updateInputValue"
      @addNewColumn="addNewColumn"
      @saveChanges="saveChanges"
    />
    <!-- end -->

    <!-- Delete Modal -->
    <DeleteModal
      :boardTitle="boardTitle"
      :deleteBoard="deleteBoard"
      @closeModal="deleteBoard = false"
      @cancel="deleteBoard = false"
      @removeBoard="removeBoard(boardTitle)"
    />
    <!-- end -->

    <!-- Task Modal -->
    <Modal v-if="taskModal" @closeModal="taskModal = false">
      <template #header>
        <h2 class="capitalize font-bold text-xl text-red-500">Add New Task</h2>
      </template>
      <template #body>
        <label for="taskName">Task Name</label>
        <InputComponent
          placeholder="e.g Take Coffee Break"
          class="outline-[#a8a4ff] border-1 border-[#828FA3] p-2 rounded-lg"
          v-model="taskTitle"
        />
        <TextAreaComponent
          label="description"
          v-model="taskDescription"
          :placeholder="'e.g Learn to pause and take breaks...'"
        />
        <label for="subTask">SubTasks</label>
        <NewColumn
          v-for="(i, index) in board.numOfSubtasks"
          :key="i"
          @removeInput="board.removeSubtask(index)"
          @updateInputValue="board.updateSubtaskValue(index, $event)"
        />
        <button
          class="bg-[#eee] text-[#635fc7] p-2 rounded-2xl"
          @click="board.numOfSubtasks++"
        >
          <i class="bx bx-plus text-md"></i>Add New Subtask
        </button>

        <label for="status">Current Status</label>
        <select
          v-model="status"
          class="outline-[#a8a4ff] border-1 border-[#828FA3] p-2 rounded-lg"
        >
          <option
            :value="data.name"
            v-for="data in currentBoardColumns"
            :key="data"
            class="capitalize"
          >
            {{ data.name }}
          </option>
        </select>

        <button
          class="bg-[#635fc7] text-white p-2 rounded-2xl"
          @click="
            createTask(taskTitle, taskDescription, status, board.subTasksData)
          "
        >
          Create Task
        </button>
      </template>
    </Modal>
    <!-- end -->

    <div class="container" v-if="!board.newBoards">
      <div class="empty-text h-[100vh] flex-col text-center">
        <div class="space-y-4 p-3">
          <p class="font-bold text-md">
            This board is empty. Create a new column to get started.
          </p>
          <button
            @click="editBoard = true"
            class="bg-[#635fc7] p-4 font-bold text-white rounded-3xl"
          >
            <i class="bx bx-plus-medical"></i>Add New Column
          </button>
        </div>
      </div>

      <!-- if board has not been created -->
    </div>

    <div
      class="container bg-blue-50 overflow-x-hidden pt-4"
      v-if="board.newBoards"
    >
      <div class="min-h-[100vh] flex-col text-center">
        <ColumnView
          :currentBoardColumns="currentBoardColumns"
          :columnTask="currentColumnTask"
          :boardColumnStatus="status"
          :taskTitle="taskTitle"
          :taskDescription="taskDescription"
          @editBoard="editBoard = true"
        />
      </div>

      <!-- if board has not been created -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { ref, watch, computed, onMounted, watchEffect } from "vue";
import { useCreateBoard } from "@/stores/board";
import Modal from "../components/dashboard/Modal.vue";
import NewColumn from "@/components/dashboard/NewColumn.vue";
import InputComponent from "@/components/dashboard/InputComponent.vue";
import type Column from "../types/Column";
import type Board from "../types/Board";
import type Task from "../types/Task";
import EditorTab from "../components/board/EditorTab.vue";
import EditBoardModal from "../components/board/EditBoardModal.vue";
import DeleteModal from "../components/board/DeleteModal.vue";
import ColumnView from "../components/board/ColumnView.vue";
import TextAreaComponent from "@/components/dashboard/TextAreaComponent.vue";
import { useToast } from "@/stores/toast";

//reactive values
const boardTitle = ref<string>("");
const route = useRoute();
const router = useRouter();
const board = useCreateBoard();
const toast = useToast();
const showDetails = ref<boolean>(false);
const editBoard = ref<boolean>(false);
const taskModal = ref<boolean>(false);
const deleteBoard = ref<boolean>(false);
const matchingBoard = ref<Board | null>(null);

// task reactive values
const status = ref("");
const taskTitle = ref("");
const taskDescription = ref("");

const removeBoard = (title: string) => {
  board.newBoards.forEach((b, index) => {
    if (b.name === title) {
      board.newBoards.splice(index, 1);
    }
  });
  toast.addToast("Board Successfully Deleted!", "success");
  router.push("/dashboard");
};

// compted properties
const isButtonDisabled = computed(() => {
  return !(board.newBoards.length >= 1);
});
//computed property for getting current board
const currentBoardColumns = computed<Column[] | []>(() => {
  if (matchingBoard.value) {
    return matchingBoard.value.columns;
  }
  return [];
});
const currentColumnTask = computed<Task[] | []>(() => {
  if (matchingBoard.value) {
    return matchingBoard.value.columns.flatMap((column) => column.tasks);
  }
  return [];
});

// Updating and modifying board and columns
const updateInputValue = (index: number, newValue: string) => {
  if (matchingBoard.value) {
    const updatedColumns = [...matchingBoard!.value.columns];
    updatedColumns[index].name = newValue;
    matchingBoard!.value.columns = updatedColumns;
  }
};
const removeColumn = (index: number) => {
  if (matchingBoard.value) {
    matchingBoard!.value.numberOfColumns--;
    matchingBoard!.value.columns.splice(index, 1);
  }
};
const addNewColumn = () => {
  if (matchingBoard.value) {
    matchingBoard!.value.columns.push({ name: "", tasks: [] });
    matchingBoard!.value.numberOfColumns++;
  }
};
const updateTitle = (value: string) => {
  if (matchingBoard.value) {
    boardTitle.value = value;
    matchingBoard!.value.name = boardTitle.value;
  }
};
const saveChanges = () => {
  if (matchingBoard.value) {
    matchingBoard!.value.columns = currentBoardColumns.value;
    toast.addToast("Changes Saved Successfully!", "success");
    editBoard.value = false;
  }
};

//Watch for board
watchEffect(() => {
  const foundBoard = board.newBoards.find((b) => b.id == route.params.id);
  if (foundBoard) {
    boardTitle.value = foundBoard.name;
  }
});
onMounted(() => {
  const foundBoard = board.newBoards.find((b) => b.id == route.params.id);
  matchingBoard.value = foundBoard!;
});

// Watch for changes in route.params.id and update boardTitle accordingly
watch(
  () => route.params.id,
  (newId) => {
    const foundBoard = board.newBoards.find((b) => b.id == newId);
    if (foundBoard) {
      boardTitle.value = foundBoard.name;
      matchingBoard.value = foundBoard;
    }
  }
);

// Creating Tasks

const createTask = (
  title: string,
  description: string,
  status: string,
  data: string[]
) => {
  const exactColumn = matchingBoard.value!.columns.find(
    (b) => b.name == status
  );
  board.createTask(title, description, status, data, exactColumn!);
  taskModal.value = false;
};
</script>

<style scoped lang="scss">
@import "../assets/main-content.scss";
@import "../assets/main.scss";

.empty-text {
  @include centerMixin;
}
button {
  cursor: pointer;
}
label {
  font-weight: 700;
  color: #5a595c;
}

.slide-in {
  animation: slide-in 0.5s linear;
}
@keyframes slide-in {
  0% {
    opacity: 0;
    transform: translateY(100px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.slide-out {
  animation: slide-out 0.5s linear;
}
@keyframes slide-out {
  0% {
    opacity: 1;
    transform: translateY(0px);
  }
  100% {
    opacity: 0;
    transform: translateY(100);
  }
}
</style>
