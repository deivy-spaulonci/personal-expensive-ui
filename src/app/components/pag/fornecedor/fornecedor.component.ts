import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TabView } from 'primeng/tabview';
import { Fornecedor } from 'src/app/model/fornecedor';
import { DefaultService } from 'src/app/service/default.service';

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class FornecedorComponent implements OnInit {

  loading: boolean = false;
  selectedTabIndex = 0;

  fornecedorEdition!: any;

  constructor(private cdref: ChangeDetectorRef,
    private defaultService: DefaultService) { }

  ngOnInit(): void {
    this.fornecedorEdition = {} as Fornecedor;
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  setTabCadastro(fornecedor: any, tab: TabView) {    
    this.fornecedorEdition = fornecedor ? fornecedor.id : {} as Fornecedor;
    tab.activeIndex = fornecedor ? 1 : 0;
    this.selectedTabIndex = fornecedor ? 1 : 0;
  }

}
