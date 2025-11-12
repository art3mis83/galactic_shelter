import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {CreatureService} from '../services/creature.service';
import {Creature} from '../models/creature.model';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class AdminComponent implements OnInit {
  availableCreatures: Creature[] = [];
  adoptedCreatures: Creature[] = [];
  totalCreatures = 0;
  constructor(private creatureService: CreatureService) { }

  ngOnInit() {
    this.creatureService.getCreatures().subscribe(creatures => {
      this.availableCreatures = creatures.filter(alien => !alien.isAdopted);
      this.adoptedCreatures = creatures.filter(alien => alien.isAdopted);
      this.totalCreatures = creatures.length;
    });
  }
}

