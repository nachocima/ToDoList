import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormRegistroComponent } from './form-registro/form-registro.component';
import { LoginGuard } from './guards/login.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PorfileComponent } from './porfile/porfile.component';
import { TodolistComponent } from './todolist/todolist.component';

const routes: Routes = [
  {path:"home", component: HomeComponent},
  {path: "login", component: LoginComponent},
  {path: "todolist", component: TodolistComponent, canActivate: [LoginGuard]},
  {path: "porfile", component: PorfileComponent, canActivate: [LoginGuard]},
  {path: "registro", component: FormRegistroComponent},
  {path: "", redirectTo: "/home", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
