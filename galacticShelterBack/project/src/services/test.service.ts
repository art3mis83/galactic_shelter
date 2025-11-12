import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private apiUrl = 'http://localhost:9000/users';
  constructor(private http: HttpClient) {}
  getUsers(): Observable<string> {
    return this.http.get(this.apiUrl, { responseType: 'text' });
  }
}