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


import {DespesaListComponent} from './comp/despesa/despesa-list/despesa-list.component';
import {HomeComponent} from './comp/home/home.component';
import { ContaComponent } from './comp/conta/conta.component';
import { FornecedorComponent } from './comp/fornecedor/fornecedor.component';
import { CnpjPipe } from './pipe/cnpj.pipe';
import { CepPipe } from './pipe/cep.pipe';
import { TelefonePipe } from './pipe/telefone.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DespesaListComponent,
    HomeComponent,
    ContaComponent,
    FornecedorComponent,
    CnpjPipe,
    CepPipe,
    TelefonePipe
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
    DividerModule
  ],
  providers: [
    // { provide: LOCALE_ID, useValue: 'pt' },
    // { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
