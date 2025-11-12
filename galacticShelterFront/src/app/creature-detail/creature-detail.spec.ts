import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreatureDetailModalComponent} from './creature-detail';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient} from '@angular/common/http';
import {Creature, Rarity} from '../models/creature.model';
import {DangerLevel} from '../models/dangerLevel';
import {CreatureService} from '../services/creature.service';
import {of} from 'rxjs';

describe('CreatureDetailModalComponent', () => {
  let component: CreatureDetailModalComponent;
  let fixture: ComponentFixture<CreatureDetailModalComponent>;

  let creatureServiceSpy:jasmine.SpyObj<CreatureService>;

  const DUMMY_CREATURE = new Creature("Stella", "Chien", "Terre", DangerLevel.LOW,
    "Un gentil chien", Rarity.Common, ["rapporte la balle", "fait la sieste"]);

  beforeEach(async () => {
    creatureServiceSpy = jasmine.createSpyObj("CreatureService", ["getById", "adoptCreature"]);

    await TestBed.configureTestingModule({
      imports: [CreatureDetailModalComponent],
      providers: [
        {
          provide: CreatureService,
          useValue: creatureServiceSpy
        },
        provideHttpClient(),
        provideHttpClientTesting()
      ]

    })
    .compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatureDetailModalComponent);
    fixture.componentRef.setInput("id", "42");
    component = fixture.componentInstance;
    creatureServiceSpy =TestBed.inject(CreatureService) as jasmine.SpyObj<CreatureService>;

    creatureServiceSpy.getById.and.returnValue(of(DUMMY_CREATURE));
    fixture.detectChanges();
  })

  it('init and check information', async () => {
    fixture.detectChanges();

    await fixture.whenStable();

    expect(creatureServiceSpy.getById).toHaveBeenCalledWith("42"); // Vérifie que le service a été appelé
    expect(component.creature()).toEqual(DUMMY_CREATURE);
    const compiled = fixture.nativeElement
    expect(compiled.querySelector('h2').textContent).toEqual(DUMMY_CREATURE.name);

    expect(fixture).toBeTruthy();
  });

  it('test adopt', async () => {
    fixture.detectChanges();

    await fixture.whenStable();
    DUMMY_CREATURE.isAdopted = true;
    creatureServiceSpy.adoptCreature.and.returnValue(of(DUMMY_CREATURE));

    component.onAdopt();

    expect(creatureServiceSpy.adoptCreature).toHaveBeenCalled();
    expect(component.creature()?.isAdopted).toEqual(true);
  })
});
