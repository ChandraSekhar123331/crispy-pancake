import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { EntryModule } from './entry/entry.module';
import { FormsMainModule } from './forms-main/forms-main.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EntryModule,
    FormsMainModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
