import {Injectable, inject, signal} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Creature } from '../models/creature.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreatureService {
  private apiUrl = 'http://localhost:9000/';
  private http = inject(HttpClient);

  creatures = signal<Creature[]>([]);

  constructor() {}

  getCreatures() {
    return this.http.get<Creature[]>(this.apiUrl + "creatures");
  }

  getById(id: String) {
    console.log("get by id " + id);
    return this.http.get<Creature>(this.apiUrl + "creatures/"  + id);
  }


  updateCreature(creatureData: Creature): Observable<Creature> {
    return this.http.post<Creature>(this.apiUrl + "saveCreature", creatureData);
  }

  addCreature(creatureData: Omit<Creature, 'id' | 'isAdopted'>): Observable<Creature> {
    const newAlien = {
      ...creatureData,
      isAdopted: false
    };

    return this.http.post<Creature>(this.apiUrl + "saveCreature", newAlien);
  }

  deleteCreature(id: string) : Observable<void> {
    console.log("delete by id " + id);
    return this.http.delete<void>(this.apiUrl + "creatures/" + id);
  }

  adoptCreature(id: String): Observable<Creature> {
    return this.http.put<Creature>(this.apiUrl + "creatures/" + id + "/adopt",
      {});
  }
}
