import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TimesheetStateType } from 'src/app/domain/enums/timesheetStateType';
import { TimesheetType } from 'src/app/domain/enums/timesheetType';
import { ITimesheet } from 'src/app/domain/interfaces/timesheet';
import { ITimeSheetState } from 'src/app/domain/interfaces/timesheetState';
import { loadTimesheet, LOAD_TIMESHEET, onAllChecked, onEditModelChange, onItemChecked, startEdit } from 'src/app/ngrx/actions/timesheet.action';
import { selectIndeterminate } from 'src/app/ngrx/selectors/timesheet.selector';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetComponent implements OnInit {
  listOfData$: Observable<any> = this.store.select(state => state.timesheet.list);
  editCache$: Observable<any> = this.store.select(state => state.timesheet.editCache);
  setOfCheckedId$: Observable<any> = this.store.select(state => state.timesheet.setOfCheckedId);
  allChecked$: Observable<any> = this.store.select(state => state.timesheet.allChecked);
  indeterminate$: Observable<any> = this.store.pipe(map(state => selectIndeterminate(state)));
  loading$: Observable<any> = this.store.select(state => state.timesheet.loading);

  typeOptions = [
    {
      label: TimesheetType.DraftingDocument,
      value: TimesheetType.DraftingDocument
    },
    {
      label: TimesheetType.Research,
      value: TimesheetType.Research
    },
    {
      label: TimesheetType.TelephoneCall,
      value: TimesheetType.TelephoneCall
    }
  ]

  hours = new Array(12);
  mins = new Array(60);

  constructor(private store: Store<{ timesheet: ITimeSheetState }>) {
    this.store.dispatch(loadTimesheet())
  }

  ngOnInit(): void {
    // this.updateEditCache();
  }

  startEdit(id: number): void {
    this.store.dispatch(startEdit({ id }))
  }

  cancelEdit(id: number): void {
    // const index = this.listOfData.findIndex(item => item.id === id);
    // this.editCache[id] = {
    //   data: { ...this.listOfData[index] },
    //   edit: false
    // };
  }

  saveEdit(id: number): void {
    // const index = this.listOfData.findIndex(item => item.id === id);
    // Object.assign(this.listOfData[index], this.editCache[id].data);
    // this.editCache[id].edit = false;
  }

  updateEditCache(): void {
    // this.listOfData.forEach(item => {
    //   this.editCache[item.id] = {
    //     edit: false,
    //     data: { ...item }
    //   };
    // });
  }

  onAllChecked(checked: boolean): void {
    this.store.dispatch(onAllChecked({ checked }))
    // this.listOfData
    //   .filter(({ state }) => state === TimesheetStateType.Active)
    //   .forEach(({ id }) => this.updateCheckedSet(id, checked));
    // this.refreshCheckedStatus();
  }


  onItemChecked(id: number, checked: boolean): void {
    this.store.dispatch(onItemChecked({ id, checked }))
    // this.updateCheckedSet(id, checked);
    // this.refreshCheckedStatus();
  }

  onEditModelChange(value: any, data: ITimesheet) {
    console.log({ ...data, ...value })
    this.store.dispatch(onEditModelChange({ data: { ...data, ...value } }))
  }

  isTimesheetActive(type: TimesheetStateType) {
    return type === TimesheetStateType.Active
  }

  onCurrentPageDataChange(listOfCurrentPageData: readonly ITimesheet[]): void {
  }
}
