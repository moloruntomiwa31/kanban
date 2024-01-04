import { defineStore } from "pinia";
import { ref } from "vue";

export const useColumn = defineStore("useColumn", () => {
  const numOfColumns = ref(1);
  const numOfSubTasks = ref(1);

  const incrementColumn = () => {
    numOfColumns.value += 1;
  };
  const decrementColumn = () => {
    numOfColumns.value -= 1;
  };
  const incrementSubTask = () => {
    numOfSubTasks.value += 1;
  };
  const decrementSubTask = () => {
    numOfSubTasks.value -= 1;
  };

  return {
    numOfColumns,
    incrementColumn,
    decrementColumn,
    incrementSubTask,
    decrementSubTask,
    numOfSubTasks,
  };
});
