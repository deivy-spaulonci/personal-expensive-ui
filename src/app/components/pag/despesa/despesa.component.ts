import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DefaultService } from 'src/app/service/default.service';
import { DespesaGridComponent } from './despesa-grid/despesa-grid.component';

@Component({
  selector: 'app-despesa',
  templateUrl: './despesa.component.html',
  styleUrls: ['./despesa.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class DespesaComponent implements OnInit {

  data: any;
  tabSelected: any;

  testedespesagrid!: DespesaGridComponent;

  constructor(private defaultService: DefaultService) { }

  ngOnInit(): void {

    this.defaultService.get('forma-pagamento').subscribe(formas => {
      this.testedespesagrid.formasPagamento = formas;
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
