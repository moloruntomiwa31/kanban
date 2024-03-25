import { defineStore, acceptHMRUpdate } from "pinia";
import { ref, reactive } from "vue";
import { useUser } from "./user";
import { v4 as uuidv4 } from "uuid";
import type Board from "../types/Board";
import type Task from "../types/Task";
// import type Column from "../types/Column";
import { useToast } from "./toast";

export const useCreateBoard = defineStore("useCreateBoard", () => {
  const currentUser = useUser();
  const newBoardName = ref("");
  const numOfColumns = ref(1);
  const columnValues = ref<string[]>([]);
  const numOfSubtasks = ref(1);
  const subTasksData = ref<string[]>([]);
  const newBoards: Array<Board> = reactive([]);
  const toast = useToast();

  const addBoard = (boardName: string, boardColumn: string[]) => {
    const board: Board = {
      id: uuidv4(),
      name: boardName,
      numberOfColumns: numOfColumns.value,
      mainTasks: [] as Task[],
      columns: boardColumn.map((columnName) => ({
        name: columnName,
        tasks: [] as Task[],
      })),
    };
    if (boardName.length < 1 || boardColumn.length < 1) {
      toast.addToast("Datas required!", "error");
      return;
    }
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
    exactBoard: Board
  ) => {
    const task: Task = {
      id: uuidv4(),
      name: title,
      description: description,
      status: status,
      numOfSubtasks: numOfSubtasks.value,
      checkedSubTasks: [],
      subtasks: data.map((d) => ({
        id: uuidv4(),
        name: d,
        isChecked: false,
      })),
    };
    if (
      title.length < 1 ||
      description.length < 1 ||
      status.length < 1 ||
      data.length < 1
    ) {
      toast.addToast("Datas required!", "error");
      return;
    }
    let newColumn = exactBoard.columns.find((c) => c.name == status);
    if (newColumn) {
      newColumn.tasks.push(task);
      exactBoard.mainTasks.push(task)
    }
    numOfSubtasks.value = 1;
    subTasksData.value = [];
    toast.addToast("Task successfully created", "success");
  };

  // Modifying SubTask
  const removeSubtask = (index: number) => {
    numOfSubtasks.value--;
    subTasksData.value.splice(index, 1);
  };
  const updateSubtaskValue = (index: number, value: string) => {
    subTasksData.value[index] = value;
  };
  return {
    removeSubtask,
    updateSubtaskValue,
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

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCreateBoard, import.meta.hot));
}
