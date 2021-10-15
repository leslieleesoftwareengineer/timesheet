import { createAction, props } from "@ngrx/store";
import { Timesheet } from "src/app/domain/class/timesheet";
import { TimesheetType } from "src/app/domain/enums/timesheetType";
import { ITimesheet } from "src/app/domain/interfaces/timesheet";

export const ON_ALL_CHECK = "[Timesheet Component] Check All";
export const ON_ITEM_CHECKED = "[Timesheet Component] Item Checked";
export const START_EDIT = "[Timesheet Component] Start Edit";
export const ON_EDIT_MODEL_CHANGE = "[Timesheet Component] Edit Model Change";
export const ON_EDIT_MODEL_CHANGE_COMPLETED =
  "[Timesheet Component] Edit Model Change Completed";
export const LOAD_TIMESHEET = "[Timesheet Component] Load Timesheet";
export const LOAD_TIMESHEET_SUCCESS =
  "[Timesheet Component] Load Timesheet Success";
export const LOAD_TIMESHEET_ERROR =
  "[Timesheet Component] Load Timesheet Error";

export const onAllChecked = createAction(
  ON_ALL_CHECK,
  props<{ checked: boolean }>()
);

export const onItemChecked = createAction(
  ON_ITEM_CHECKED,
  props<{ id: number; checked: boolean }>()
);

export const startEdit = createAction(START_EDIT, props<{ id: number }>());

export const loadTimesheet = createAction(LOAD_TIMESHEET);
export const loadTimesheetSuccess = createAction(
  LOAD_TIMESHEET_SUCCESS,
  props<{ data: ITimesheet[] }>()
);
export const loadTimesheetError = createAction(LOAD_TIMESHEET_ERROR);

export const onEditModelChange = createAction(
  ON_EDIT_MODEL_CHANGE,
  props<{ data: Timesheet }>()
);