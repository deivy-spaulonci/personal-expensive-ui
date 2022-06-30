
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TabView } from 'primeng/tabview';
import { Despesa } from 'src/app/model/despesa';
import { FormaPagamento } from 'src/app/model/forma-pagamento';
import { Fornecedor } from 'src/app/model/fornecedor';
import { TipoDespesa } from 'src/app/model/tipo-despesa';
import { TipoInformacaoExtra } from 'src/app/model/tipo-informacao-extra';
import { DefaultService } from 'src/app/service/default.service';
import { ContaComponent } from '../conta/conta.component';

@Component({
  selector: 'app-despesa',
  templateUrl: './despesa.component.html',
  styleUrls: ['./despesa.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class DespesaComponent implements OnInit {

  loading: boolean = false;
  selectedTabIndex = 0;
  tiposDespesa: TipoDespesa[] = [];
  formasPagamento: FormaPagamento[] = [];
  fornecedores: Fornecedor[] = [];
  tiposInformacaoExtra: TipoInformacaoExtra[] = [];

  despesaEdtion!: any;

  constructor(private cdref: ChangeDetectorRef,
    private defaultService: DefaultService) { }

  ngOnInit(): void {
    this.loading = true;

    this.despesaEdtion = {} as Despesa;

    this.defaultService.get('tipo-despesa').subscribe(tipos => {
      this.tiposDespesa = tipos;
      this.defaultService.get('fornecedor').subscribe(fornecedores => {
        this.fornecedores = fornecedores;
        this.defaultService.get('forma-pagamento').subscribe(formas => {
          this.formasPagamento = formas;
          this.defaultService.get('tipo-informacao-extra').subscribe(tipos => {
            this.tiposInformacaoExtra = tipos;
            this.loading = false;
          });
        });
      });
    });
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  setTabCadastro(despesa: any, tab: TabView) {
    this.despesaEdtion = {} as Despesa;
    this.despesaEdtion.id = despesa ? despesa.id : null ;
    this.despesaEdtion.tipoDespesa = despesa ? despesa.tipoDespesa : this.tiposDespesa[0];
    this.despesaEdtion.data = despesa ? despesa.data : '';
    this.despesaEdtion.fornecedor = despesa ? despesa.fornecedor : this.fornecedores[0];
    this.despesaEdtion.formaPagamento = despesa ? despesa.formaPagamento : this.formasPagamento[0];
    this.despesaEdtion.valor = despesa ? despesa.valor : '0,00';
    this.despesaEdtion.obs = despesa ? despesa.obs : '';
    this.despesaEdtion.informacaoExtra = despesa ? despesa.informacaoExtra : [];

    tab.activeIndex = despesa ? 1 : 0;
    this.selectedTabIndex = despesa ? 1 : 0;
  }

}
