import { defineStore, acceptHMRUpdate } from "pinia";
import { ref, reactive } from "vue";
import { useUser } from "./user";
import { v4 as uuidv4 } from "uuid";
import type Board from "../types/Board";
import type Task from "../types/Task";
import type Column from "../types/Column";
import { useToast } from "./toast";
import { useRouter } from "vue-router";

export const useCreateBoard = defineStore("useCreateBoard", () => {
  const currentUser = useUser();
  const newBoardName = ref("");
  const numOfColumns = ref(1);
  const columnValues = ref<string[]>([]);
  const numOfSubtasks = ref(1);
  const subTasksData = ref<string[]>([]);
  const newBoards: Array<Board> = reactive([]);
  const toast = useToast();
  const router = useRouter();

  const addBoard = (boardName: string, boardColumn: string[]) => {
    const board: Board = {
      id: uuidv4(),
      name: boardName,
      numberOfColumns: numOfColumns.value,
      columns: boardColumn.map((columnName) => ({
        name: columnName,
        tasks: [] as Task[],
      })),
    };
    newBoards.unshift(board);
    newBoardName.value = "";
    numOfColumns.value = 1;
    columnValues.value = [];
    currentUser.createNewBoard = false;
    toast.addToast("You've successfully created a board!", "success");
  };

  const createTask = (
    title: string,
    description: string,
    status: string,
    data: string[],
    exactColumn: Column
  ) => {
    exactColumn?.tasks.push({
      id: uuidv4(),
      name: title,
      description: description,
      numOfSubtasks: numOfSubtasks.value,
      subtasks: data.map((d) => ({
        id: uuidv4(),
        name: d,
        isChecked: false,
      })),
    });
    numOfSubtasks.value = 1;
    subTasksData.value = [];
    toast.addToast("Task successfully created", "success");
  };
  return {
    newBoardName,
    newBoards,
    addBoard,
    numOfColumns,
    columnValues,
    createTask,
    numOfSubtasks,
    subTasksData,
  };
});
