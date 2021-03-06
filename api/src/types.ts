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

export interface Subscription {
  user: Channel;
  channel: Channel;
  isSubbed: boolean;
  isPrime: boolean;
  isGift: boolean;
  isHidden: boolean;
  totalMonths: number;
  streakMonths: number;
  sub: SubInfo | null;
}

interface SubInfo {
  tier: number;
  gifter: Channel | null;
  start: Date | null;
  end: Date | null;
}

export interface User extends Channel {
  isBanned: boolean;
  description: string;
  color: string;
  avatar: string;
  roles: RolesInfo;
  followsCount: number;
  followersCount: number;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export interface RolesInfo {
  isAffiliate: boolean;
  isPartner: boolean;
  isStaff: boolean;
  isSiteAdmin: boolean;
}

export interface ViewersInfo extends Channel {
  count: number;
  viewers: string[];
}
