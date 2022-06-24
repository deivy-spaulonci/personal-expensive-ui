import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./comp/home/home.component";
import { ContaComponent } from './comp/conta/conta.component';
import { DespesaComponent } from './components/pag/despesa/despesa.component';
import { FornecedorComponent } from './components/pag/fornecedor/fornecedor.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'despesa', component: DespesaComponent},
  {path:'conta', component: ContaComponent},
  {path:'fornecedor', component: FornecedorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
