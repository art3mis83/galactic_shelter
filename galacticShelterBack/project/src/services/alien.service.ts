import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Alien } from '../types/alien.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlienService {
  private aliensSubject = new BehaviorSubject<Alien[]>(this.getInitialAliens());
  private adoptedAliensSubject = new BehaviorSubject<Alien[]>([]);

  private apiUrl = 'http://localhost:9000/creatures';

    constructor(private http: HttpClient) {}

    getCreatures(): Observable<Alien[]> {
        console.log("cc")
        console.log(this.http.get<Alien[]>(this.apiUrl))
      return this.http.get<Alien[]>(this.apiUrl);
    }

  aliens$ = this.aliensSubject.asObservable();
  adoptedAliens$ = this.adoptedAliensSubject.asObservable();

  /*constructor() {
    // Load adopted aliens from localStorage
    const savedAdopted = localStorage.getItem('adoptedAliens');
    if (savedAdopted) {
      this.adoptedAliensSubject.next(JSON.parse(savedAdopted));
    }
  }*/

  getAliens(): Alien[] {
    return this.aliensSubject.value;
  }

  getAdoptedAliens(): Alien[] {
    return this.adoptedAliensSubject.value;
  }

  adoptAlien(alienId: string): boolean {
    const aliens = this.getAliens();
    const alien = aliens.find(a => a.id === alienId && !a.isAdopted);
    
    if (alien) {
      alien.isAdopted = true;
      alien.adoptedDate = new Date();
      
      const adoptedAliens = [...this.getAdoptedAliens(), alien];
      this.adoptedAliensSubject.next(adoptedAliens);
      this.aliensSubject.next([...aliens]);
      
      // Save to localStorage
      localStorage.setItem('adoptedAliens', JSON.stringify(adoptedAliens));
      
      return true;
    }
    return false;
  }

  releaseAlien(alienId: string): boolean {
    const adoptedAliens = this.getAdoptedAliens();
    const alienIndex = adoptedAliens.findIndex(a => a.id === alienId);
    
    if (alienIndex !== -1) {
      const alien = adoptedAliens[alienIndex];
      alien.isAdopted = false;
      alien.adoptedDate = undefined;
      
      const updatedAdopted = adoptedAliens.filter((_, index) => index !== alienIndex);
      this.adoptedAliensSubject.next(updatedAdopted);
      
      const allAliens = this.getAliens();
      const alienInList = allAliens.find(a => a.id === alienId);
      if (alienInList) {
        alienInList.isAdopted = false;
        alienInList.adoptedDate = undefined;
        this.aliensSubject.next([...allAliens]);
      }
      
      // Update localStorage
      localStorage.setItem('adoptedAliens', JSON.stringify(updatedAdopted));
      
      return true;
    }
    return false;
  }

  getAvailableAliens(): Alien[] {
    return this.getAliens().filter(alien => !alien.isAdopted);
  }

  filterAliens(species?: string, planet?: string): Alien[] {
    let filtered = this.getAvailableAliens();
    
    if (species) {
      filtered = filtered.filter(alien => alien.species === species);
    }
    
    if (planet) {
      filtered = filtered.filter(alien => alien.planet === planet);
    }
    
    return filtered;
  }

  getSpecies(): string[] {
    const species = this.getAliens().map(alien => alien.species);
    return [...new Set(species)].sort();
  }

  getPlanets(): string[] {
    const planets = this.getAliens().map(alien => alien.planet);
    return [...new Set(planets)].sort();
  }

  private getInitialAliens(): Alien[] {
    return [
      {
        id: '1',
        name: 'Zyx',
        species: 'Zenithian',
        planet: 'Zenith Prime',
        age: 127,
        description: 'A friendly crystalline being with telepathic abilities and a love for meditation.',
        personality: ['Calm', 'Wise', 'Empathetic'],
        specialAbilities: ['Telepathy', 'Crystal Healing', 'Energy Manipulation'],
        imageUrl: 'https://images.pexels.com/photos/2832432/pexels-photo-2832432.jpeg?auto=compress&cs=tinysrgb&w=400',
        rarity: 'Rare',
        adoptionFee: 1500,
        isAdopted: false
      },
      {
        id: '2',
        name: 'Blorp',
        species: 'Gelatinoid',
        planet: 'Aqua Beta',
        age: 45,
        description: 'A shapeshifting aquatic alien with incredible adaptability and a playful nature.',
        personality: ['Playful', 'Adaptive', 'Curious'],
        specialAbilities: ['Shape-shifting', 'Water Breathing', 'Camouflage'],
        imageUrl: 'https://images.pexels.com/photos/2832382/pexels-photo-2832382.jpeg?auto=compress&cs=tinysrgb&w=400',
        rarity: 'Common',
        adoptionFee: 500,
        isAdopted: false
      },
      {
        id: '3',
        name: 'Vortax',
        species: 'Nebulite',
        planet: 'Nebula-7',
        age: 300,
        description: 'An ancient energy being capable of manipulating cosmic forces and stellar winds.',
        personality: ['Ancient', 'Powerful', 'Mysterious'],
        specialAbilities: ['Cosmic Energy Control', 'Stellar Navigation', 'Time Perception'],
        imageUrl: 'https://images.pexels.com/photos/2832421/pexels-photo-2832421.jpeg?auto=compress&cs=tinysrgb&w=400',
        rarity: 'Legendary',
        adoptionFee: 5000,
        isAdopted: false
      },
      {
        id: '4',
        name: 'Chirpy',
        species: 'Harmonoid',
        planet: 'Melody Minor',
        age: 23,
        description: 'A musical alien that communicates through beautiful sonic frequencies and melodies.',
        personality: ['Musical', 'Joyful', 'Social'],
        specialAbilities: ['Sonic Communication', 'Healing Songs', 'Perfect Pitch'],
        imageUrl: 'https://images.pexels.com/photos/2832439/pexels-photo-2832439.jpeg?auto=compress&cs=tinysrgb&w=400',
        rarity: 'Common',
        adoptionFee: 700,
        isAdopted: false
      },
      {
        id: '5',
        name: 'Quantum',
        species: 'Phaseling',
        planet: 'Dimensional Rift',
        age: 89,
        description: 'A multi-dimensional being that exists in several realities simultaneously.',
        personality: ['Logical', 'Multi-faceted', 'Analytical'],
        specialAbilities: ['Phase Shifting', 'Quantum Entanglement', 'Reality Perception'],
        imageUrl: 'https://images.pexels.com/photos/2832428/pexels-photo-2832428.jpeg?auto=compress&cs=tinysrgb&w=400',
        rarity: 'Epic',
        adoptionFee: 3000,
        isAdopted: false
      },
      {
        id: '6',
        name: 'Sparkle',
        species: 'Luminary',
        planet: 'Prism World',
        age: 67,
        description: 'A bioluminescent alien that creates beautiful light shows and brings joy wherever it goes.',
        personality: ['Bright', 'Cheerful', 'Artistic'],
        specialAbilities: ['Bioluminescence', 'Light Manipulation', 'Mood Enhancement'],
        imageUrl: 'https://images.pexels.com/photos/2832434/pexels-photo-2832434.jpeg?auto=compress&cs=tinysrgb&w=400',
        rarity: 'Rare',
        adoptionFee: 1200,
        isAdopted: false
      },
      {
        id: '7',
        name: 'Echo',
        species: 'Resonant',
        planet: 'Sound Sphere',
        age: 156,
        description: 'An alien made of pure sound waves that can replicate any noise or voice perfectly.',
        personality: ['Mimetic', 'Intelligent', 'Helpful'],
        specialAbilities: ['Sound Replication', 'Acoustic Manipulation', 'Voice Synthesis'],
        imageUrl: 'https://images.pexels.com/photos/2832436/pexels-photo-2832436.jpeg?auto=compress&cs=tinysrgb&w=400',
        rarity: 'Epic',
        adoptionFee: 2500,
        isAdopted: false
      },
      {
        id: '8',
        name: 'Fuzzy',
        species: 'Floofling',
        planet: 'Comfort Colony',
        age: 12,
        description: 'An incredibly soft and cuddly alien that provides emotional support and endless warmth.',
        personality: ['Gentle', 'Nurturing', 'Loyal'],
        specialAbilities: ['Emotional Healing', 'Temperature Control', 'Empathic Bonding'],
        imageUrl: 'https://images.pexels.com/photos/2832440/pexels-photo-2832440.jpeg?auto=compress&cs=tinysrgb&w=400',
        rarity: 'Common',
        adoptionFee: 400,
        isAdopted: false
      }
    ];
  }
}