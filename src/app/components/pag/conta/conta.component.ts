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

  contaEdicao!: any;

  tiposConta: TipoConta[] = [];
  formasPagamento: FormaPagamento[] = [];
  lancamentosContaCartao: LancamentoContaCartao[] = [];
  fornecedores: Fornecedor[] = [];

  constructor(private cdref: ChangeDetectorRef,
    private defaultService: DefaultService) {

  }

  ngOnInit(): void {
    this.loading = true;

    this.contaEdicao = {} as Conta;

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

  setTabCadastro(conta: any, tab: TabView) {

    this.contaEdicao = {} as Conta;
    this.contaEdicao.id = conta ? conta.id : null;
    this.contaEdicao.codigoBarra = conta ? conta.codigoBarra : '';
    this.contaEdicao.numero = conta ? conta.numero : '';
    this.contaEdicao.tipoConta = conta ? conta.tipoConta : this.tiposConta[0];
    this.contaEdicao.emissao = conta ? this.util.transformDates(conta.emissao) : '';
    this.contaEdicao.vencimento = conta ? this.util.transformDates(conta.vencimento) : '';
    this.contaEdicao.parcela = conta ? conta.parcela : 0;
    this.contaEdicao.totalParcela = conta ? conta.totalParcela : 0;
    this.contaEdicao.valor = conta ? this.util.formatFloatToReal(conta.valor.toString()) : '0,00';
    this.contaEdicao.dataPagamento = (conta && conta.dataPagamento) ?
      this.util.transformDates(conta.dataPagamento) : '';
    this.contaEdicao.formaPagamento = (conta && conta.formaPagamento) ?
      conta.formaPagamento : this.formasPagamento[0];
    this.contaEdicao.valorPago = (conta && conta.valorPago) ?
      conta.valorPago : '0,00';
    this.contaEdicao.cancelado = conta ? conta.cancelado : false;
    this.contaEdicao.obs = conta ? conta.obs : '';
    this.contaEdicao.idCancelamento = conta ? conta.idCancelamento : null;
    this.contaEdicao.lancamentoContaCartao = [];
    
    tab.activeIndex = conta ? 1 : 0;
    this.selectedTabIndex = conta ? 1 : 0;
    tab.tabs[1].selected = conta ? true : false;
  }

}
