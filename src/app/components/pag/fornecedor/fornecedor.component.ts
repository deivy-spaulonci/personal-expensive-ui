import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TabView } from 'primeng/tabview';
import { Fornecedor } from 'src/app/model/fornecedor';
import { DefaultService } from 'src/app/service/default.service';

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class FornecedorComponent implements OnInit {

  loading: boolean = false;
  selectedTabIndex = 0;

  fornecedorEdicao!: any;

  constructor(private defaultService: DefaultService) { }

  ngOnInit(): void {
    this.fornecedorEdicao = {} as Fornecedor;
  }

  setTabCadastro(fornecedor: any, tab: TabView) {
    // if (despesa) {
    //   this.despesaEdicao = despesa;
    //   tab.activeIndex = 1;
    //   this.selectedTabIndex = 1;
    //   tab.tabs[1].selected = true;
    // } else {
    //   this.despesaEdicao = {};
    //   this.despesaEdicao.tipoDespesa = this.tiposDespesa[0];
    //   this.despesaEdicao.data = ''
    //   this.despesaEdicao.fornecedor = this.fornecedores[0];
    //   this.despesaEdicao.formaPagamento = this.formasPagamento[0];
    //   this.despesaEdicao.valor = '0,00';

    //   tab.activeIndex = 0;
    // }
  }

}
