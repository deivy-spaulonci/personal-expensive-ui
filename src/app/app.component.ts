import {Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from "primeng/api";
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  items: MenuItem[] = [];

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.items = [{
      label: 'Payment',
      items:[
        {label: 'Despesa', icon: 'pi pi-fw pi-home', routerLink: ['/despesa-list']},
        {label: 'Contas', icon: 'pi pi-fw pi-money-bill', routerLink: ['/conta']},
        {label: 'Fornecedor', icon: 'pi pi-fw pi-box', routerLink: ['/fornecedor']},
        {label: 'Forma Pagamento', icon: 'pi pi-fw pi-credit-card'}
      ]
    }];
  }

}
