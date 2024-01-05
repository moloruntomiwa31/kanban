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
          class="shadow-md w-full rounded-lg p-3 bg-white h-[100px] font-bold m-8 hover:cursor-pointer task-div"
        >
          <div class="text-left items-center min-h-full space-y-3">
            <h2 class="text-xl capitalize">{{ tasks.name }}</h2>
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
</template>

<script setup lang="ts">
import { ref } from "vue";
import type Column from "../../types/Column.ts";
import type Task from "../../types/Task.ts";
import SubTaskModal from "../task/SubTaskModal.vue";
import EditorTab from "./EditorTab.vue";

const subTaskModal = ref<boolean>(false);
const currentColumnTask = ref<Task[]>([]);
const checkedSubTasks = ref([]);
const showTaskDetails = ref<boolean>(false);
const editTask = ref<boolean>(false);
const deleteTask = ref<boolean>(false);

const props = defineProps<{
  currentBoardColumns: Column[];
}>();
const emit = defineEmits(["editBoard"]);
const handleEditColumn = () => {
  emit("editBoard");
};

const showTaskDetail = (task: Task) => {
  subTaskModal.value = true;
  currentColumnTask.value = task;
};

const handleInputUpdate = (updatedValue: string, isChecked: boolean) => {
  // let currentTask = currentColumnTask.value.find(c => c.id === updatedValue)
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
</style>
