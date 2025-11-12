import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaturesList } from './creatures-list';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {Creature, Rarity} from '../models/creature.model';
import {DangerLevel} from '../models/dangerLevel';

describe('CreaturesList', () => {
  let component: CreaturesList;
  let fixture: ComponentFixture<CreaturesList>;

  const DUMMY_CREATURES: Creature[] = [
    new Creature("Stella", "Chien", "Terre", DangerLevel.LOW,
      "Un gentil chien", Rarity.Common, ["rapporte la balle", "fait la sieste"]),
    new Creature("Saphire", "Chat", "Terre", DangerLevel.LOW,
      "Un gentil chat", Rarity.Epic, ["fait la sieste"], new Date(), true)
  ]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreaturesList],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreaturesList);
    component = fixture.componentInstance;
    component.creatures$ = DUMMY_CREATURES;
    fixture.detectChanges();
  })

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render creature names', () => {
    const compiled: HTMLElement = fixture.nativeElement;
    expect(compiled.textContent).toContain('Stella');
    expect(compiled.querySelectorAll('app-creature-card').length).toBe(2);
  });

  it('should render adopted badges', () => {
    expect(fixture.nativeElement.querySelectorAll('div.status-badge').length).toBe(2);
    expect(fixture.nativeElement.querySelectorAll('div.status-badge.adopted').length).toBe(1);
  });
});
