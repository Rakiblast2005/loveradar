
export interface Location {
  x: number;
  y: number;
}

export interface Contact {
  id: number;
  name: string;
  location: Location;
  type: 'Friend' | 'Family' | 'Work';
}

export interface User {
  id: string;
  name: string;
  location: Location;
}
