import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Cidade } from 'src/app/model/cidade';
import { Fornecedor } from 'src/app/model/fornecedor';
import { DefaultService } from 'src/app/service/default.service';
import { Util } from 'src/app/util/util';

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class FornecedorComponent implements OnInit {

  loading!: boolean;
  tabSelected:number = 0;
  //********************************************** TABELA */
  pageNumber = 0;
  pageSize = 10;
  totalElements = 0;
  util: Util = new Util();

  fornecedorSelecionado!: Fornecedor;
  //********************************************** CADASTRO */
  fornecedorCadastro!: any;
  fornecedorForm!:FormGroup;

  fornecedores: Fornecedor[] = [];
  cidades: Cidade[]=[];

  constructor(private defaultService: DefaultService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder) {
      this.fornecedorCadastro = {} as Fornecedor;
      
    }

  ngOnInit(): void {
    this.loading = true;

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

    this.defaultService.get('cidade').subscribe(resultado => {
      this.cidades = resultado.content;
      this.loading = false;
    });
  }

  onEditSave(fornecedor: any){
    this.fornecedorCadastro = Object.assign({}, fornecedor);
    this.tabSelected = 1;    
  }

  searchCNPJ(event: any){
    this.loading = true;
    const cnpj = this.fornecedorCadastro.cnpj.replace(/[^0-9]+/g, '');
    this.defaultService.get('fornecedor/consultacnpj/?cnpj=' + cnpj).subscribe(resultado => {      
      if(resultado || resultado.status == 'ERROR'){        
        this.fornecedorCadastro.nome = this.util.capitalize((resultado.fantasia ? resultado.fantasia : resultado.nome));
        this.fornecedorCadastro.razaoSocial = this.util.capitalize(resultado.nome);
        //this.fornecedorCadastro.inscricaoEstadual = 
        this.fornecedorCadastro.endereco = this.util.capitalize(resultado.logradouro) + ' ' + resultado.numero;
        this.fornecedorCadastro.bairro = this.util.capitalize(resultado.bairro);
        this.fornecedorCadastro.complemento = this.util.capitalize(resultado.complemento);
        this.fornecedorCadastro.cep = resultado.cep;
        this.fornecedorCadastro.telefone = resultado.telefone;
        this.fornecedorCadastro.cidade = {} as Cidade;
        this.fornecedorCadastro.cidade.nome = this.util.capitalize(resultado.municipio);
        // let cidadeNome:string = resultado.municipio;
        // let estadoSigla:string = resultado.uf;
        // let url = 'cidade?nome=' + cidadeNome + '&estado=' + estadoSigla;
        // this.defaultService.get(url).subscribe(retornocidades => {   
        //   debugger
        //   this.cidades = retornocidades[0];
        // });
        this.loading = false;
      }else{
        this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Erro : ' + resultado.message});
        this.loading = false;
      }      
      
    });
  }

  changeTab(event: any){
    // if(event.index==0){
    //   this.newDespesaCadastro();
    // }
  }

  filterCidade(event: any){
    const filtered: any[] = [];
    const query = event.query;

    this.defaultService.get('cidade?nome=' + event.query).subscribe(resultado => {
      this.cidades = resultado;
    });

  }

  loadData(event: LazyLoadEvent) {
    this.loading = true;

    let urlfiltros: string = '';

    if (event.filters) {
      let filtros = event.filters;
      if (filtros?.['id'] && filtros?.['id'].value!=null) {
        urlfiltros += '&id=' + filtros?.['id'].value;
      }
      if (filtros?.['nome'] && filtros?.['nome'].value) {
        urlfiltros += '&nome=' + filtros?.['nome'].value;
      }
      if (filtros?.['cnpj'] && filtros?.['cnpj'].value) {
        urlfiltros += '&cnpj=' + filtros?.['cnpj'].value;
      }
      if (filtros?.['cidade.nome'] && filtros?.['cidade.nome'].value) {
        urlfiltros += '&cidade.nome=' + filtros?.['cidade.nome'].value;
      }
    }

    event.rows = (event.rows ? event.rows : this.pageSize);
    event.sortField = (event.sortField ? event.sortField : 'nome');

    if (event.first!=undefined)
      this.pageNumber = (event.first + event.rows) / event.rows -1;

    const url: string = 'fornecedor/page?page=' + this.pageNumber
      + '&size=' + event.rows
      + '&sort=' + event.sortField + ',' + (event.sortOrder == 1 ? 'asc' : 'desc')
      + urlfiltros;

    this.defaultService.get(url).subscribe(resultado => {
      this.fornecedores = resultado.content;
      this.totalElements = resultado.totalElements;

      this.loading = false;
      
    });
  }

  onSubmit(value: string, table:Table) {
    this.loading = true;
   
    this.defaultService.save('fornecedor', this.fornecedorCadastro).subscribe(resultado =>{    
        this.loading = false;
        this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Fornecedor salva com sucesso'});
        // if(this.despesaCadastro.id){
        //   this.tabSelected = 0;
        //   table.filter(null, '', '');
        // }
        // this.newDespesaCadastro();
      
    });  
  }
}
