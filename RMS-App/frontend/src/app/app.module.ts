import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { EntryModule } from './entry/entry.module';
import { AdminModule } from './admin/admin.module';
import { FormsMainModule } from './forms-main/forms-main.module';
import { ViewsMainModule } from './views-main/views-main.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EntryModule,
    FormsMainModule,
    ViewsMainModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'admin', loadChildren: () => AdminModule },
      { path: '**', redirectTo: 'entry' }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
