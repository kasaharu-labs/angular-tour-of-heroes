import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Hero } from '../hero';
import { HeroRepository } from './hero.repository';

describe('HeroRepository', () => {
  let service: HeroRepository;
  let httpTestingController: HttpTestingController;
  const heroesUrl = 'api/heroes';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.get(HeroRepository);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('call getHeroes() method', () => {
    const testHeroes: Hero[] = [{ id: 1, name: 'test' }];

    service.getHeroes().subscribe((result) => expect(result).toEqual(testHeroes));
    const req = httpTestingController.expectOne(heroesUrl);
    expect(req.request.method).toBe('GET');
    req.flush(testHeroes);
  });

  it('call getHero() method', () => {
    const testHero: Hero = { id: 1, name: 'test' };

    service.getHero(1).subscribe((result) => expect(result).toEqual(testHero));
    const req = httpTestingController.expectOne(`${heroesUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(testHero);
  });

  it('call updateHero() method', () => {
    const updatingHero: Hero = { id: 1, name: 'test' };

    service.updateHero(updatingHero).subscribe((result) => expect(result).toEqual(updatingHero));
    const req = httpTestingController.expectOne(heroesUrl);
    expect(req.request.method).toBe('PUT');
    req.flush(updatingHero);
  });

  it('call addHero() method', () => {
    const addingHero = { name: 'test' } as Hero;

    service.addHero(addingHero).subscribe((result) => expect(result).toEqual(addingHero));
    const req = httpTestingController.expectOne(heroesUrl);
    expect(req.request.method).toBe('POST');
    req.flush(addingHero);
  });

  it('call deleteHero() method', () => {
    const deletingHero: Hero = { id: 1, name: 'test' };

    service.deleteHero(deletingHero).subscribe((result) => expect(result).toEqual(deletingHero));
    const req = httpTestingController.expectOne(`${heroesUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(deletingHero);
  });

  describe('call searchHero() method', () => {
    it('term ???????????????', () => {
      const term = '';
      service.searchHero(term).subscribe((result) => expect(result).toEqual([]));
    });

    it('term ????????????????????????', () => {
      const term = 'test';
      const searchingHero: Hero[] = [{ id: 1, name: 'test' }];

      service.searchHero(term).subscribe((result) => expect(result).toEqual(searchingHero));
      const req = httpTestingController.expectOne(`${heroesUrl}/?name=${term}`);
      expect(req.request.method).toBe('GET');
      req.flush(searchingHero);
    });
  });
});
