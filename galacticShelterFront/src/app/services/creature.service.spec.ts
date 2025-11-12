import {TestBed} from '@angular/core/testing';
import {provideHttpClient} from '@angular/common/http';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {CreatureService} from './creature.service';
import {Creature, Rarity} from '../models/creature.model';
import {DangerLevel} from '../models/dangerLevel';
import empty = jasmine.empty;

describe('CreatureService', () => {
  let service: CreatureService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CreatureService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
      .compileComponents()

    service = TestBed.inject(CreatureService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should call GET /creatures and return expected date', () =>{

    const mockCreatures: Creature[] = [
      {
        id: "1",
        name: 'Stella',
        rarity: Rarity.Common,
        species: "Chien",
        planet: "Terre",
        dangerLevel: DangerLevel.LOW,
        age: 3,
        description: "Un gentil chien",
        specialAbilities: ["rapporte la balle", "fait la sieste"],
        image: ""
      }
    ]

    service.getCreatures().subscribe(data => {
      expect(data.length).toEqual(1);
      expect(data[0].name).toEqual("Stella");
      }
    );

    // Capture la requête HTTP et la simule
    const req = httpMock.expectOne('http://localhost:9000/creatures');
    expect(req.request.method).toEqual("GET");
    req.flush(mockCreatures); // Renvoie les données simulées

  });

  it('should return null', () =>{

    service.getById("1").subscribe(data => {
        expect(data).toEqual(empty());
      }
    );

    // Capture la requête HTTP et la simule
    const req = httpMock.expectOne('http://localhost:9000/creatures/1');
    expect(req.request.method).toEqual("GET");
    req.flush(empty()); // Renvoie les données simulées

  });
})
