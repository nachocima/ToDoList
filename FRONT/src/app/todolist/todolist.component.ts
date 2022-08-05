import { Component, OnInit } from '@angular/core';
import { Tarea } from '../interfaces/Tarea';
import { TareaProvider } from '../providers/Tarea.provider';
import { UsuarioProvider } from '../providers/Usuario.provider';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {

  nuevo: boolean = false;
  texto: string = "";
  fecha: string = ""

  accion: string = "finalizar"

  listadoTareas: Tarea[] = []

  constructor(private user: UsuarioProvider, private provider: TareaProvider) {

   }

  ngOnInit(): void {
    this.get("getPendientes");
  }

  get(tipoGet: string){

    if(tipoGet == "getPendientes"){
      this.accion = "finalizar"
    }
    else if(tipoGet == "getTerminadas"){
      this.accion = "eliminar"
    }
    else{
      this.accion = "null"
    }
    this.provider.get(this.user.leerUsuario()!, tipoGet).subscribe({
      next: (response: Tarea[]) => this.listadoTareas = response,
      error: (e) => console.log(e),
      complete: () => console.log("Terminado")
    })
  }

  put(id: string, tipoPut: string){
    this.provider.put(id, tipoPut).subscribe({
      next: () => this.ngOnInit(),
      error: (e) => console.log(e),
      complete: () => console.log("Terminado")
    })
  }

  comandarPut(id:string){
    if(this.accion == "finalizar"){
      this.put(id, "putTerminadas")
    }
    else if(this.accion == "eliminar"){
      this.put(id, "putEliminadas")
    }
  }

  setNuevo(boton:string){
    boton == "nuevo" ? this.nuevo = true : this.nuevo = false;
  }

  postTarea(){
    if(this.texto != "" && this.fecha != ""){
      this.provider.post(this.texto, this.fecha, this.user.leerUsuario()!).subscribe({
        next: ()=> {this.texto = "", this.fecha = "", alert("Tarea agregada")},
        error: (e) => console.log(e),
        complete: ()=> console.log("Terminado")
      })
    }
    else{
      alert("Complete todos los campos")
    }

  }

}
