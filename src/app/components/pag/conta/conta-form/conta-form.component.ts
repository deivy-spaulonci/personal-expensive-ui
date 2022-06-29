import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Conta } from 'src/app/model/conta';
import { FormaPagamento } from 'src/app/model/forma-pagamento';
import { Fornecedor } from 'src/app/model/fornecedor';
import { LancamentoContaCartao } from 'src/app/model/lancamento-conta-cartao';
import { TipoConta } from 'src/app/model/tipo-conta';
import { DefaultService } from 'src/app/service/default.service';
import { Util } from 'src/app/util/util';

@Component({
  selector: 'app-conta-form',
  templateUrl: './conta-form.component.html',
  styleUrls: ['./conta-form.component.css']
})
export class ContaFormComponent implements OnInit {

  @Input() loading: boolean = false;
  util: Util = new Util();

  @Input() contaCadastro!: any;
  lancamentoContaCartaoCadastro!:any
  contaForm!: FormGroup;

  @Input() tiposConta: TipoConta[]=[];
  @Input() formasPagamento: FormaPagamento[] = [];
  @Input() lancamentosContaCartao: LancamentoContaCartao[]=[];
  @Input() fornecedores: Fornecedor[]=[];

  inputValor = new FormControl('');
  comboTipoConta = new FormControl('');
  comboFormaPagamento = new FormControl('');
  inputEmissao = new FormControl('');
  inputVencimento = new FormControl('');
  inputDataPagamento = new FormControl('');
  inputValorPago = new FormControl('');

  @Output() submitFormEmmit: EventEmitter<any> = new EventEmitter<any>();

  constructor(private defaultService: DefaultService,
    private messageService: MessageService,
    private cdref: ChangeDetectorRef,
    private fb: FormBuilder) {
    this.contaCadastro ={} as Conta;
    this.contaCadastro.tipoCona = {} as TipoConta;
    this.lancamentoContaCartaoCadastro = {} as LancamentoContaCartao;
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
}

  ngOnInit(): void {
    this.contaForm = this.fb.group({
      inputNumero: new FormControl('', Validators.required),
      inputCodigoBarra: '',
      inputParcela: '',
      inputTotalParcela: '',
      inputObservacao: '',
    });

  }

  transformConta(conta:Conta):Conta{
    conta.vencimento = this.util.transformDates(conta.vencimento);
    conta.emissao = this.util.transformDates(conta.emissao);
    conta.valor = this.util.ajustCurrencyForBase(conta.valor);
    if(conta.dataPagamento && conta.valorPago){
      conta.valorPago = this.util.ajustCurrencyForBase(conta.valorPago);
      conta.dataPagamento = this.util.transformDates(conta.dataPagamento);
    }else{
      conta.valorPago = 0;
      conta.dataPagamento = '';
    }
    return conta;
  }
  
  onSubmit() {
    this.loading = true;
    
    this.contaCadastro = this.transformConta(this.contaCadastro);
    this.defaultService.save('conta', this.contaCadastro).subscribe(resultado =>{    
        this.loading = false;
        this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Conta salva com sucesso'});
        if(this.contaCadastro.id){
          this.submitFormEmmit.emit(null);
        }
    });  
  }

}
