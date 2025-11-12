import { Component, signal } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AuthService} from './services/auth.service';
import {Navbar} from './navbar/navbar';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App  {
  protected readonly title = signal('galacticFront');

  constructor(
    private authService: AuthService,
  ) {}

  logout() : void {
    this.authService.logout();
  }

}
