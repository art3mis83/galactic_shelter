import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Alien } from '../types/alien.interface';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-alien-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card alien-card fade-in" [class.glow]="alien.rarity === 'Legendary'">
      <div class="alien-image-container">
        <img [src]="alien.imageUrl" [alt]="alien.name" class="alien-image">
        <div class="rarity-badge" [class]="'badge-' + getRarityClass()">
          {{ alien.rarity }}
        </div>
      </div>
      
      <div class="alien-info">
        <h3 class="alien-name">{{ alien.name }}</h3>
        <p class="alien-species">{{ alien.species }} from {{ alien.planet }}</p>
        <p class="alien-age">{{ alien.age }} Earth years old</p>
        
        <p class="alien-description">{{ alien.description }}</p>
        
        <div class="alien-traits">
          <div class="trait-section">
            <h4>Personality</h4>
            <div class="traits-list">
              <span class="badge badge-secondary" *ngFor="let trait of alien.personality">
                {{ trait }}
              </span>
            </div>
          </div>
          
          <div class="trait-section">
            <h4>Special Abilities</h4>
            <div class="traits-list">
              <span class="badge badge-primary" *ngFor="let ability of alien.specialAbilities">
                {{ ability }}
              </span>
            </div>
          </div>
        </div>
        
        <div class="alien-footer">
          <div class="adoption-fee">
            <span class="fee-label">Adoption Fee:</span>
            <span class="fee-amount">{{ alien.adoptionFee | number }} Credits</span>
          </div>
          
          <button 
            *ngIf="!alien.isAdopted && showAdoptButton"
            class="btn btn-primary adopt-btn"
            (click)="onAdopt()"
          >
            <span>🛸</span> Adopt {{ alien.name }}
          </button>
          
          <button 
            *ngIf="alien.isAdopted && showReleaseButton"
            class="btn btn-accent release-btn"
            (click)="onRelease()"
          >
            <span>💫</span> Release {{ alien.name }}
          </button>
          
          <div *ngIf="alien.isAdopted && !showReleaseButton" class="adopted-badge">
            <span class="badge badge-success">
              ✨ Adopted {{ alien.adoptedDate | date:'shortDate' }}
            </span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .alien-card {
      height: 100%;
      display: flex;
      flex-direction: column;
      position: relative;
      overflow: hidden;
    }

    .alien-image-container {
      position: relative;
      height: 200px;
      overflow: hidden;
      border-radius: var(--radius) var(--radius) 0 0;
      margin: -24px -24px 0 -24px;
    }

    .alien-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .alien-card:hover .alien-image {
      transform: scale(1.05);
    }

    .rarity-badge {
      position: absolute;
      top: 12px;
      right: 12px;
      font-size: 0.7rem;
      font-weight: 600;
    }

    .alien-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding-top: 20px;
    }

    .alien-name {
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0;
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .alien-species {
      color: var(--text-secondary);
      font-weight: 500;
      margin: 0;
    }

    .alien-age {
      color: var(--text-muted);
      font-size: 0.9rem;
      margin: 0;
    }

    .alien-description {
      color: var(--text-secondary);
      line-height: 1.6;
      margin: 0;
    }

    .alien-traits {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .trait-section h4 {
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0 0 8px 0;
    }

    .traits-list {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .alien-footer {
      margin-top: auto;
      padding-top: 20px;
      border-top: 1px solid var(--border);
    }

    .adoption-fee {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .fee-label {
      color: var(--text-muted);
      font-size: 0.9rem;
    }

    .fee-amount {
      font-weight: 600;
      font-size: 1.1rem;
      color: var(--success);
    }

    .adopt-btn, .release-btn {
      width: 100%;
      font-weight: 600;
    }

    .adopted-badge {
      text-align: center;
    }

    .badge-common { background: rgba(148, 163, 184, 0.2); color: #cbd5e1; }
    .badge-rare { background: rgba(16, 185, 129, 0.2); color: #6ee7b7; }
    .badge-epic { background: rgba(236, 72, 153, 0.2); color: #f9a8d4; }
    .badge-legendary { background: rgba(251, 191, 36, 0.2); color: #fde68a; }
  `]
})
export class AlienCardComponent {
  @Input() alien!: Alien;
  @Input() showAdoptButton = true;
  @Input() showReleaseButton = false;
  @Output() adopt = new EventEmitter<string>();
  @Output() release = new EventEmitter<string>();

  onAdopt() {
    this.adopt.emit(this.alien.id);
  }

  onRelease() {
    this.release.emit(this.alien.id);
  }

  getRarityClass(): string {
    return this.alien.rarity.toLowerCase();
  }
}