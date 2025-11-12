import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreaturesComponent} from './creatures';
import {Creature, Rarity} from '../models/creature.model';
import {DangerLevel} from '../models/dangerLevel';

describe('CreaturesComponent', () => {
  let component: CreaturesComponent;
  let fixture: ComponentFixture<CreaturesComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreaturesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreaturesComponent);
    component = fixture.componentInstance;

    component.creature = new Creature("creatureTest", "Dragon", "The Earth", DangerLevel.HIGH,
      "some description", Rarity.Epic, ["fire", "water"]) as Creature;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
