
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TabView } from 'primeng/tabview';
import { Despesa } from 'src/app/model/despesa';
import { FormaPagamento } from 'src/app/model/forma-pagamento';
import { Fornecedor } from 'src/app/model/fornecedor';
import { TipoDespesa } from 'src/app/model/tipo-despesa';
import { TipoInformacaoExtra } from 'src/app/model/tipo-informacao-extra';
import { DefaultService } from 'src/app/service/default.service';

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

  despesaEdicao!: any;

  constructor(private cdref: ChangeDetectorRef,
    private defaultService: DefaultService) { }

  ngOnInit(): void {
    this.loading = true;

    this.despesaEdicao = {} as Despesa;

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
    if (despesa) {
      this.despesaEdicao = despesa;
      tab.activeIndex = 1;
      this.selectedTabIndex = 1;
      tab.tabs[1].selected = true;
    } else {
      this.despesaEdicao = {};
      this.despesaEdicao.tipoDespesa = this.tiposDespesa[0];
      this.despesaEdicao.data = ''
      this.despesaEdicao.fornecedor = this.fornecedores[0];
      this.despesaEdicao.formaPagamento = this.formasPagamento[0];
      this.despesaEdicao.valor = '0,00';

      tab.activeIndex = 0;
    }
  }

}
