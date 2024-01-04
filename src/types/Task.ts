import type Subtask from "./SubTask";
export default interface Task {
  id: string;
  name: string;
  description: string
  numOfSubtasks: number
  subtasks: Subtask[];
}
