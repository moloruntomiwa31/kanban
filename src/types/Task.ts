import type Subtask from "./SubTask";
export default interface Task {
  id: string;
  name: string;
  subtasks: Subtask[];
}
