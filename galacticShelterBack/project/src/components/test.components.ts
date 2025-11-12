import { Component, OnInit } from '@angular/core';
import { TestService } from '../services/test.service';

@Component({
  selector: 'app-root',
  template: '<h1>{{ message }}</h1>',
})
export class AppComponent implements OnInit {
  message: string = '';
  constructor(private testService: TestService) {}
  ngOnInit() {
    this.testService.getUsers().subscribe(data => this.message = data);
  }
}