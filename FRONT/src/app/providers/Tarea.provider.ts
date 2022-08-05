import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { EnvironmentInjector, Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { Tarea } from "../interfaces/Tarea";

@Injectable({
    providedIn: 'root'
})
export class TareaProvider{

    constructor(private http: HttpClient){

    }

    private handleError(error: HttpErrorResponse){
        if(error.status == 0){
            console.log("algo pasó, error: " + error.message);
        }
        else{
            console.log("Status code: " + error.status);
            console.log(error);
        }
        return throwError(() => new Error(error.error));
    }

    post(texto: string, fecha:string, usuario:string){
        const request = {
            texto: texto,
            fecha: fecha,
            usuario: usuario
        }
        const url = environment.url + "tarea/post"
        const header = {'content-type': 'application/json'};

        return this.http.post<Tarea>(url, request, { 'headers': header}).pipe(catchError(this.handleError));
    }

    get(user: string, tipoGet: string): Observable<Tarea[]>{
        console.log(user)
        const url = environment.url + "tarea/" + tipoGet + "?userName=" + user;
        return this.http.get<Tarea[]>(url).pipe(catchError(this.handleError));
    }

    put(id: string, tipoPut: string){
        const request = {
            id: id
        }

        const url = environment.url + "tarea/" + tipoPut;
        const header = {'content-type': 'application/json'};

        return this.http.put<Tarea>(url, request, { 'headers': header}).pipe(catchError(this.handleError));
    }

}