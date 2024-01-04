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
              {{ checkedSubTasks.length }} of {{ tasks.subtasks.length }} subtasks
            </p>
          </div>
        </div>
      </div>
    </div>
    <div
      @click="handleEditColumn"
      class="min-w-[280px] bg-purple-100 font-extrabold text-lg lg:text-2xl max-h-full empty-text hover:cursor-pointer"
    >
      <i class="bx bx-plus text-xl font-extrabold"></i>New Column
    </div>
  </div>
  <Modal @closeModal="subTaskModal = false" v-if="subTaskModal">
    <template #header>
      <div class="flex justify-between">
        <h3 class="capitalize font-bold text-xl text-[#b365b3]">
          {{ currentColumnTask.name }}
        </h3>
        <button>
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
        Subtasks ({{ checkedSubTasks.length }} of {{ currentColumnTask.subtasks.length }})
      </p>
      <CheckBoxComponent :subtask="subtask"
      @updateCheckBox="handleInputUpdate"
        v-for="subtask in currentColumnTask.subtasks"
      />
      {{ checkedSubTasks }}
      <p class="block">
        <label>Current Status</label>
        <select
          class="block w-full outline-[#a8a4ff] border-1 border-[#828FA3] p-3 rounded-lg hover:cursor-pointer"
        >
          <option v-for="data in currentBoardColumns">{{ data.name }}</option>
        </select>
      </p>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type Column from "../../types/Column.ts";
import type Task from "../../types/Task.ts";
import Modal from "../dashboard/Modal.vue";
import CheckBoxComponent from "../task/CheckBoxComponent.vue"

const subTaskModal = ref<boolean>(false);
const currentColumnTask = ref([]);
const checkedSubTasks = ref([])

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
  if (isChecked) {
    if (!(checkedSubTasks.value.includes(updatedValue))){
      checkedSubTasks.value = [...checkedSubTasks.value, updatedValue];
    }
    else {
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
