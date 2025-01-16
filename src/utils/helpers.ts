import { Data } from "../constant/table";
import { Order } from "../types/table";

export function createData(
    id: number,
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number
  ): Data {
    return {
      id,
      name,
      calories,
      fat,
      carbs,
      protein,
    };
  }



  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

 export  function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
  ): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
  ) => number {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }