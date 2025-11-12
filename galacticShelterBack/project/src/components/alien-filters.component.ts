import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-alien-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="filters-container">
      <h3>🔍 Find Your Perfect Companion</h3>
      
      <div class="filters-grid">
        <div class="filter-group">
          <label for="species-filter">Species</label>
          <select 
            id="species-filter" 
            class="filter-select"
            [(ngModel)]="selectedSpecies"
            (change)="onFilterChange()"
          >
            <option value="">All Species</option>
            <option *ngFor="let species of species" [value]="species">
              {{ species }}
            </option>
          </select>
        </div>

        <div class="filter-group">
          <label for="planet-filter">Planet</label>
          <select 
            id="planet-filter" 
            class="filter-select"
            [(ngModel)]="selectedPlanet"
            (change)="onFilterChange()"
          >
            <option value="">All Planets</option>
            <option *ngFor="let planet of planets" [value]="planet">
              {{ planet }}
            </option>
          </select>
        </div>

        <div class="filter-actions">
          <button 
            class="btn btn-outline"
            (click)="clearFilters()"
            [disabled]="!selectedSpecies && !selectedPlanet"
          >
            Clear Filters
          </button>
        </div>
      </div>

      <div class="filter-results" *ngIf="resultCount !== null">
        <span class="results-text">
          {{ resultCount }} alien{{ resultCount !== 1 ? 's' : '' }} available for adoption
        </span>
      </div>
    </div>
  `,
  styles: [`
    .filters-container {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 24px;
      margin-bottom: 32px;
    }

    .filters-container h3 {
      margin: 0 0 20px 0;
      font-size: 1.25rem;
      color: var(--text-primary);
    }

    .filters-grid {
      display: grid;
      grid-template-columns: 1fr 1fr auto;
      gap: 16px;
      align-items: end;
    }

    .filter-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .filter-group label {
      font-size: 0.9rem;
      font-weight: 500;
      color: var(--text-secondary);
    }

    .filter-select {
      padding: 12px 16px;
      border: 1px solid var(--border);
      border-radius: var(--radius);
      background: var(--bg-secondary);
      color: var(--text-primary);
      font-family: inherit;
      font-size: 0.95rem;
      transition: all 0.2s ease;
    }

    .filter-select:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    }

    .filter-select:hover {
      border-color: var(--border-hover);
    }

    .filter-actions {
      display: flex;
      align-items: center;
    }

    .filter-results {
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid var(--border);
    }

    .results-text {
      color: var(--text-secondary);
      font-size: 0.95rem;
    }

    @media (max-width: 768px) {
      .filters-grid {
        grid-template-columns: 1fr;
        gap: 16px;
      }
      
      .filter-actions {
        justify-self: start;
      }
    }
  `]
})
export class AlienFiltersComponent {
  @Input() species: string[] = [];
  @Input() planets: string[] = [];
  @Input() resultCount: number | null = null;
  
  @Output() filtersChange = new EventEmitter<{species?: string, planet?: string}>();

  selectedSpecies = '';
  selectedPlanet = '';

  onFilterChange() {
    this.filtersChange.emit({
      species: this.selectedSpecies || undefined,
      planet: this.selectedPlanet || undefined
    });
  }

  clearFilters() {
    this.selectedSpecies = '';
    this.selectedPlanet = '';
    this.onFilterChange();
  }
}