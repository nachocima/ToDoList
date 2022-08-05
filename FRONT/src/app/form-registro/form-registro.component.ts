import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../interfaces/Usuario';
import { UsuarioProvider } from '../providers/Usuario.provider';

@Component({
  selector: 'app-form-registro',
  templateUrl: './form-registro.component.html',
  styleUrls: ['./form-registro.component.css']
})
export class FormRegistroComponent implements OnInit {

  public formRegistro: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private provider: UsuarioProvider) { 
    this.formRegistro = this.formBuilder.group({
      nombre: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      apellido: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      usuario: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      confirmPassword: ['', Validators.required],
      terminos: ['', Validators.requiredTrue]
    })
  }

  ngOnInit(): void {
  }

  send(){   
    this.provider.post(this.formRegistro.controls['nombre'].value, this.formRegistro.controls['apellido'].value, this.formRegistro.controls['email'].value, this.formRegistro.controls['usuario'].value, this.formRegistro.controls['password'].value).subscribe({
      next: (request: Usuario) => {alert("Bienvenido " + request.nombreUsuario), this.router.navigateByUrl('/login')},
      error: (e) => alert(e),
      complete: () => console.log("Completo")
    })
  }

  cancelar(){
    this.router.navigateByUrl("/login")
  }

  compararPassword(){
    if(this.formRegistro.controls['password'].value != this.formRegistro.controls['confirmPassword'].value){
      return false;
    }
    return true;
  }

}
