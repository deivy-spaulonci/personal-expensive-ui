import {DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

// import ptBr from '@angular/common/locales/pt';
// import { registerLocaleData } from '@angular/common';

import {InputTextModule} from 'primeng/inputtext';
import {MenubarModule} from 'primeng/menubar';
import {MegaMenuModule} from 'primeng/megamenu';
import {MenuModule} from 'primeng/menu';
import {PanelModule} from 'primeng/panel';
import {ButtonModule} from 'primeng/button';
import {ToolbarModule} from 'primeng/toolbar';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {SlideMenuModule} from 'primeng/slidemenu';
import {PanelMenuModule} from 'primeng/panelmenu';
import {TableModule} from 'primeng/table';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ToastModule} from 'primeng/toast';
import {DropdownModule} from 'primeng/dropdown';
import {InputMaskModule} from 'primeng/inputmask';
import {FieldsetModule} from 'primeng/fieldset';
import {ProgressBarModule} from 'primeng/progressbar';
import {TooltipModule} from 'primeng/tooltip';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {CalendarModule} from 'primeng/calendar';
import {KeyFilterModule} from 'primeng/keyfilter';
import {FocusTrapModule} from 'primeng/focustrap';
import {ContextMenuModule} from 'primeng/contextmenu';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {TreeModule} from 'primeng/tree';
import {TreeTableModule} from 'primeng/treetable';
import {DialogModule} from 'primeng/dialog';
import {TabViewModule} from 'primeng/tabview';
import {DividerModule} from 'primeng/divider';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {ChartModule} from 'primeng/chart';

import {HomeComponent} from './comp/home/home.component';
import { CnpjPipe } from './pipe/cnpj.pipe';
import { CepPipe } from './pipe/cep.pipe';
import { TelefonePipe } from './pipe/telefone.pipe';
import { InputMoneyComponent } from './comp/view/input-money/input-money.component';
import { ComboTipoComponent } from './comp/view/combo-tipo/combo-tipo.component';
import { InputDataComponent } from './comp/view/input-data/input-data.component';
import { ColumnFilterIdComponent } from './comp/view/column-filter-id/column-filter-id.component';
import { ColumnFilterTipoComponent } from './comp/view/column-filter-tipo/column-filter-tipo.component';
import { ColumnFilterRangeDatesComponent } from './comp/view/column-filter-range-dates/column-filter-range-dates.component';
import { DespesaComponent } from './components/pag/despesa/despesa.component';
import { DespesaFormComponent } from './components/pag/despesa/despesa-form/despesa-form.component';
import { DespesaGridComponent } from './components/pag/despesa/despesa-grid/despesa-grid.component';
import { ColumnBtActionComponent } from './comp/view/column-bt-action/column-bt-action.component';
import { DespesaChartComponent } from './components/pag/despesa/despesa-chart/despesa-chart.component';
import { FornecedorFormComponent } from './components/pag/fornecedor/fornecedor-form/fornecedor-form.component';
import { FornecedorGridComponent } from './components/pag/fornecedor/fornecedor-grid/fornecedor-grid.component';
import { FornecedorComponent } from './components/pag/fornecedor/fornecedor.component';
import { ContaGridComponent } from './components/pag/conta/conta-grid/conta-grid.component';
import { ContaFormComponent } from './components/pag/conta/conta-form/conta-form.component';
import { ContaComponent } from './components/pag/conta/conta.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CnpjPipe,
    CepPipe,
    TelefonePipe,
    InputMoneyComponent,
    ComboTipoComponent,
    InputDataComponent,
    ColumnFilterIdComponent,
    ColumnFilterTipoComponent,
    ColumnFilterRangeDatesComponent,
    DespesaComponent,
    DespesaGridComponent,
    DespesaFormComponent,
    ColumnBtActionComponent,
    DespesaChartComponent,
    FornecedorComponent,
    FornecedorFormComponent,
    FornecedorGridComponent,
    ContaComponent,
    ContaGridComponent,
    ContaFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    MenubarModule,
    MegaMenuModule,
    MenuModule,
    ButtonModule,
    ToolbarModule,
    TieredMenuModule,
    SlideMenuModule,
    PanelMenuModule,
    TableModule,
    PanelModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    DropdownModule,
    InputMaskModule,
    FieldsetModule,
    ProgressBarModule,
    TooltipModule,
    InputNumberModule,
    InputTextareaModule,
    CalendarModule,
    KeyFilterModule,
    FocusTrapModule,
    ContextMenuModule,
    ConfirmDialogModule,
    AutoCompleteModule,
    TreeModule,
    TreeTableModule,
    DialogModule,
    TabViewModule,
    DividerModule,
    ConfirmPopupModule,
    ChartModule
  ],
  providers: [
    // { provide: LOCALE_ID, useValue: 'pt' },
    // { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
