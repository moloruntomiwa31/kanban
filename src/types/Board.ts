import type Column from "./Column";
import type Task from "./Task";
export default interface Board {
  name: string;
  id: string;
  mainTasks: Task[]
  numberOfColumns: number;
  columns: Column[];
}
