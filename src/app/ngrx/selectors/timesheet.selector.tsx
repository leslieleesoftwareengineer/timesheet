import { createSelector } from "@ngrx/store";
import { TimesheetStateType } from "src/app/domain/enums/timesheetStateType";
import { IAppState } from "src/app/domain/interfaces/appState";

export const selectIndeterminate = (state: IAppState) => {
  const listOfEnabledData = state.timesheet.list.filter(
    ({ state }) => state === TimesheetStateType.Active
  );
  const checked = listOfEnabledData.every(({ id }) =>
    state.timesheet.setOfCheckedId.has(id)
  );

  return (
    listOfEnabledData.some(({ id }) =>
      state.timesheet.setOfCheckedId.has(id)
    ) && !checked
  );
};
