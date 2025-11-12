import {DangerLevel} from './dangerLevel';

export class Creature {
  id: string;
  name: string;
  species: string;
  planet: string;
  dangerLevel: string;
  age: number;
  description: string;
  specialAbilities: string[];
  image: string;
  rarity: Rarity;
  isAdopted?: boolean;
  adoptedBy?: string;
  adoptedDate?: Date;


  constructor(name: string, species: string, planet: string, dangerLevel: DangerLevel, description : string,
              rarity : Rarity, specialAbilities: string[], adoptedDate?: Date, isAdopted? : boolean, adoptedBy?: string) {
    this.id = crypto.randomUUID().substring(0, 8);
    this.name = name;
    this.species = species;
    this.planet = planet;
    this.dangerLevel = dangerLevel;
    this.age = 10;
    this.description = description;
    this.specialAbilities = specialAbilities;
    this.image = "none";
    this.rarity = rarity;
    this.isAdopted = isAdopted;
    this.adoptedDate = adoptedDate;
    this.adoptedBy = adoptedBy;
    }
}

export enum Rarity {
  Common = "COMMON",
  Rare = "RARE",
  Epic = "EPIC",
  Legendary = "LEGENDARY"

}

export interface AdoptionStats {
  totalAdopted: number;
  totalAvailable: number;
  favoriteSpecies: string;
}
