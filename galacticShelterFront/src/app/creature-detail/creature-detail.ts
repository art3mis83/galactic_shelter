import {Component, inject, input, output, signal} from '@angular/core';
import {Creature} from '../models/creature.model';
import {CreatureService} from '../services/creature.service';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-creature-detail',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './creature-detail.html',
  styleUrl: './creature-detail.css'
})
export class CreatureDetailModalComponent {
  private router = inject(Router);
  id = input.required<String>();
  closeDetail = output<void>();

  creature = signal<Creature | null>(null);

  constructor(private creatureService: CreatureService) {}

  ngOnInit() {
    this.creatureService.getById(this.id()).subscribe(c => {
      this.creature.set(c);
      console.log(c);
    });
  }

  onClose() {
    this.closeDetail.emit();
  }

  onAdopt() {
    this.creatureService.adoptCreature(this.id()).subscribe({
      next: (updatedCreature) => {
        console.log(`${updatedCreature.name} adopté !`);
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/creatures']);
        });
      },
      error: (err) => console.error(err)
    });
  }
}

