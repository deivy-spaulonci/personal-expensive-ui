import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Cidade } from 'src/app/model/cidade';
import { Fornecedor } from 'src/app/model/fornecedor';
import { DefaultService } from 'src/app/service/default.service';
import { Util } from 'src/app/util/util';

@Component({
  selector: 'app-fornecedor-form',
  templateUrl: './fornecedor-form.component.html',
  styleUrls: ['./fornecedor-form.component.css']
})
export class FornecedorFormComponent implements OnInit {

  @Input() loading: boolean = false;
  util: Util = new Util();

  fornecedorRegistration!: any;
  fornecedorForm!:FormGroup;

  cidades: Cidade[]=[];
  
  constructor(private fb: FormBuilder,
    private messageService: MessageService,
    private defaultService: DefaultService) {
    this.fornecedorRegistration = {} as Fornecedor;
   }

  ngOnInit(): void {
    this.fornecedorForm = this.fb.group({
      inputNome: new FormControl('', Validators.required),
      inputRazao : new FormControl('', Validators.required),
      inputCNPJ: '',
      inputInscEstadual: '',
      inputEndereco: '',
      inputBairro: '',
      inputComplemento: '',
      inputCep: '',
      inputTelefone: '',
      comboCidade: new FormControl('', Validators.required)
    });
  }

  searchCNPJ(event: any){
    this.loading = true;
    const cnpj = this.fornecedorRegistration.cnpj.replace(/[^0-9]+/g, '');
    this.defaultService.get('fornecedor/consultacnpj/?cnpj=' + cnpj).subscribe(resultado => {      
      this.loading = false;
      if(resultado || resultado.status != 'ERROR'){        
        this.fornecedorRegistration.nome = this.util.capitalize((resultado.fantasia ? resultado.fantasia : resultado.nome));
        this.fornecedorRegistration.razaoSocial = this.util.capitalize(resultado.nome);
        //this.fornecedorCadastro.inscricaoEstadual = 
        this.fornecedorRegistration.endereco = this.util.capitalize(resultado.logradouro) + ' ' + resultado.numero;
        this.fornecedorRegistration.bairro = this.util.capitalize(resultado.bairro);
        this.fornecedorRegistration.complemento = this.util.capitalize(resultado.complemento);
        this.fornecedorRegistration.cep = resultado.cep;
        this.fornecedorRegistration.telefone = resultado.telefone;
        this.fornecedorRegistration.cidade = {} as Cidade;
        this.fornecedorRegistration.cidade.nome = this.util.capitalize(resultado.municipio);
        // let cidadeNome:string = resultado.municipio;
        // let estadoSigla:string = resultado.uf;
        // let url = 'cidade?nome=' + cidadeNome + '&estado=' + estadoSigla;
        // this.defaultService.get(url).subscribe(retornocidades => {   
        //   debugger
        //   this.cidades = retornocidades[0];
        // });
        
      }else{
        this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Erro : ' + resultado.message});
      }      
      
    });
  }

  onSubmitForm(value: string) {
    this.loading = true;   
    this.defaultService.save('fornecedor', this.fornecedorRegistration).subscribe(resultado =>{    
        this.loading = false;
        this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Fornecedor salva com sucesso'});
        this.fornecedorRegistration = {} as Fornecedor;
        if(this.fornecedorRegistration.id){
          //this.tabSelected = 0;
          //table.filter(null, '', '');
        }
    });  
  }

  filterCidade(event: any){
    const filtered: any[] = [];
    const query = event.query;

    this.defaultService.get('cidade?nome=' + event.query).subscribe(resultado => {
      this.cidades = resultado;
    });

  }

}
