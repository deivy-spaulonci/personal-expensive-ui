import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {PanelModule} from 'primeng/panel';
import {AccordionModule} from 'primeng/accordion';
import {ButtonModule} from 'primeng/button';
import {FieldsetModule} from 'primeng/fieldset';
import {MenuModule} from 'primeng/menu';
import {InputTextModule} from 'primeng/inputtext';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {HttpClientModule} from "@angular/common/http";
import {DropdownModule} from 'primeng/dropdown';
import {TableModule} from 'primeng/table';

import {DespesaListComponent} from './comp/despesa/despesa-list/despesa-list.component';
import {DespesaFormComponent} from './comp/despesa/despesa-form/despesa-form.component';
import {HomeComponent} from './comp/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    DespesaListComponent,
    DespesaFormComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    PanelModule,
    AccordionModule,
    ButtonModule,
    FieldsetModule,
    MenuModule,
    InputTextModule,
    MessagesModule,
    MessageModule,
    DropdownModule,
    TableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
