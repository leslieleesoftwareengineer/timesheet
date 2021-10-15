import { TimesheetStateType } from "../enums/timesheetStateType";
import { TimesheetType } from "../enums/timesheetType";

export interface Timesheet {
  id: number;
  date: string;
  title: string;
  type: TimesheetType;
  duration: string;
  hourlyRate: number;
  total: number;
  state: TimesheetStateType;
}
