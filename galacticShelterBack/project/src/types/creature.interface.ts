export interface Creature {
  id: string;
  name: string;
  species: string;
  planet: string;
  dangerLevel: string;
}

export interface AdoptionStats {
  totalAdopted: number;
  totalAvailable: number;
  favoriteSpecies: string;
}