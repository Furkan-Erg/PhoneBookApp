import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { LoginRequest } from "../../models/auth/login/LoginRequest";
import { LoginResponse } from "../../models/auth/login/LoginResponse";
import { environment } from "../../../environments/environment";
import {RegisterRequest} from "../../models/auth/register/RegisterRequest";
import {Observable} from "rxjs";
import { APIResult } from 'src/app/models/APIResult';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) {}

  login(body: LoginRequest): Observable<LoginResponse> {
    const url: string = `${environment.apiUrl}/auth/login`;
    return this.httpClient.post<LoginResponse>(url, body);
  }

  // TODO
  register(body: RegisterRequest): Observable<APIResult> {
    const url: string = `${environment.apiUrl}/auth/register`;
    return this.httpClient.post<APIResult>(url, body);
  }
}
