import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RouterModule } from '@angular/router';
import { EntryModule } from './entry/entry.module';
import { ViewsMainModule } from './views-main/views-main.module';
import { FormsMainModule } from './forms-main/forms-main.module';
import { AdminModule } from './admin/admin.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EntryModule,
    ViewsMainModule,
    FormsMainModule,
    AdminModule,
    RouterModule.forChild([
      { path: '', loadChildren: () => EntryModule },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
