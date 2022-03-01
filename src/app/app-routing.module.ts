import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotePadComponent } from './note-pad/note-pad.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './services/auth/auth.guard';

const routes: Routes = [
  { path: 'note-pad', component:  NotePadComponent, canActivate: [AuthGuard] },
  { path: 'home', component:  HomeComponent},
  {path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
