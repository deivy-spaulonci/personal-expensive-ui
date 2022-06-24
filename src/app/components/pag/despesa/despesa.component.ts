import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormaPagamento } from 'src/app/model/forma-pagamento';
import { Fornecedor } from 'src/app/model/fornecedor';
import { TipoDespesa } from 'src/app/model/tipo-despesa';
import { DefaultService } from 'src/app/service/default.service';

@Component({
  selector: 'app-despesa',
  templateUrl: './despesa.component.html',
  styleUrls: ['./despesa.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class DespesaComponent implements OnInit {

  loading: boolean = false;

  data: any;
  tabSelected: number = 0;

  tiposDespesa: TipoDespesa[] = [];
  formasPagamento: FormaPagamento[] = [];
  fornecedores: Fornecedor[] = [];  
  
  constructor(private defaultService: DefaultService) { }

  ngOnInit(): void {

    this.loading = true;
    
    this.defaultService.get('tipo-despesa').subscribe(tipos => {
      this.tiposDespesa = tipos;
      this.defaultService.get('fornecedor').subscribe(fornecedores => {
        this.fornecedores = fornecedores;
        this.defaultService.get('forma-pagamento').subscribe(formas => {
          this.formasPagamento = formas;
          this.loading = false;
        });
      });
    });
  

    this.data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
                label: 'Second Dataset',
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    }
    /*
        this.items = [
      {label: 'Visualizar', icon: 'pi pi-fw pi-search',
        command: () => this.detalharDespesa = true},
      {label: 'Excluir', icon: 'pi pi-fw pi-times',
        command: () => this.excluirDespesa() },
      {label: 'Editar', icon: 'pi pi-fw pi-pencil',
        command: () => this.editarDespesa() }
    ];
    */
    // this.defaultService.get('tipo-despesa').subscribe(tipos => {
    //   this.tiposDespesa = tipos;
    // });

  }

  changeTab(event: any){
    // this.tabSelected = event.index;
    // if(event.index==0){
    //   this.newDespesaCadastro();
    // }
  }

}
