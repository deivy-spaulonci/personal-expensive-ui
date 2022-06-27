import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TabView } from 'primeng/tabview';
import { FormaPagamento } from 'src/app/model/forma-pagamento';
import { Fornecedor } from 'src/app/model/fornecedor';
import { LancamentoContaCartao } from 'src/app/model/lancamento-conta-cartao';
import { TipoConta } from 'src/app/model/tipo-conta';
import { DefaultService } from 'src/app/service/default.service';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ContaComponent implements OnInit {

  loading: boolean = false;
  selectedTabIndex = 0;

  tiposConta: TipoConta[] = [];
  formasPagamento: FormaPagamento[] = [];
  lancamentosContaCartao: LancamentoContaCartao[] = [];
  fornecedores: Fornecedor[] = [];

  constructor(private cdref: ChangeDetectorRef,
    private defaultService: DefaultService) { }

  ngOnInit(): void {
    this.loading = true;

    this.defaultService.get('tipo-conta').subscribe(tipos => {
      this.tiposConta = tipos;
      this.defaultService.get('forma-pagamento').subscribe(formas => {
        this.formasPagamento = formas;
        this.defaultService.get('fornecedor').subscribe(fornecedores => {
          this.fornecedores = fornecedores;
          this.loading = false;
        });
      });
    });
  }

  // ngAfterContentChecked() {
  //   this.cdref.detectChanges();
  // }

  setTabCadastro(despesa: any, tab: TabView) {
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
