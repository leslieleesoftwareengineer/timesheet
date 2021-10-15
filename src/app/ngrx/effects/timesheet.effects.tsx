import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { toDurationString } from "src/app/helpers/timesheet.helper";
import { TimesheetService } from "src/app/services/timesheet.service";
import {
  LOAD_TIMESHEET,
  LOAD_TIMESHEET_ERROR,
  LOAD_TIMESHEET_SUCCESS
} from "../actions/timesheet.action";

@Injectable()
export class TimesheetEffects {
  loadTimesheet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LOAD_TIMESHEET),
      mergeMap(() =>
        this.timesheetService.getAll().pipe(
          map((timesheet) => ({
            type: LOAD_TIMESHEET_SUCCESS,
            data: timesheet.map((value) => ({
              ...value,
              duration: toDurationString(
                value.durationHours,
                value.durationMinutes
              ),
            })),
          })),
          catchError(() => of({ type: LOAD_TIMESHEET_ERROR }))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private timesheetService: TimesheetService
  ) {}
}
