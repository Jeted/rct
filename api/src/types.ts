export type Endpoints = 'available' | 'roles' | 'subs' | 'users' | 'viewers';

export interface Availability {
  username: string;
  isAvailable: boolean;
}
