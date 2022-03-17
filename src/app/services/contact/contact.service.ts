import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { APIResult } from 'src/app/models/APIResult';
import { ContactResponse } from 'src/app/models/contact/get/ContactResponse';
import { ContactCreate } from 'src/app/models/contact/create/ContactCreate';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private httpClient: HttpClient) {}

  getContact(): Observable<ContactResponse[]> {
    const url: string = `${environment.apiUrl}/contact`;
    return this.httpClient.get<ContactResponse[]>(url);
  }

  setContact(body: ContactCreate): Observable<APIResult> {
    const url: string = `${environment.apiUrl}/contact`;
    return this.httpClient.post<APIResult>(url, body);
  }

  deleteContactByID(id:number):Observable<APIResult>{
    const url: string = `${environment.apiUrl}/contact/${id}`;
    return this.httpClient.delete<APIResult>(url);
  }

}
