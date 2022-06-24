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

@Component({
  selector: 'app-despesa-form',
  templateUrl: './despesa-form.component.html',
  styleUrls: ['./despesa-form.component.css']
})
export class DespesaFormComponent implements OnInit {

  @Input() loading: boolean = false;
  util: Util = new Util();

  @Input() despesaCadastro!: any;
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
    this.despesaCadastro = {} as Despesa;
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
      if (this.despesaCadastro.informacaoExtra == null) {
        this.despesaCadastro.informacaoExtra = [];
      }
      this.despesaCadastro.informacaoExtra.push(Object.assign({}, this.informacaoExtra));
      this.informacaoExtra.numero = '';
    } else {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Número da Informação Extra Inválido!' });
    }
  }

  onSubmit(value: string) {
    this.loading = true;
    this.despesaCadastro.data = this.util.transformDates(this.despesaCadastro.data);
    this.despesaCadastro.valor = this.util.formatMoedaToFloat(this.util.formatFloatToReal(this.despesaCadastro.valor.toString()));
    
    this.defaultService.save('despesa', this.despesaCadastro).subscribe(resultado => {
      this.loading = false;
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Despesa salva com sucesso' });
      if (this.despesaCadastro.id) {
        this.submitFormEmmit.emit(null);
      }
      this.newDespesaCadastro();
      this.dayOfWeekend = '';
    });
  }

  newDespesaCadastro() {
    this.despesaCadastro.valor = 0;
    this.despesaCadastro.data = '';
    this.despesaCadastro.informacaoExtra = [];
    this.informacaoExtra = {} as InformacaoExtra;
    this.dayOfWeekend = '';
  }

  showDayOfWeekend() {
    let data: Date = new Date(this.util.transformDates(this.despesaCadastro.data));
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

  consultaAjudaCusto() {
    let data: Date = new Date(this.util.transformDates(this.despesaCadastro.data));
    data.setDate(data.getDate() + 1);
    if (data.getDay() > 0 && data.getDay() < 4) {
      let valorTipoDespesa = this.despesaCadastro.tipoDespesa.value;
      let valorFormaPagamento = this.despesaCadastro.formaPagamento.value;
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
