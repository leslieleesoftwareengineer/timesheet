import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/timesheet',
    pathMatch: 'full'
  },
  {
    path: 'timesheet',
    loadChildren: () => import('./components/timesheet/timesheet.module').then(m => m.TimesheetModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
