import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import { useUser } from "./user";
import { v4 as uuidv4 } from "uuid";
import type Board from "../types/Board";
// import type Task from "../types/Task";
import { useColumn } from "./column";
// import type { Column } from "../types/Column";
import { useToast } from "./toast";
import { useRouter } from "vue-router";

export const useCreateBoard = defineStore("useCreateBoard", () => {
  const columnStore = useColumn()
  const currentUser = useUser();
  const newBoardName = ref("");
  const numOfColumns = ref(1)
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
        tasks: []
      })),
    };
    newBoards.unshift(board);
    newBoardName.value = "";
    numOfColumns.value = 1
    currentUser.createNewBoard = false;
    toast.addToast("You've successfully created a board!", "success");
  };
  return { newBoardName, newBoards, addBoard, numOfColumns };
});
