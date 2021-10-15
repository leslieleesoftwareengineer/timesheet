import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TimesheetStateType } from '../domain/enums/timesheetStateType';
import { TimesheetType } from '../domain/enums/timesheetType';
import { ITimesheetRespones } from '../domain/interfaces/timesheet';
import { minutesRoundUp } from '../helpers/timesheet.helper';
const INITIAL_LIST: ITimesheetRespones[] = [
  {
    id: 1,
    date: "10/15/2021",
    title: "Task1",
    timesheetType: TimesheetType.DraftingDocument,
    durationHours: 2,
    durationMinutes: 20,
    hourlyRate: 250,
    total: 252.75,
    state: TimesheetStateType.Active,
  }
];

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

  constructor() { }

  getAll() {
    var ob = new Observable<ITimesheetRespones[]>(subscriber => {
      setTimeout(() => {
        subscriber.next(INITIAL_LIST);
        subscriber.complete();
      }, 0);
    });
    return ob;
  }

}
