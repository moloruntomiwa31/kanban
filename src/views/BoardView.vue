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
    <div
      class="shadow w-[200px] p-8 rounded-lg space-y-4 fixed top-[6rem] right-[2rem] md:right-[7rem] bg-red-100 lg:right-[12rem] z-10 slide-in"
      :class="{ 'slide-out': !showDetails }"
      v-show="showDetails"
    >
      <button @click="editBoard = true">Edit Board</button>
      <button @click="deleteBoard = true" class="text-red-400">
        Delete Board
      </button>
    </div>
    <!-- Edit Modal -->
    <Modal @closeModal="editBoard = false" v-if="editBoard">
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
    <!-- end -->

    <!-- Delete Modal -->
    <Modal @closeModal="deleteBoard = false" v-if="deleteBoard">
      <template #header>
        <h2 class="capitalize font-bold text-xl text-red-500">
          Delete this board?
        </h2>
      </template>
      <template #body>
        <p>
          Are you sure you want to delete the
          <span class="font-bold">{{ boardTitle }}</span> board? This action
          will remove all columns and tasks and cannot be reversed.
        </p>
        <div class="flex justify-around items-center">
          <button
            class="bg-red-400 text-white p-4 rounded-3xl"
            @click="removeBoard(boardTitle)"
          >
            Delete
          </button>
          <button
            class="bg-gray-200 text-[#635fc7] p-4 rounded-3xl"
            @click="deleteBoard = false"
          >
            Cancel
          </button>
        </div>
      </template>
    </Modal>
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

        <label for="description">Description</label>
        <textarea
          cols="30"
          rows="5"
          class="outline-[#a8a4ff] border-1 border-[#828FA3] p-2 rounded-lg"
          v-model="taskDescription"
        ></textarea>

        <label for="subTask">SubTasks</label>
        <NewColumn
          v-for="(i, index) in columnStore.numOfSubTasks"
          :key="i"
          @removeInput="removeSubtask(index)"
        />
        <button
          class="bg-[#eee] text-[#635fc7] p-2 rounded-2xl"
          @click="columnStore.incrementSubTask"
        >
          <i class="bx bx-plus text-md"></i>Add New Subtask
        </button>

        <label for="status">Current Status</label>
        <select
          v-model="status"
          class="outline-[#a8a4ff] border-1 border-[#828FA3] p-2 rounded-lg"
        >
          <option :value="data.name" v-for="data in currentBoardColumns">
            {{ data.name }}
          </option>
        </select>

        <button class="bg-[#635fc7] text-white p-2 rounded-2xl">
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
        <div class="flex gap-8 overflow-x-scroll min-w-full min-h-[100vh]">
          <div
            class="min-w-[280px] font-bold min-h-full"
            v-for="data in currentBoardColumns"
          >
            {{ data.name }}({{ data.tasks.length }})
          </div>
          <div
            @click="editBoard = true"
            class="min-w-[280px] bg-purple-100 font-extrabold text-lg lg:text-2xl max-h-full empty-text hover:cursor-pointer"
          >
            <i class="bx bx-plus text-xl font-extrabold"></i>New Column
          </div>
        </div>
      </div>

      <!-- if board has not been created -->
    </div>

    <!-- New Board Modal -->
    <NewBoardModal />
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import {
  onBeforeMount,
  ref,
  watch,
  computed,
  onMounted,
  watchEffect,
} from "vue";
import { useCreateBoard } from "@/stores/board";
import { useColumn } from "@/stores/column";
import Modal from "../components/dashboard/Modal.vue";
import NewBoardModal from "@/components/dashboard/NewBoardModal.vue";
import NewColumn from "@/components/dashboard/NewColumn.vue";
import InputComponent from "@/components/dashboard/InputComponent.vue";
import type Column from "../types/Column"
import { useToast } from "@/stores/toast";

const boardTitle = ref("");
const route = useRoute();
const router = useRouter();
const board = useCreateBoard();
const columnStore = useColumn();
const toast = useToast();
const showDetails = ref<boolean>(false);
const editBoard = ref<boolean>(false);
const taskModal = ref<boolean>(false);
const deleteBoard = ref<boolean>(false);
const matchingBoard = board.newBoards.find((b) => b.id === route.params.id);
// const { columns } = toRefs(matchingBoard);

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

const isButtonDisabled = computed(() => {
  return !(board.newBoards.length >= 1);
});

const currentBoardColumns = computed<Column[]>(() => {
  if (matchingBoard) {
    return matchingBoard.columns;
  }
  return [];
});
// const updatedColumns = ref([...columns.value]);
const updateInputValue = (index: number, newValue: string) => {
  matchingBoard!.columns[index].name = newValue;
};
const removeColumn = (index: number) => {
  matchingBoard!.numberOfColumns--;
  matchingBoard!.columns.splice(index, 1);
  console.log("delete");
};
const addNewColumn = () => {
  matchingBoard!.columns.push({ name: "", tasks: [] });
  matchingBoard!.numberOfColumns++;
};
const updateTitle = (value: string) => {
  boardTitle.value = value;
  matchingBoard!.name = boardTitle.value;
};
const saveChanges = () => {
  toast.addToast("Changes Saved Successfully!", "success");
  editBoard.value = false;
};

const removeSubtask = (index: number) => {
  columnStore.decrementSubTask();
};

onBeforeMount(() => {
  const foundBoard = board.newBoards.find((b) => b.id == route.params.id);
  if (foundBoard) {
    boardTitle.value = foundBoard.name;
  }
});

// Watch for changes in route.params.id and update boardTitle accordingly
watch(
  () => route.params.id,
  () => {
    const foundBoard = board.newBoards.find((b) => b.id == route.params.id);
    if (foundBoard) {
      boardTitle.value = foundBoard.name;
    }
  }
);
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
