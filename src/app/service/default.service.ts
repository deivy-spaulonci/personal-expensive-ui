import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DefaultService {

  urlbase = 'http://10.10.10.36:8080/api/v1/';
  // Headers
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(private httpClient: HttpClient) {
  }

  get(url:string): Observable<any> {
    let api = this.urlbase+url;
    console.log(api);
    return this.httpClient.get<any>(api)
      .pipe(
        retry(1),
        catchError(this.handleError))
  }

  // salva um carro
  save(url:string, obj: any): Observable<any> {
    let api = this.urlbase+url;
    return this.httpClient.post<any>(api, JSON.stringify(obj), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  update(url:string, obj: any): Observable<any> {
    let api = this.urlbase+url;
    return this.httpClient.put<any>(api, JSON.stringify(obj), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
  


//  // Obtem um carro pelo id
//  getCarById(id: number): Observable<Car> {
//   return this.httpClient.get<Car>(this.url + '/' + id)
//     .pipe(
//       retry(2),
//       catchError(this.handleError)
//     )
// }



// // deleta um carro
// deleteCar(car: Car) {
//   return this.httpClient.delete<Car>(this.url + '/' + car.id, this.httpOptions)
//     .pipe(
//       retry(1),
//       catchError(this.handleError)
//     )
// }
}
