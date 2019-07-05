import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { HomeComponent } from './components/home/home.component';
import { NodosComponent } from './components/nodos/nodos.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch:'full' },
  { path: 'home', component: HomeComponent, pathMatch:'full' },
  { path: 'nodos', component: NodosComponent },
  { path: 'no-encontrado',  component: NotfoundComponent},
  { path: '**', redirectTo: '/no-encontrado', pathMatch: 'full'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true,  /*enableTracing: true,*/ scrollPositionRestoration: 'enabled', } )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
