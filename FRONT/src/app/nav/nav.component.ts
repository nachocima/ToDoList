import { Component, Input, OnInit } from '@angular/core';
import { UsuarioProvider } from '../providers/Usuario.provider';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private provider: UsuarioProvider) { }

  ngOnInit(): void {
  }

  cerrarSesion(){
    if(this.isLogged()){
      this.provider.setUserLogout()
    }
  }

  isLogged(): boolean{
    return this.provider.isLogged()
  }

}
