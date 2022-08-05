import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../interfaces/Usuario';
import { UsuarioProvider } from '../providers/Usuario.provider';

@Component({
  selector: 'app-porfile',
  templateUrl: './porfile.component.html',
  styleUrls: ['./porfile.component.css']
})
export class PorfileComponent implements OnInit {

  formUpdate: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private provider: UsuarioProvider) {
    this.formUpdate = this.formBuilder.group({
      nombre: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      apellido: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      usuario: ['', Validators.compose([Validators.required, Validators.minLength(3)])]
    })
   }

  ngOnInit(): void {
    this.provider.login(this.provider.leerUsuario()!, this.provider.leerPassword()!).subscribe({
      next: (request: Usuario) => this.completarCampos(request),
      error: (e)=> console.log(e),
      complete: ()=> console.log("Terminado")
    })
  }

  send(){
    this.provider.put(this.formUpdate.controls['nombre'].value, this.formUpdate.controls['apellido'].value, this.formUpdate.controls['email'].value, this.formUpdate.controls['usuario'].value).subscribe({
      next: (request: Usuario) => {this.provider.setUsuario(request.nombreUsuario), this.completarCampos(request), alert("Los cambios fueron exitosos")},
      error: (e)=> console.log(e),
      complete: ()=> console.log("Terminado")
    })

  }

  completarCampos(user: Usuario){
    this.formUpdate.patchValue({
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
      usuario: user.nombreUsuario
    })
  }

}
