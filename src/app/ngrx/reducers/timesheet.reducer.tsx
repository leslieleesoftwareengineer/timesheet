import { createReducer, on } from "@ngrx/store";
import { TimesheetStateType } from "src/app/domain/enums/timesheetStateType";
import { TimesheetType } from "src/app/domain/enums/timesheetType";
import { ITimesheet } from "src/app/domain/interfaces/timesheet";
import {
  IEditCache,
  ITimeSheetState,
} from "src/app/domain/interfaces/timesheetState";
import {
  calcTotalSalary,
  toDurationString,
} from "src/app/helpers/timesheet.helper";
import {
  cancelEdit,
  deleteTimesheet,
  loadTimesheet,
  loadTimesheetError,
  loadTimesheetSuccess,
  newTimesheet,
  onAllChecked,
  onEditModelChange,
  onItemChecked,
  saveEdit,
  startEdit,
  sumbitTimesheet,
} from "../actions/timesheet.action";

export const initialState: ITimeSheetState = {
  list: [],
  editCache: {},
  setOfCheckedId: new Set<number>(),
  allChecked: false,
  loading: false,
};

function updateCheckedSet(
  id: number,
  checked: boolean,
  setOfCheckedId: Set<number>
): void {
  if (checked) {
    setOfCheckedId.add(id);
  } else {
    setOfCheckedId.delete(id);
  }
}

const _timesheetReducer = createReducer(
  initialState,
  on(onAllChecked, (_state: ITimeSheetState, { checked }) => {
    _state.list
      .filter(({ state }) => state === TimesheetStateType.Active)
      .forEach(({ id }) =>
        updateCheckedSet(id, checked, _state.setOfCheckedId)
      );
    return {
      ..._state,
      allChecked: true,
    };
  }),
  on(onItemChecked, (_state: ITimeSheetState, { id, checked }) => {
    updateCheckedSet(id, checked, _state.setOfCheckedId);
    const listOfEnabledData = _state.list.filter(
      ({ state }) => state === TimesheetStateType.Active
    );
    return {
      ..._state,
      allChecked: listOfEnabledData.every(({ id }) =>
        _state.setOfCheckedId.has(id)
      ),
    };
  }),
  on(startEdit, (_state: ITimeSheetState, { id }) => {
    const editCache = { ..._state.editCache };
    editCache[id] = {
      ...editCache[id],
      edit: true,
    };
    return {
      ..._state,
      editCache,
    };
  }),
  on(loadTimesheet, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(onEditModelChange, (state, { id, data }) => {
    const editCache = { ...state.editCache };
    const _data = { ...editCache[id].data, ...data };
    editCache[id] = {
      data: {
        ..._data,
        total: calcTotalSalary(
          _data.durationHours,
          _data.durationMinutes,
          _data.hourlyRate
        ),
        duration: toDurationString(_data.durationHours, _data.durationMinutes),
      },
      edit: true,
    };
    return {
      ...state,
      editCache,
    };
  }),
  on(loadTimesheet, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(loadTimesheetSuccess, (state, { data }) => {
    let editCache: IEditCache = {};
    data.forEach((item) => {
      editCache[item.id] = {
        edit: false,
        data: { ...item },
      };
    });
    return {
      ...state,
      list: data,
      editCache,
      loading: false,
    };
  }),
  on(loadTimesheetError, (state) => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(saveEdit, (state, { id }) => {
    const list = state.list.map((item) => {
      return item.id === id
        ? {
            ...state.editCache[id].data,
          }
        : {
            ...item,
          };
    });
    const editCache = { ...state.editCache };
    editCache[id] = {
      data: {
        ...editCache[id].data,
      },
      edit: false,
    };
    return {
      ...state,
      list,
      editCache,
    };
  }),
  on(deleteTimesheet, (state, { id }) => {
    const list = state.list.filter((item) => item.id !== id);
    let editCache: IEditCache = {};
    list.forEach((item) => {
      editCache[item.id] = {
        edit: false,
        data: { ...item },
      };
    });
    return {
      ...state,
      list,
      editCache,
    };
  }),
  on(cancelEdit, (state, { id }) => {
    const editCache = {
      ...state.editCache,
      [id]: {
        edit: false,
        data: { ...state.list[state.list.findIndex((item) => item.id === id)] },
      },
    };
    return {
      ...state,
      editCache,
    };
  }),
  on(newTimesheet, (state) => {
    const list = [
      {
        id: state.list.length + 1,
        date: "10/15/2021",
        title: "Task1",
        timesheetType: TimesheetType.DraftingDocument,
        durationHours: 1,
        durationMinutes: 0,
        hourlyRate: 250,
        total: 250,
        state: TimesheetStateType.Active,
        duration: "1:00",
      },
    ].concat(state.list);
    let editCache: IEditCache = {};
    list.forEach((item, i) => {
      editCache[item.id] = {
        edit: i === 0,
        data: { ...item },
      };
    });
    return {
      ...state,
      list,
      editCache,
    };
  }),
  on(sumbitTimesheet, (state) => {
    const list = state.list.map((item) =>
      state.setOfCheckedId.has(item.id)
        ? { ...item, state: TimesheetStateType.Submitted }
        : { ...item }
    );
    const setOfCheckedId = new Set<number>();
    return {
      ...state,
      list,
      setOfCheckedId,
      allChecked: false,
    };
  })
);

export function timesheetReducer(
  state: ITimeSheetState | undefined,
  action: any
) {
  return _timesheetReducer(state, action);
}
