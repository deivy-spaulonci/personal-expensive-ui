import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Despesa } from 'src/app/model/despesa';
import { FormaPagamento } from 'src/app/model/forma-pagamento';
import { Fornecedor } from 'src/app/model/fornecedor';
import { InformacaoExtra } from 'src/app/model/informacao-extra';
import { TipoDespesa } from 'src/app/model/tipo-despesa';
import { TipoInformacaoExtra } from 'src/app/model/tipo-informacao-extra';
import { DefaultService } from 'src/app/service/default.service';
import { Util } from 'src/app/util/util';
import { Validation } from 'src/app/util/validation';

@Component({
  selector: 'app-despesa-form',
  templateUrl: './despesa-form.component.html',
  styleUrls: ['./despesa-form.component.css']
})
export class DespesaFormComponent implements OnInit {

  @Input() loading: boolean = false;
  util: Util = new Util();
  validation: Validation = new Validation();

  @Input() despesaRegistration!: any;
  despesaForm!: FormGroup;
  informacaoExtra!: InformacaoExtra;
  dayOfWeekend: string = '';

  @Input() tiposDespesa: TipoDespesa[] = [];
  @Input() formasPagamento: FormaPagamento[] = [];
  @Input() fornecedores: Fornecedor[] = [];
  @Input() tiposInformacaoExtra: TipoInformacaoExtra[] = [];

  comboTipoDespesa = new FormControl('');
  comboFormaPagamento = new FormControl('');
  inputData = new FormControl('');
  inputValor = new FormControl('');

  @Output() submitFormEmmit: EventEmitter<any> = new EventEmitter<any>();

  constructor(private defaultService: DefaultService,
    private messageService: MessageService,
    private fb: FormBuilder) {
    this.despesaRegistration = {} as Despesa;
    this.informacaoExtra = {} as InformacaoExtra;
    this.informacaoExtra.tipoInformacaoExtra = {} as TipoInformacaoExtra;
  }

  ngOnInit(): void {
    this.despesaForm = this.fb.group({
      inputObservacao: '',
      comboFornecedor: ''
    });
  }

  addInformacaoExtra(event: any) {
    if (this.informacaoExtra.numero) {
      if (this.despesaRegistration.informacaoExtra == null) {
        this.despesaRegistration.informacaoExtra = [];
      }
      this.despesaRegistration.informacaoExtra.push(Object.assign({}, this.informacaoExtra));
      this.informacaoExtra.numero = '';
    } else {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Número da Informação Extra Inválido!' });
    }
  }

  onSubmitForm(value: string) {
    this.loading = true;
    this.despesaRegistration.data = this.util.transformDates(this.despesaRegistration.data);
    this.despesaRegistration.valor = this.util.formatMoedaToFloat(this.util.formatFloatToReal(this.despesaRegistration.valor.toString()));
    
    if(!this.validation.dateIsValid(this.despesaRegistration)){
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Data inválida!' });
    }else{   
      this.defaultService.save('despesa', this.despesaRegistration).subscribe(resultado => {
        this.loading = false;
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Despesa salva com sucesso' });
        if (this.despesaRegistration.id) {
          this.submitFormEmmit.emit(null);
        }
        this.cleanDespesaRegistration();
        this.dayOfWeekend = '';
      });
    }
  }

  cleanDespesaRegistration() {
    this.despesaRegistration.valor = 0;
    this.despesaRegistration.data = '';
    this.despesaRegistration.informacaoExtra = [];
    this.informacaoExtra = {} as InformacaoExtra;
    this.dayOfWeekend = '';
  }

  showDayOfWeekend() {
    let data: Date = new Date(this.util.transformDates(this.despesaRegistration.data));
    data.setDate(data.getDate() + 1);
    switch (data.getDay()) {
      case 0: this.dayOfWeekend = 'Domingo'; break;
      case 1: this.dayOfWeekend = 'Segunda-Feira'; break;
      case 2: this.dayOfWeekend = 'Terça-Feira'; break;
      case 3: this.dayOfWeekend = 'Quarta-Feira'; break;
      case 4: this.dayOfWeekend = 'Quinta-Feira'; break;
      case 5: this.dayOfWeekend = 'Sexta-Feira'; break;
      case 6: this.dayOfWeekend = 'Sabado'; break;
    }
  }

  checkHelpCusts() {
    let data: Date = new Date(this.util.transformDates(this.despesaRegistration.data));
    data.setDate(data.getDate() + 1);
    if (data.getDay() > 0 && data.getDay() < 4) {
      let valorTipoDespesa = this.despesaRegistration.tipoDespesa.value;
      let valorFormaPagamento = this.despesaRegistration.formaPagamento.value;
      if (valorTipoDespesa == "ALIMENTACAO"
        || valorTipoDespesa == "COMBUSTIVEL"
        || valorTipoDespesa == "HARDWARE_PC"
        || valorTipoDespesa == "ESTACIONAMENTO"
        || valorTipoDespesa == "PEDAGIO"
        || valorTipoDespesa == "SUPERMERCADO") {
        if (valorFormaPagamento == "DINHEIRO"
          || valorFormaPagamento == "CARTAO_DEBITO_SANTANDER") {
          this.messageService.add({ severity: 'info', summary: 'Aviso', detail: 'Possível despesa para ajuda de custo' });
        }
      }
    }
  }


}
