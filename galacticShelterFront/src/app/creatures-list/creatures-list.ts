import {Component, OnInit, signal} from '@angular/core';
import {CreaturesComponent} from '../creatures/creatures';
import { CreatureService } from '../services/creature.service';
import {Creature} from '../models/creature.model';
import {CreatureDetailModalComponent} from '../creature-detail/creature-detail';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-creatures-list',
  imports: [CreaturesComponent, CreatureDetailModalComponent],
  templateUrl: './creatures-list.html',
  styleUrl: './creatures-list.css'
})
export class CreaturesList implements OnInit {

  creatures$!: Creature[];
  isLogged!: boolean;
  myCreatures$!: Creature[];
  selectedCreatureId = signal<String | null>(null);

  constructor(private creatureService: CreatureService, private authService: AuthService) {}

  ngOnInit() {
    let currentUser = this.authService.getCurrentUser();
    this.isLogged = currentUser !== null;
    this.creatureService.getCreatures().subscribe(creatures =>
    {
      this.creatures$ = creatures;

      this.myCreatures$ = creatures.filter(creature => creature.adoptedBy == currentUser?.username);
    });
  }

  openDetail(id: String) {
    this.selectedCreatureId.set(id)
  }

  closeDetail() {
    this.selectedCreatureId.set(null);
  }
}
