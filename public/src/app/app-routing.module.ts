import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowAllComponent } from './show-all/show-all.component';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { ShowComponent} from './show/show.component';

const routes: Routes = [
  { path: "", component: ShowAllComponent },
  { path: "new", component: NewComponent },
  { path: "edit/:id", component: EditComponent },
  { path: "show/:id", component: ShowComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
