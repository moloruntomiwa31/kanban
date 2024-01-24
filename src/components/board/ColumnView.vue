<template>
  <div class="flex gap-8 overflow-x-scroll min-w-full min-h-[100vh]">
    <div
      class="min-w-[280px] font-bold min-h-full capitalize"
      v-for="data in currentBoardColumns"
    >
      <h4 class="text-md text-slate-500 tracking-widest">
     {{ data.name }}({{ data.tasks.length }})
      </h4>
      <div class="empty-text mt-8">
        <div
          v-if="data.tasks"
          v-for="tasks in data.tasks"
          @click="showTaskDetail(tasks)"
          class="shadow-md w-full rounded-lg p-4 bg-white font-bold m-8 hover:cursor-pointer task-div"
        >
          <div class="text-left items-center space-y-3">
            <h2 class="text-lg capitalize">{{ tasks.name }}</h2>
            <p class="text-sm text-gray-500">
              {{ checkedSubTasks.length }} of
              {{ tasks.subtasks.length }} subtasks
            </p>
          </div>
        </div>
      </div>
    </div>
    <div
      @click="handleEditColumn"
      class="min-w-[280px] bg-purple-100 font-extrabold text-lg lg:text-2xl mx-8 max-h-full empty-text hover:cursor-pointer"
    >
      <i class="bx bx-plus text-xl font-extrabold"></i>New Column
    </div>
  </div>
  <SubTaskModal
    @close="subTaskModal = false"
    :currentColumnTask="currentColumnTask"
    :currentBoardColumns="currentBoardColumns"
    :subTaskModal="subTaskModal"
    :checkedSubTasks="checkedSubTasks"
    :boardColumnStatus="boardColumnStatus"
    @handleTask="showTaskDetails = !showTaskDetails"
    @handleInputUpdate="handleInputUpdate"
  />
  <EditorTab
    :showDetails="showTaskDetails"
    @edit="editTask = true"
    @delete="deleteTask = true"
    :firstValue="'Edit Task'"
    :secondValue="'Delete Task'"
  />
  <Modal v-if="editTask" @closeModal="editTask = false">
    <template #header>
      <label for="taskName">Task Name</label>
      <InputComponent
        :initialValue="newTaskTitle"
        placeholder="e.g Take Coffee Break"
        class="block mt-3 outline-[#a8a4ff] border-1 border-[#828FA3] p-2 rounded-lg w-[90%]"
        v-model="newTaskTitle"
      />
    </template>
    <template #body>
      <TextAreaComponent
        label="description"
        v-model="newTaskDescription"
        :placeholder="'e.g Learn to pause and take breaks...'"
      />
      <label for="">SubTasks</label>
      <NewColumn
        v-for="(s, index) in currentColumnTask.subtasks"
        :key="s"
        :initialValue="s.name"
        @removeInput="removeSubtask(index)"
        @updateInputValue="updateSubtaskValue(index, $event)"
      />
      <button
        class="bg-[#eee] text-[#635fc7] p-2 rounded-2xl"
        @click="addInputToEditSubtask"
      >
        <i class="bx bx-plus text-md"></i>Add New Subtask
      </button>
      <label for="status">Current Status</label>
      <select
        v-model="newStatus"
        class="outline-[#a8a4ff] border-1 border-[#828FA3] p-2 rounded-lg"
      >
        <option :value="boardColumnStatus" class="capitalize" selected>
          {{ boardColumnStatus }}
        </option>
        <option
          :value="data.name"
          v-for="data in updatedOption"
          class="capitalize"
        >
          {{ data.name }}
        </option>
      </select>

      <button
        class="bg-[#635fc7] text-white p-2 rounded-2xl"
        @click="updateTask(newTaskTitle, newTaskDescription, newStatus)"
      >
        Update Task
      </button>
    </template>
  </Modal>
  <Modal v-if="deleteTask" @closeModal="deleteTask = false">
    <template #header>
      <h2 class="font-bold text-xl text-red-500">Delete this task?</h2>
    </template>
    <template #body>
      <h3 class="text-gray-500">
        Are you sure you want to delete the
        <span class="font-bold text-black">"{{ currentColumnTask.name }}"</span>
        task and its subtasks? This action cannot be reversed.
      </h3>
      <div class="w-full flex items-center justify-between space-x-4">
        <button
          @click="removeTask(currentColumnTask)"
          class="p-3 rounded-full font-bold text-center bg-red-500 w-1/2 text-white hover:opacity-75 duration-150"
        >
          Delete
        </button>
        <button
          @click="deleteTask = false"
          class="p-3 rounded-full font-bold text-center bg-gray-200 w-1/2 text-purple-500 hover:opacity-75 duration-150"
        >
          Cancel
        </button>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from "uuid";
import { ref, computed } from "vue";
import Modal from "../dashboard/Modal.vue";
import type { Column, Task } from "@/types";
// import type Task from "../../types/Task.ts";
import SubTaskModal from "../task/SubTaskModal.vue";
import NewColumn from "../dashboard/NewColumn.vue";
import EditorTab from "./EditorTab.vue";
import { useCreateBoard } from "@/stores/board";
import { useToast } from "@/stores/toast";
import { useRoute } from "vue-router";
import InputComponent from "../dashboard/InputComponent.vue";
import TextAreaComponent from "../dashboard/TextAreaComponent.vue";
const board = useCreateBoard();
const toast = useToast();
const route = useRoute();

const subTaskModal = ref<boolean>(false);
const currentColumnTask = ref<Task | null>(null);
const checkedSubTasks = ref<string[]>([]);
const showTaskDetails = ref<boolean>(false);
const editTask = ref<boolean>(false);
const deleteTask = ref<boolean>(false);
const subtaskNames = ref<string[]>([]);

const props = defineProps<{
  currentBoardColumns: Column[];
  columnTask: Task[];
  boardColumnStatus: string;
  taskTitle: string;
  taskDescription: string;
}>();

const newStatus = ref(props.boardColumnStatus || "");
const newTaskDescription = ref(props.taskDescription || "");
const newTaskTitle = ref(props.taskTitle || "");

const emit = defineEmits(["editBoard"]);
const handleEditColumn = () => {
  emit("editBoard");
};

const showTaskDetail = (task: Task) => {
  subTaskModal.value = true;
  currentColumnTask.value = task;
  console.log(currentColumnTask.value);
};

const handleInputUpdate = (updatedValue: string, isChecked: boolean) => {
  if (isChecked) {
    if (!checkedSubTasks.value.includes(updatedValue)) {
      checkedSubTasks.value = [...checkedSubTasks.value, updatedValue];
    } else {
      checkedSubTasks.value = checkedSubTasks.value.filter(
        (subtask) => subtask !== updatedValue
      );
    }
  } else {
    checkedSubTasks.value = checkedSubTasks.value.filter(
      (subtask) => subtask !== updatedValue
    );
  }
};

const updatedOption = computed<Column[]>(() => {
  return props.currentBoardColumns.filter(
    (column: Column) => column.name != props.boardColumnStatus
  );
});

const addInputToEditSubtask = () => {
  if (currentColumnTask.value) {
    currentColumnTask.value.subtasks.push({
      id: uuidv4(),
      name: "",
      isChecked: false,
    });
    currentColumnTask.value.numOfSubtasks++;
  }
  console.log(currentColumnTask.value);
};

const removeSubtask = (index: number) => {
  if (currentColumnTask.value) {
    currentColumnTask.value.subtasks.splice(index, 1);
  }
};
const updateSubtaskValue = (index: number, value: string) => {
  if (currentColumnTask.value) {
    currentColumnTask.value.subtasks[index].name = value;
    subtaskNames.value[index] = value;
  }
};

const updateTask = (title: string, description: string, status: string) => {
  const matchingBoard = board.newBoards.find((b) => b.id == route.params.id);
  if (matchingBoard) {
    const existingColumn = matchingBoard.columns.find(
      (c) => c.name == props.boardColumnStatus
    );
    if (existingColumn) {
      const existingTaskIndex = existingColumn.tasks.findIndex(
        (t) => t.name == currentColumnTask.value?.name
      );
      if (existingTaskIndex !== -1) {
        const existingTask = existingColumn.tasks[existingTaskIndex];

        if (status !== props.boardColumnStatus) {
          // Status (column) is changing
          const newColumn = matchingBoard.columns.find((c) => c.name == status);
          if (newColumn) {
            // Remove task from the current column
            existingColumn.tasks.splice(existingTaskIndex, 1);

            // Add task to the new column
            newColumn.tasks.push({
              id: uuidv4(),
              numOfSubtasks: 0,
              name: title,
              description: description,
              status: status,
              subtasks: [
                ...existingTask.subtasks,
                ...subtaskNames.value.map((name) => ({
                  id: uuidv4(),
                  name: name,
                  isChecked: false,
                })),
              ],
            });
          }
        } else {
          // Status (column) remains the same, update the task in place
          existingTask.name = title;
          existingTask.description = description;
          existingTask.status = status;

          // Add new subtasks to the existing ones
          existingTask.subtasks = [
            ...existingTask.subtasks,
            ...subtaskNames.value.map((name) => ({
              id: uuidv4(),
              name: name,
              isChecked: false,
            })),
          ];
        }

        editTask.value = false;
        console.log(`Task updated: ${title} in column ${status}`);
      }
    }
  }
};

const removeTask = (task: Task) => {
  for (const column of props.currentBoardColumns) {
    const taskIndexToRemove = column.tasks.findIndex(
      (t) => t.name === task.name
    );
    if (taskIndexToRemove !== -1) {
      column.tasks.splice(taskIndexToRemove, 1);
      toast.addToast("Task successfully deleted!", "success");
      deleteTask.value = false;
      showTaskDetails.value = false;
      break;
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/main.scss";
.empty-text {
  @include centerMixin;
}
.task-div:hover {
  h2 {
    color: #b365b3;
  }
}
label {
  font-weight: 700;
}
</style>
