import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY, of } from "rxjs";
import { map, mergeMap, catchError, mapTo } from "rxjs/operators";
import { ITimesheet } from "src/app/domain/interfaces/timesheet";
import { toDurationString } from "src/app/helpers/timesheet.helper";
import { TimesheetService } from "src/app/services/timesheet.service";
import {
  LOAD_TIMESHEET,
  LOAD_TIMESHEET_ERROR,
  LOAD_TIMESHEET_SUCCESS,
  ON_EDIT_MODEL_CHANGE,
  ON_EDIT_MODEL_CHANGE_COMPLETED,
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
