import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { Usuario } from "../interfaces/Usuario";

@Injectable({
    providedIn: "root"
})
export class UsuarioProvider{


    constructor(private http: HttpClient){

    }

    login(nombreUsuario: string, password: string): Observable<any> {
        const request = {
            nombreUsuario: nombreUsuario,
            password: password
        };

        const url = environment.url + 'user/login';
        const header = { 'content-type': 'application/json' };

        return this.http.post<Usuario>(url, request, { 'headers': header}).pipe(catchError(this.handleError));
    }

    post(nombre: string, apellido: string, email: string,
        nombreUsuario: string, password: string): Observable<any>{
        const request = {
            nombre: nombre,
            apellido: apellido,
            email: email,
            nombreUsuario: nombreUsuario,
            password: password
        }

        const url = environment.url + 'user/post';
        const header = {'content-type': 'application/json'};

        return this.http.post<Usuario>(url, request, { 'headers': header}).pipe(catchError(this.handleError));
    }

    put(nombre: string, apellido: string, email: string, nombreUsuario: string){
        const request = {
            nombre: nombre,
            apellido: apellido,
            email: email,
            nombreUsuario
        }

        const url = environment.url + "user/put?user=" + this.leerUsuario()!;
        const header = {"content-type": "application/json"};

        return this.http.put<Usuario>(url, request, { 'headers': header}).pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse){
        if(error.status === 0){
            console.log("algo pasó, error: " + error.message);
        }
        else{
            console.log("Status code: " + error.status);
            console.log(error);
        }
        return throwError(() => new Error(error.error));
    }

    setUserLogged() {
        sessionStorage.setItem("logged", "true");

    }

    setUserLogout() {
        localStorage.removeItem("usuario");
        localStorage.removeItem("password");
        sessionStorage.removeItem("logged");
    }

    isLogged() :boolean {
        return sessionStorage.getItem("logged") === "true";
    }

    guardarUsuario(user: string, pass: string){
        localStorage.setItem("usuario", user);
        localStorage.setItem("password", pass);
    }

    setUsuario(user: string){
        localStorage.setItem("usuario", user);
    }

    leerUsuario(){
        return localStorage.getItem("usuario") ? localStorage.getItem("usuario") : "username"
    }

    leerPassword(){
        return localStorage.getItem("password") ? localStorage.getItem("password") : "password"
    }

}