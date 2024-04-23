import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InmueblesComponent } from './componentes/inmuebles/inmuebles.component';

const routes: Routes = [
  { path: 'inmuebles', component: InmueblesComponent },
  { path: '', redirectTo: '/inmuebles', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


