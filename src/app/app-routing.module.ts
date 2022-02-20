import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotePadComponent } from './note-pad/note-pad.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'note-pad', component:  NotePadComponent, canActivate: [AuthGuard] },
  {path: '**', redirectTo: '/note-pad'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
