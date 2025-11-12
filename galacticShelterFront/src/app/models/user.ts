
export class User {
  id: string;
  username: string;
  password: string;
  role: string;


  constructor(id : string, name: string, password: string, role: string) {
    this.id = id;
    this.username = name;
    this.password = password;
    this.role = role;
    }

    isAdmin() : boolean {
      return this.role === 'ADMIN';
    }
}

export interface AdoptionStats {
  totalAdopted: number;
  totalAvailable: number;
  favoriteSpecies: string;
}
