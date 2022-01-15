export type UserFilter =
  | {
      id: string | number;
      login?: never;
    }
  | {
      id?: never;
      login: string;
    };

export type UsersFilter =
  | {
      ids: string[] | number[];
      logins?: never;
    }
  | {
      ids?: never;
      logins: string[];
    };

export type Endpoints = 'available' | 'roles' | 'subs' | 'users' | 'viewers';

export interface Availability {
  username: string;
  isAvailable: boolean;
}

interface Channel {
  userId: number;
  login: string;
  displayName: string;
}

export interface Roles extends Channel {
  mods: Role[];
  vips: Role[];
}

interface Role extends Channel {
  date: Date;
}
