import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {Creature, Rarity} from '../models/creature.model';
import {CreatureService} from '../services/creature.service';
import {DangerLevel, dangerLevelToLabel, labelToDangerLevel} from '../models/dangerLevel';


@Component({
  selector: 'app-admin-manage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-manage.html',
  styleUrl: './admin-manage.css'
})
export class AdminManageComponent implements OnInit {

  creatures: Creature[] = [];
  editingCreature: Creature | null = null;
  errorMessage = '';
  successMessage = '';
  rarities = Object.values(Rarity);
  dangerLevels = Object.values(DangerLevel);

  formData = {
    name: '',
    species: '',
    planet: '',
    age: 0,
    description: ''
  };

  abilitiesString = '';
  selectedRarity: Rarity = Rarity.Common;
  selectedDangerLevel: DangerLevel = DangerLevel.LOW;
  imageSelected : string = '';

  constructor(
    private creatureService: CreatureService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCreatures();
  }

  loadCreatures(): void {
    this.creatureService.getCreatures().subscribe(creatures => {
      this.creatures = creatures;
    });
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        // @ts-ignore
        this.imageSelected = reader.result as string; // image en base64
        // @ts-ignore
        console.log(this.imageSelected);
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';

    // Validation
    if (!this.formData.name || !this.formData.species || !this.formData.planet ||
      !this.formData.age || !this.formData.description || !this.imageSelected ||
      !this.abilitiesString || !this.selectedDangerLevel || !this.selectedRarity) {
      this.errorMessage = 'Tous les champs sont obligatoires';
      return;
    }

    const image = this.imageSelected ? this.imageSelected : '';
    const dangerLevel = dangerLevelToLabel(this.selectedDangerLevel)!;
    const specialAbilities = this.abilitiesString.split(',').map(ability => ability.trim()).filter(ability => ability);
    const rarity = this.selectedRarity;

    if (specialAbilities.length === 0) {
      this.errorMessage = 'Veuillez saisir au moins une capacité spéciale';
      return;
    }

    const creatureData = {
      ...this.formData,
      rarity,
      specialAbilities,
      dangerLevel,
      image
    };

    try {
      if (this.editingCreature) {
        // Modification

          this.creatureService.updateCreature({
            ...creatureData,
            "id" : this.editingCreature.id,
            "isAdopted" : this.editingCreature.isAdopted
          }).subscribe({
            next: (creature) => {
              console.log("Saved:", creature);
              this.editingCreature = creature; // mettre à jour la liste
              this.creatureService.getCreatures().subscribe(creatures => {
                this.creatures = creatures;
              });
              this.successMessage = `${this.editingCreature.name} a été ajouté au refuge avec succès !`;
            },
            error: (err) => console.error(err)
          });
          this.successMessage = `${this.formData.name} a été modifié avec succès !`;
          this.resetForm();
      } else {
        // Ajout
        let newCreature;
        this.creatureService.addCreature(creatureData).subscribe({
          next: (creature) => {
            console.log("Saved:", creature);
            newCreature = creature; // mettre à jour la liste
            this.creatureService.getCreatures().subscribe(creatures => {
              this.creatures = creatures;
            });
            this.successMessage = `${newCreature.name} a été ajouté au refuge avec succès !`;
          },
          error: (err) => console.error(err)
        });

        this.resetForm();
      }
    } catch (error) {
      this.errorMessage = 'Une erreur est survenue lors de l\'opération';
    }
  }

  editCreature(creature: Creature): void {
    this.editingCreature = creature;
    console.log("modify creature", creature);
    this.formData = {
      name: creature.name,
      species: creature.species,
      planet: creature.planet,
      age: creature.age,
      description: creature.description
    };

    this.imageSelected = creature.image;
    this.selectedDangerLevel = labelToDangerLevel(creature.dangerLevel)!;
    this.selectedRarity = creature.rarity;
    this.abilitiesString = creature.specialAbilities.join(', ');
    this.errorMessage = '';
    this.successMessage = '';
  }

  deleteCreature(creature: Creature): void {
    //if (confirm(`Êtes-vous sûr de vouloir supprimer ${creature.name} du refuge ?`)) {
    this.creatureService.deleteCreature(creature.id).subscribe({
      next: () => {
        console.log(`Creature ${creature.id} supprimée`);
        // ⚡ mettre à jour ta liste locale :
        this.successMessage = `${creature.name} a été retiré du refuge`;
        this.creatureService.getCreatures().subscribe(creatures => {
          this.creatures = creatures;
        });
        if (this.editingCreature && this.editingCreature.id === creature.id) {
          this.resetForm();
        }
      },
      error: (err) => {
        console.error(err)
        this.errorMessage = 'Erreur lors de la suppression';
      }
    });

    //}
  }

  resetForm(): void {
    this.editingCreature = null;
    this.formData = {
      name: '',
      species: '',
      planet: '',
      age: 0,
      description: ''
    };
    this.imageSelected = '';
    this.selectedDangerLevel = DangerLevel.LOW;
    this.abilitiesString = '';
    this.errorMessage = '';
    this.successMessage = '';
  }

  onImageError(): void {
    this.errorMessage = 'URL d\'image invalide ou inaccessible';
  }

  goBack(): void {
    this.router.navigate(['/admin']);
  }
}
