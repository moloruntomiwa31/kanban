<template>
  <div class="flex gap-8 overflow-x-scroll min-w-full min-h-[100vh]">
    <div
      class="min-w-[280px] font-bold min-h-full capitalize"
      v-for="column in currentBoardColumns"
      :key="column.name"
    >
      <h4 class="text-md text-slate-500 tracking-widest">
        {{ column.name }}({{ statusLengths[column.name] || 0 }})
      </h4>
      <div v-for="task in currentBoard.mainTasks" :key="task.id">
        <!-- Add a v-if check to ensure task is defined -->
        <template v-if="task">
          <div
            v-if="task.status === column.name"
            @click="showTaskDetail(task)"
            class="bg-white shadow-md w-full rounded-lg p-4 font-bold m-8 hover:cursor-pointer task-div"
          >
            <div class="text-left items-center space-y-3">
              <h2 class="text-lg capitalize">{{ task.name }}</h2>
              <p class="text-sm text-gray-500">
                {{ task.checkedSubTasks.length || 0 }} of
                {{ task.subtasks.length }} subtasks
              </p>
            </div>
          </div>
        </template>
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
    :checkedSubTasks="currentColumnTask?.checkedSubTasks"
    :boardColumnStatus="newStatus"
    @handleTask="showTaskDetails = !showTaskDetails"
    @handleInputUpdate="handleInputUpdate"
    @handleSelectInput="handleSelectInput"
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
        v-for="(s, index) in currentColumnTask!.subtasks"
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
        @change="handleSelectInput($event.target!.value)"
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
        <span class="font-bold text-black"
          >"{{ currentColumnTask!.name }}"</span
        >
        task and its subtasks? This action cannot be reversed.
      </h3>
      <div class="w-full flex items-center justify-between space-x-4">
        <button
          @click="removeTask(currentColumnTask!)"
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
import type Column from "@/types/Column";
import type Board from "@/types/Board";
import type Task from "../../types/Task.ts";
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
  currentBoard: Board;
}>();

const newStatus = ref(props.boardColumnStatus);
const newTaskDescription = ref(props.taskDescription || "");
const newTaskTitle = ref(props.taskTitle || "");

const emit = defineEmits(["editBoard"]);
const handleEditColumn = () => {
  emit("editBoard");
};

const showTaskDetail = (task: Task) => {
  subTaskModal.value = true;
  currentColumnTask.value = task;
  newStatus.value = task.status;
  newTaskDescription.value = task.description;
  newTaskTitle.value = task.name;
};

// statusLength
const statusLengths = computed(() => {
  const lengths: any = {};
  props.currentBoardColumns.forEach((column) => {
    lengths[column.name] = column.tasks.length;
  });
  return lengths;
});

const handleInputUpdate = (updatedValue: string, isChecked: boolean) => {
  if (isChecked && currentColumnTask.value) {
    if (!currentColumnTask.value.checkedSubTasks.includes(updatedValue)) {
      currentColumnTask.value.checkedSubTasks = [
        ...currentColumnTask.value.checkedSubTasks,
        updatedValue,
      ];
    } else {
      currentColumnTask.value.checkedSubTasks =
        currentColumnTask.value.checkedSubTasks.filter(
          (subtask: string) => subtask !== updatedValue
        );
    }
  } else {
    if (currentColumnTask.value) {
      currentColumnTask.value.checkedSubTasks =
        currentColumnTask.value.checkedSubTasks.filter(
          (subtask: string) => subtask !== updatedValue
        );
    }
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

    // Clear the subtaskNames array before updating it
    subtaskNames.value = [];

    // Update subtaskNames with the current subtask names
    subtaskNames.value = currentColumnTask.value.subtasks.map(
      (subtask) => subtask.name
    );
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
  console.log("clicked update button");

  // Find the board in the newBoards array
  const matchingBoard = board.newBoards.find((b) => b.id == route.params.id);

  if (matchingBoard) {
    // Find the current and new columns
    const currentColumn = matchingBoard.columns.find(
      (c) => c.name == newStatus.value
    );
    const newColumn = matchingBoard.columns.find((c) => c.name == status);

    if (currentColumn && newColumn) {
      // Find the existing task in the current column
      const existingTaskIndex = currentColumn.tasks.findIndex(
        (t) => t.name == currentColumnTask.value?.name
      );

      if (existingTaskIndex !== -1) {
        // Extract the existing task
        const existingTask = currentColumn.tasks[existingTaskIndex];

        // Check if the status (column) is changing
        if (currentColumn.name !== newColumn.name) {
          // Remove the task from the current column
          currentColumn.tasks.splice(existingTaskIndex, 1);

          // Filter out existing subtasks in the new subtaskNames array
          const newSubtasks = subtaskNames.value
            .filter((name) => name.trim() !== "")
            .map((name) => ({
              id: uuidv4(),
              name: name,
              isChecked: false,
            }))
            .filter(
              (newSubtask) =>
                !existingTask.subtasks.some(
                  (existingSubtask) => existingSubtask.name === newSubtask.name
                )
            );

          // Add the task to the new column with existing and new subtasks
          newColumn.tasks.push({
            ...existingTask,
            name: title,
            description: description,
            status: status,
            subtasks: [...existingTask.subtasks, ...newSubtasks],
          });

          editTask.value = false;
          console.log(`Task moved from ${currentColumn.name} to ${status}`);
        } else {
          // Status (column) remains the same, update the task in place
          existingTask.name = title;
          existingTask.description = description;
          existingTask.status = status;

          // Filter out existing subtasks in the new subtaskNames array
          const newSubtasks = subtaskNames.value
            .filter((name) => name.trim() !== "")
            .map((name) => ({
              id: uuidv4(),
              name: name,
              isChecked: false,
            }))
            .filter(
              (newSubtask) =>
                !existingTask.subtasks.some(
                  (existingSubtask) => existingSubtask.name === newSubtask.name
                )
            );

          // Add new subtasks to the existing ones
          existingTask.subtasks = [...existingTask.subtasks, ...newSubtasks];

          editTask.value = false;
          console.log(`Task updated in ${currentColumn.name}`);
        }
      }
    }
  }
};

const removeTask = (task: Task) => {
  for (const column of props.currentBoardColumns) {
    const taskIndexToRemove = column.tasks.findIndex(
      (t: Task) => t.name === task.name
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

const handleSelectInput = (value: string) => {
  newStatus.value = value;
  currentColumnTask.value!.status = value;
  updateTask(newTaskTitle.value, newTaskDescription.value, newStatus.value);
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
