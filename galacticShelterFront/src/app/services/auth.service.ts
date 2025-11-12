import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private readonly API_URL = 'http://localhost:9000/auth';

  constructor(private http: HttpClient) {
    // Vérifier si l'utilisateur est déjà connecté au démarrage
    this.checkAuthStatus();
  }

  login(username: string, password: string): Observable<User> {
    const credentials = btoa(`${username}:${password}`);
    const headers = new HttpHeaders({
      'Authorization': `Basic ${credentials}`
    });

    return this.http.post<User>(`${(this.API_URL)}/login`, {}, { headers }).pipe(
      tap(user => {
        if(this.isBrowser()) {
          // Stocker les credentials et l'utilisateur
          sessionStorage.setItem('auth', credentials);
          sessionStorage.setItem('user', JSON.stringify(user));
        }
        this.currentUserSubject.next(user);
      })
    );
  }

  logout(): void {
    if(this.isBrowser()) {
      sessionStorage.removeItem('auth');
      sessionStorage.removeItem('user');
    }
    this.currentUserSubject.next(null);
  }

  checkAuthStatus(): void {
    let userStr = null;
    if(this.isBrowser()){
       userStr = sessionStorage.getItem('user');
    }
    if (userStr) {
      this.currentUserSubject.next(JSON.parse(userStr));
    }
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  hasRole(role: string): boolean {
    const user = this.currentUserSubject.value;
    return user ? user.role.includes(role) : false;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  getAuthCredentials(): string | null {
    if(this.isBrowser()){
      return sessionStorage.getItem('auth');
    }
    return null;
  }


  private isBrowser(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage;
  }
}
