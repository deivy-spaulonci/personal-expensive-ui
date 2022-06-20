import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Conta } from 'src/app/model/conta';
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

  loading!: boolean;
  tabSelected:number = 0;
  //********************************************** TABELA */
  pageNumber = 0;
  pageSize = 10;
  totalElements = 0;
  util: Util = new Util();

  totalValor!: number;
  contaSelecionada!: Conta;
  //********************************************** CADASTRO */
  contaCadastro!:any
  contaForm!:FormGroup;

  contas: Conta[]=[];
  tiposConta: TipoConta[]=[];
  lancamentosContaCartao: LancamentoContaCartao[]=[];
  
  constructor(private defaultService: DefaultService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder) {
      this.contaCadastro ={} as Conta;
     }

  ngOnInit(): void {
    this.loading = true;
    this.contaForm = this.fb.group({

    });

    this.defaultService.get('tipo-conta').subscribe(tipos =>{
      this.tiposConta = tipos;
    });
  }

  changeTab(event: any){
    // if(event.index==0){
    //   this.newDespesaCadastro();
    // }
  }

  maskaraMoeda($event: KeyboardEvent) {
    const element = ( $event.target as HTMLInputElement);
    element.value = this.util.formatFloatToReal(element.value);
  }

  loadData(event: LazyLoadEvent) {
    this.loading = true;

    let urlfiltros: string = '';

    if (event.filters) {
      let filtros = event.filters;
      if (filtros?.['id'] && filtros?.['id'].value!=null) {
        urlfiltros += '&id=' + filtros?.['id'].value;
      }
      if (filtros?.['tipoConta'] && filtros?.['tipoConta'].value.id) {
        urlfiltros += '&tipoConta.id=' + filtros?.['tipoConta'].value.id;
      }
      if(filtros?.['periodoVencimento']){
        if (filtros?.['periodoVencimento'].value && filtros?.['periodoVencimento'].value[0]) {
          urlfiltros += '&vencimentoInicial=' + filtros?.['periodoVencimento'].value[0].toISOString().split('T')[0];
        }
        if (filtros?.['periodoVencimento'].value && filtros?.['periodoVencimento'].value[1]) {
          urlfiltros += '&vencimentoFinal=' + filtros?.['periodoVencimento'].value[1].toISOString().split('T')[0];
        }
      }
      if(filtros?.['periodoEmissao']){
        if (filtros?.['periodoEmissao'].value && filtros?.['periodoEmissao'].value[0]) {
          urlfiltros += '&emissaoInicial=' + filtros?.['periodoEmissao'].value[0].toISOString().split('T')[0];
        }
        if (filtros?.['periodoEmissao'].value && filtros?.['periodoEmissao'].value[1]) {
          urlfiltros += '&emissaoFinal=' + filtros?.['periodoEmissao'].value[1].toISOString().split('T')[0];
        }
      }
    }

    event.rows = (event.rows ? event.rows : this.pageSize);
    event.sortField = (event.sortField ? event.sortField : 'vencimento');

    if (event.first!=undefined)
      this.pageNumber = (event.first + event.rows) / event.rows -1;

    const url: string = 'conta/page?page=' + this.pageNumber
      + '&size=' + event.rows
      + '&sort=' + event.sortField + ',' + (event.sortOrder == 1 ? 'asc' : 'desc')
      + urlfiltros;

    this.defaultService.get(url).subscribe(resultado => {
      this.contas = resultado.content;
      this.totalElements = resultado.totalElements;

      this.loading = false;
      this.defaultService.get('conta/valorTotal?' + urlfiltros).subscribe(somatotal => {
        this.totalValor = somatotal;
      });
    });
  }

  onSubmit(value: string, table:Table) {
    // this.loading = true;
    // this.despesaCadastro.data = this.util.transformDates(this.despesaCadastro.data);
    // this.despesaCadastro.valor = this.util.formatMoedaToFloat(this.util.formatFloatToReal(this.despesaCadastro.valor.toString()));
   
    // this.defaultService.save('despesa', this.despesaCadastro).subscribe(resultado =>{    
    //     this.loading = false;
    //     this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Despesa salva com sucesso'});
    //     if(this.despesaCadastro.id){
    //       this.tabSelected = 0;
    //       table.filter(null, '', '');
    //     }
    //     this.newDespesaCadastro();
    //     this.dayOfWeekend = '';
    // });  
  }

  excluirConta(){
    
    console.log('est açsdlfa sl');
    // this.confirmationService.confirm({
    //   accept: () => {
    //     this.defaultService
    //       .delete('despesa', this.despesaSelecionada.id)
    //       .subscribe(resultado =>{
    //         this.despesas = this.despesas.filter(val => val.id !== this.despesaSelecionada.id);
    //         this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Despesa excluída'});
    //     });
    //   }
    // });
  }

  onEditSave(conta: any) {
    // this.tabSelected = 1;
    // this.despesaCadastro = Object.assign({}, despesa);
    // this.despesaCadastro.data = this.util.transformDates(this.despesaCadastro.data)
    // if(this.despesaCadastro.valor.toString().length==2){
    //   this.despesaCadastro.valor = this.util.formatFloatToReal(this.despesaCadastro.valor.toString()+'00');
    // }
  }

}
