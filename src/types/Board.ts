import type Column from "./Column";
export default interface Board {
  name: string;
  id: string;
  numberOfColumns: number;
  columns: Column[];
}
