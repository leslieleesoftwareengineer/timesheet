import { TimesheetStateType } from "../enums/timesheetStateType";
import { TimesheetType } from "../enums/timesheetType";
import { ITimesheet } from "../interfaces/timesheet";

export class Timesheet implements ITimesheet {
  id!: number;
  date!: string;
  title!: string;
  timesheetType!: TimesheetType;
  duration!: string;
  hourlyRate!: number;
  total!: number;
  state!: TimesheetStateType;
  durationHours!: number;
  durationMinutes!: number;

  constructor() {}
}
