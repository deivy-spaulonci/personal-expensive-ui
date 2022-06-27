import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
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
    this.loading = true;

    this.contaForm = this.fb.group({
      inputNumero: new FormControl('', Validators.required),
      //inputValor: new FormControl('', Validators.required),
      inputCodigoBarra: '',
      //comboTipoConta: new FormControl('', Validators.required),
      //inputEmissao: new FormControl('', Validators.required),
      //inputVencimento: new FormControl('', Validators.required),
      inputParcela: '',
      inputTotalParcela: '',
      //formGroupInput: new FormControl('', Validators.required),
      inputObservacao: '',
      //inputDataPagamento: '',
      //comboFormaPagamento: '',
      //inputValorPago: ''
    });
  }

  transformConta(conta:Conta):Conta{
    conta.vencimento = this.util.transformDates(conta.vencimento);
    conta.emissao = this.util.transformDates(conta.emissao);
    conta.valor = this.util.formatMoedaToFloat(conta.valor.toString());
    
    if(conta.dataPagamento && conta.valorPago){
      conta.valorPago = this.util.formatMoedaToFloat(conta.valorPago.toString());
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
            console.log('salvou a conta');
          //table.filter(null, '', '');
        }
    });  
  }

}
