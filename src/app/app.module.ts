import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SmCalculatorComponent } from './components/sm-calculator/sm-calculator.component';
import { DmCalculatorComponent } from './components/dm-calculator/dm-calculator.component';

@NgModule({
  declarations: [
    AppComponent,
    SmCalculatorComponent,
    DmCalculatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
