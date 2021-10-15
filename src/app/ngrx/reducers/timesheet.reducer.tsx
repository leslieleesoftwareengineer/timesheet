import { createReducer, on } from "@ngrx/store";
import { decrement, increment, reset } from "../actions/timesheet.action";

export const initialState = 0;

const _timesheetReducer = createReducer(
  initialState,
  on(increment, (state) => state + 1),
  on(decrement, (state) => state - 1),
  on(reset, (state) => 0)
);

export function timesheetReducer(state: any, action: any) {
  return _timesheetReducer(state, action);
}
