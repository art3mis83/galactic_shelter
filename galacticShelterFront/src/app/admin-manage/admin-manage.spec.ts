import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageComponent } from './admin-manage';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';

describe('AdminManageComponent', () => {
  let component: AdminManageComponent;
  let fixture: ComponentFixture<AdminManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminManageComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
