import { ITimesheet } from "./timesheet";

export interface ITimeSheetState {
  list: ITimesheet[];
  editCache: IEditCache;
  setOfCheckedId: Set<number>;
  allChecked: boolean;
  loading: boolean;
}

export interface IEditCache {
  [key: string]: { edit: boolean; data: ITimesheet };
}
