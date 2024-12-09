// HOPITAUX
export class mockHopitalA {
  id: 1;
  nom: 'Hopital A';
}
export class mockHopitalB {
  id: 2;
  nom: 'Hopital B';
}

export class mockHopitalC {
  id: 3;
  nom: 'Hopital C';
}

export class mockHopitalD {
  id: 3;
  nom: 'Hopital D';
}

// SERVICES
export class mockServiceA {
  id: 1;
  nom: 'Service A';
}
export class mockServiceB {
  id: 2;
  nom: 'Service B';
}
export class mockServiceC {
  id: 3;
  nom: 'Service C';
}
export class mockServiceD {
  id: 3;
  nom: 'Service D';
}

// PLACE DISPONIBLE
export class MockPlaceA {
  hopital: string;
  service: string;
  places: string;

  constructor(hopital: string, service: string, places: string) {
    this.hopital = hopital;
    this.service = service;
    this.places = places;
  }
}
export const mockPlaceA1 = new MockPlaceA('Hopital A', 'Service A', '1');
export const mockPlaceA2 = new MockPlaceA('Hopital A', 'Service B', '2');
export const mockPlaceA3 = new MockPlaceA('Hopital A', 'Service C', '1');
export const mockPlaceA4 = new MockPlaceA('Hopital A', 'Service D', '1');

export class MockPlaceB {
  hopital: string;
  service: string;
  places: string;

  constructor(hopital: string, service: string, places: string) {
    this.hopital = hopital;
    this.service = service;
    this.places = places;
  }
}
export const mockPlaceB1 = new MockPlaceB('Hopital B', 'Service A', '1');
export const mockPlaceB2 = new MockPlaceB('Hopital B', 'Service B', '1');
export const mockPlaceB3 = new MockPlaceB('Hopital B', 'Service C', '1');
export const mockPlaceB4 = new MockPlaceB('Hopital B', 'Service D', '1');

export class MockPlaceC {
  hopital: string;
  service: string;
  places: string;

  constructor(hopital: string, service: string, places: string) {
    this.hopital = hopital;
    this.service = service;
    this.places = places;
  }
}
export const mockPlaceC1 = new MockPlaceC('Hopital C', 'Service A', '1');
export const mockPlaceC2 = new MockPlaceC('Hopital C', 'Service B', '1');
export const mockPlaceC3 = new MockPlaceC('Hopital C', 'Service C', '1');
export const mockPlaceC4 = new MockPlaceC('Hopital C', 'Service D', '1');

export class MockPlaceD {
  hopital: string;
  service: string;
  places: string;

  constructor(hopital: string, service: string, places: string) {
    this.hopital = hopital;
    this.service = service;
    this.places = places;
  }
}
export const mockPlaceD1 = new MockPlaceD('Hopital D', 'Service A', '1');
export const mockPlaceD2 = new MockPlaceD('Hopital D', 'Service B', '1');
export const mockPlaceD3 = new MockPlaceD('Hopital D', 'Service C', '2');
export const mockPlaceD4 = new MockPlaceD('Hopital D', 'Service D', '1');
