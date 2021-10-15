import { TimesheetStateType } from "../enums/timesheetStateType";
import { TimesheetType } from "../enums/timesheetType";

export interface ITimesheet extends ITimesheetRespones {
  duration: string;
}
export interface ITimesheetRespones {
  id: number;
  date: string;
  title: string;
  timesheetType: TimesheetType;
  durationHours: number;
  durationMinutes: number;
  hourlyRate: number;
  total: number;
  state: TimesheetStateType;
}
