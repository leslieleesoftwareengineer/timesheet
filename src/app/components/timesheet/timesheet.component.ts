import { Component, OnInit } from '@angular/core';
import { TimesheetStateType } from 'src/app/domain/enums/timesheetStateType';
import { TimesheetType } from 'src/app/domain/enums/timesheetType';
import { Timesheet } from 'src/app/domain/interfaces/timesheet';

const LIST_OF_DATA = [
  {
    id: 1,
    date: '10/15/2021',
    title: 'Task1',
    type: TimesheetType.DraftingDocument,
    duration: '02:10',
    hourlyRate: 250,
    total: 252.75,
    state: TimesheetStateType.Active,
  },
  {
    id: 2,
    date: '10/15/2021',
    title: 'Task1',
    type: TimesheetType.DraftingDocument,
    duration: '02:10',
    hourlyRate: 250,
    total: 252.75,
    state: TimesheetStateType.Active,
  },
  {
    id: 3,
    date: '10/15/2021',
    title: 'Task1',
    type: TimesheetType.DraftingDocument,
    duration: '02:10',
    hourlyRate: 250,
    total: 252.75,
    state: TimesheetStateType.Submitted,
  },
  {
    id: 4,
    date: '10/15/2021',
    title: 'Task1',
    type: TimesheetType.DraftingDocument,
    duration: '02:10',
    hourlyRate: 250,
    total: 252.75,
    state: TimesheetStateType.Active,
  },
  {
    id: 5,
    date: '10/15/2021',
    title: 'Task1',
    type: TimesheetType.DraftingDocument,
    duration: '02:10',
    hourlyRate: 250,
    total: 252.75,
    state: TimesheetStateType.Active,
  }
]

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetComponent implements OnInit {
  editCache: { [key: string]: { edit: boolean; data: Timesheet } } = {};
  listOfData: Timesheet[] = LIST_OF_DATA;
  listOfCurrentPageData: readonly Timesheet[] = [];
  setOfCheckedId = new Set<number>();
  checked = false;
  indeterminate = false;

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

  constructor() { }

  ngOnInit(): void {
    this.updateEditCache();
  }

  startEdit(id: number): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: number): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false
    };
  }

  saveEdit(id: number): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    Object.assign(this.listOfData[index], this.editCache[id].data);
    this.editCache[id].edit = false;
  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  onAllChecked(checked: boolean): void {
    this.listOfData
      .filter(({ state }) => state === TimesheetStateType.Active)
      .forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  refreshCheckedStatus(): void {
    const listOfEnabledData = this.listOfData.filter(({ state }) => state === TimesheetStateType.Active);
    this.checked = listOfEnabledData.every(({ id }) => this.setOfCheckedId.has(id));
    this.indeterminate = listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked;
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  isTimesheetActive(type: TimesheetStateType){
    return type === TimesheetStateType.Active
  }

  onCurrentPageDataChange(listOfCurrentPageData: readonly Timesheet[]): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
    this.refreshCheckedStatus();
  }
}
