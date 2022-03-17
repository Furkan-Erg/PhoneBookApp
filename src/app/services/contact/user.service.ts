import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ContactResponse } from 'src/app/models/contact/get/ContactResponse';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getContactsByOwner(ownerId:number): Observable<ContactResponse[]> {
    const url: string = `${environment.apiUrl}/user/${ownerId}/contacts`;
    return this.httpClient.get<ContactResponse[]>(url);
  }

}
