import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorInfoComponent } from './components/author-info/author-info.component';

const routes: Routes = [
  { path: '', redirectTo: 'author', pathMatch: "full" },
  {
    path: 'author',
    component: AuthorInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
