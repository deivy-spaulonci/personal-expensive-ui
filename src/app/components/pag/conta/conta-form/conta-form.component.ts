import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Conta } from 'src/app/model/conta';
import { FormaPagamento } from 'src/app/model/forma-pagamento';
import { Fornecedor } from 'src/app/model/fornecedor';
import { LancamentoContaCartao } from 'src/app/model/lancamento-conta-cartao';
import { TipoConta } from 'src/app/model/tipo-conta';
import { DefaultService } from 'src/app/service/default.service';
import { Util } from 'src/app/util/util';
import { Validation } from 'src/app/util/validation';

@Component({
  selector: 'app-conta-form',
  templateUrl: './conta-form.component.html',
  styleUrls: ['./conta-form.component.css']
})
export class ContaFormComponent implements OnInit {

  @Input() loading: boolean = false;
  util: Util = new Util();
  validation: Validation = new Validation();

  @Input() contaRegistration!: any;
  lancamentoContaCartaoRegistration!:any
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
    private fb: FormBuilder) {
    this.contaRegistration ={} as Conta;
    this.contaRegistration.tipoCona = {} as TipoConta;
    this.lancamentoContaCartaoRegistration = {} as LancamentoContaCartao;
    this.lancamentoContaCartaoRegistration.fornecedor = this.fornecedores[0];
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

  ajustContaForSave(conta:Conta):Conta{
    conta.vencimento = this.util.transformDates(conta.vencimento);
    conta.emissao = this.util.transformDates(conta.emissao);
    conta.parcela = conta.parcela ? conta.parcela : 0;
    conta.totalParcela = conta.totalParcela ? conta.totalParcela : 0;
    
    if(conta.dataPagamento && conta.valorPago){
      conta.valorPago = this.util.ajustCurrencyForBase(conta.valorPago);
      conta.dataPagamento = this.util.transformDates(conta.dataPagamento);
    }else{
      conta.valorPago = 0;
      conta.dataPagamento = '';
    }
    if(!conta.tipoConta.contaCartao){
      conta.lancamentoContaCartao = [];
    }
    return conta;
  }
  
  onSubmitForm(value: string) {
    this.loading = true;
    this.contaRegistration = this.ajustContaForSave(this.contaRegistration);


    // this.defaultService.save('conta', this.contaRegistration).subscribe(resultado =>{    
    //     this.loading = false;
    //     this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Conta salva com sucesso'});
    //     if(this.contaRegistration.id){
    //       this.submitFormEmmit.emit(null);
    //     }
    // });  
  }

  addLancamentoContaCartao(){
    if(!this.validation.dateIsValid(this.util.transformDataBrToUs(this.lancamentoContaCartaoRegistration.data))){
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Data do Lançamento inválida!' });
    }else if(!this.lancamentoContaCartaoRegistration.valor){
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Valor do Lançamento inválido!' });
    }else if(!this.lancamentoContaCartaoRegistration.fornecedor){
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Forncedor do Lançamento inválido!' });
    }else{
      if(this.contaRegistration.lancamentoContaCartao == null){
        this.contaRegistration.lancamentoContaCartao = [];
      }

      this.lancamentoContaCartaoRegistration.parcela = this.lancamentoContaCartaoRegistration.parcela ? this.lancamentoContaCartaoRegistration.parcela : 0;
      this.lancamentoContaCartaoRegistration.totalParcela = this.lancamentoContaCartaoRegistration.totalParcela ? this.lancamentoContaCartaoRegistration.totalParcela : 0;

      this.lancamentoContaCartaoRegistration.data = this.util.transformDates(this.lancamentoContaCartaoRegistration.data);
      //this.lancamentoContaCartaoRegistration.valor = this.util.ajustCurrencyForBase(this.lancamentoContaCartaoRegistration.valor);
      this.contaRegistration.lancamentoContaCartao.push(Object.assign({}, this.lancamentoContaCartaoRegistration));
      this.lancamentoContaCartaoRegistration = {} as LancamentoContaCartao;
    }
  }

}
