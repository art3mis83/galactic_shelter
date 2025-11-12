export interface Alien {
  id: string;
  name: string;
  species: string;
  planet: string;
  age: number;
  description: string;
  personality: string[];
  specialAbilities: string[];
  imageUrl: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  adoptionFee: number;
  isAdopted: boolean;
  adoptedDate?: Date;
}

export interface AdoptionStats {
  totalAdopted: number;
  totalAvailable: number;
  favoriteSpecies: string;
}