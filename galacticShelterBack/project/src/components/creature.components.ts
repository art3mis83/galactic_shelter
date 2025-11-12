import { Component, OnInit } from '@angular/core';
import { CreatureService } from '../services/creature.service';
import { Creature } from '../types/creature.interface';

@Component({
  selector: 'app-root',
  template: '<*ngFor="let creature of availableCreatures>',
})
export class AppComponent implements OnInit {
  message: string = '';
  availableCreatures: Creature[] = [];
  constructor(private creatureService: CreatureService) {}
  ngOnInit() {
      this.creatureService.getCreatures().subscribe(resp => {
         this.availableCreatures = resp;
       });
  }
}