import { Component, Input  } from '@angular/core';
import {Creature, Rarity} from '../models/creature.model'

@Component({
  selector: 'app-creature-card',
  standalone: true,
    imports: [],
  templateUrl: './creatures.html',
  styleUrl: './creatures.css'
})
export class CreaturesComponent {

  @Input() creature !: Creature;


  getRarityClass(): string {
    return this.creature.rarity.toLowerCase();
  }

  protected readonly Rarity = Rarity;
}

