import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TabView } from 'primeng/tabview';
import { Conta } from 'src/app/model/conta';
import { FormaPagamento } from 'src/app/model/forma-pagamento';
import { Fornecedor } from 'src/app/model/fornecedor';
import { LancamentoContaCartao } from 'src/app/model/lancamento-conta-cartao';
import { TipoConta } from 'src/app/model/tipo-conta';
import { DefaultService } from 'src/app/service/default.service';
import { Util } from 'src/app/util/util';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ContaComponent implements OnInit {

  loading: boolean = false;
  selectedTabIndex = 0;
  util: Util = new Util();

  contaEdtion!: any;

  tiposConta: TipoConta[] = [];
  formasPagamento: FormaPagamento[] = [];
  lancamentosContaCartao: LancamentoContaCartao[] = [];
  fornecedores: Fornecedor[] = [];

  constructor(private cdref: ChangeDetectorRef,
    private defaultService: DefaultService) {

  }

  ngOnInit(): void {
    this.loading = true;

    this.contaEdtion = {} as Conta;

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

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  setTabCadastroAction(conta: any, tab: TabView) {
    this.contaEdtion = {} as Conta;
    if(conta){
      this.contaEdtion = conta;
      this.contaEdtion.emissao = conta ? this.util.transformDates(conta.emissao) : '';
      this.contaEdtion.vencimento = conta ? this.util.transformDates(conta.vencimento) : '';
      this.contaEdtion.valor = conta ? this.util.formatFloatToReal(conta.valor.toString()) : '0';
      if(conta.valorPago && conta.dataPagamento){
        this.contaEdtion.dataPagamento = this.util.transformDates(conta.dataPagamento);
      }
      tab.activeIndex = 1;
      this.selectedTabIndex = 1;
    }else{
      this.contaEdtion.tipoCona = this.tiposConta[0];
      this.contaEdtion.FormaPagamento = this.formasPagamento[0];
      this.contaEdtion.cancelado = false;
      this.contaEdtion.lancamentoContaCartao = [];
      tab.activeIndex = 0;
      this.selectedTabIndex = 0;
    }
  }

}
