import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SmCalculatorComponent } from './components/sm-calculator/sm-calculator.component';

const routes: Routes = [
  { path: "sm-calculator", component: SmCalculatorComponent },
  { path: "", redirectTo: "sm-calculator", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
