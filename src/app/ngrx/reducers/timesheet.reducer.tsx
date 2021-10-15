import { createReducer, on } from "@ngrx/store";
import { TimesheetStateType } from "src/app/domain/enums/timesheetStateType";
import { TimesheetType } from "src/app/domain/enums/timesheetType";
import { ITimesheet } from "src/app/domain/interfaces/timesheet";
import {
  IEditCache,
  ITimeSheetState,
} from "src/app/domain/interfaces/timesheetState";
import {
  loadTimesheet,
  loadTimesheetError,
  loadTimesheetSuccess,
  onAllChecked,
  onEditModelChange,
  onItemChecked,
  startEdit,
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
  on(onEditModelChange, (state, { data }) => {
    console.log(data);
    const editCache = { ...state.editCache };
    editCache[data.id] = {
      data: {
        ...editCache[data.id].data,
        total: data.total,
      },
      edit: true,
    };
    return {
      ...state,
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
  })
);

export function timesheetReducer(
  state: ITimeSheetState | undefined,
  action: any
) {
  return _timesheetReducer(state, action);
}
