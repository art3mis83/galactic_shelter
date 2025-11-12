import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Creature } from '../types/creature.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreatureService {
  private apiUrl = 'http://localhost:9000/';
  constructor(private http: HttpClient) {}
  getCreatures(): Observable<Creature[]> {
    return this.http.get<Creature[]>(this.apiUrl + "creatures");
  }
}