import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../interfaces/Usuario';
import { UsuarioProvider } from '../providers/Usuario.provider';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formLogin: FormGroup;
  usuario: string = ""
  password: string = ""

  constructor(private formBuilder: FormBuilder, private router:Router, private provider: UsuarioProvider) {
    this.formLogin = this.formBuilder.group({
      usuario: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    })
   }

  ngOnInit(): void {
    
  }

  send(){
    this.usuario = this.formLogin.controls['usuario'].value;
    this.password = this.formLogin.controls['password'].value;
    this.provider.login(this.usuario, this.password)
      .subscribe({
        next: (user: Usuario) => this.handleSuccess(user),
        error: () => alert("El usuario no existe"),
        complete: () => console.log("Terminó la petición.")
      });
  }

  handleSuccess(response: Usuario){
    this.provider.setUserLogged();
    this.provider.guardarUsuario(response.nombreUsuario, this.password );
    this.router.navigateByUrl('/todolist');
    alert("Hola " + response.nombreUsuario);
  }

  formRegistro(){
    this.router.navigateByUrl("/registro")
  }

}
