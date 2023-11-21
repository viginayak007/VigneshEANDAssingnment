import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }
  validateUser(name: string, password: string){
    return this.httpClient.post(`http://localhost:3000/auth`, {
      name,password
    })
  }
}
