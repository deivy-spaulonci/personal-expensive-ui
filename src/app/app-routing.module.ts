import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./comp/home/home.component";
import {DespesaListComponent} from "./comp/despesa/despesa-list/despesa-list.component";

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'despesa-list', component: DespesaListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
