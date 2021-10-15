import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TimesheetStateType } from 'src/app/domain/enums/timesheetStateType';
import { TimesheetType } from 'src/app/domain/enums/timesheetType';
import { ITimesheet } from 'src/app/domain/interfaces/timesheet';
import { ITimeSheetState } from 'src/app/domain/interfaces/timesheetState';
import { cancelEdit, deleteTimesheet, loadTimesheet, newTimesheet, onAllChecked, onEditModelChange, onItemChecked, saveEdit, startEdit, sumbitTimesheet } from 'src/app/ngrx/actions/timesheet.action';
import { selectDisabledNewButton, selectIndeterminate } from 'src/app/ngrx/selectors/timesheet.selector';

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
  disabedNewButton$: Observable<any> = this.store.pipe(map(state => selectDisabledNewButton(state)));
  validateForm!: FormGroup;

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

  submitForm(a: any) {
    console.log(a)
  }

  cancelEdit(id: number): void {
    this.store.dispatch(cancelEdit({ id }))
  }

  newTimesheet() {
    this.store.dispatch(newTimesheet())
  }

  saveEdit(id: number): void {
    this.store.dispatch(saveEdit({ id }))
  }

  delete(id: number) {
    this.store.dispatch(deleteTimesheet({ id }))
  }

  sumbitTimesheet() {
    this.store.dispatch(sumbitTimesheet())
  }

  onAllChecked(checked: boolean): void {
    this.store.dispatch(onAllChecked({ checked }))
  }

  onItemChecked(id: number, checked: boolean): void {
    this.store.dispatch(onItemChecked({ id, checked }))
  }

  onEditModelChange(data: any, id: number) {
    this.store.dispatch(onEditModelChange({ id, data }))
  }

  isTimesheetActive(type: TimesheetStateType) {
    return type === TimesheetStateType.Active
  }

  onCurrentPageDataChange(listOfCurrentPageData: readonly ITimesheet[]): void {
  }
}
