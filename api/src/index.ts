import fetch from 'cross-fetch';
import type {
  Availability,
  Endpoints,
  Roles,
  Subscription,
  User,
  UserFilter,
  UsersFilter,
  ViewersInfo,
} from './types';

const buildUrl = (endpoint: Endpoints, params: object) => {
  const querystring = Object.entries(params)
    .map(([key, value]) => {
      if (value instanceof Array) {
        value = value.join(',');
      }

      return `${key}=${value}`;
    })
    .join('&');

  return `https://api.rct.re/v1/${endpoint}?${querystring}`;
};

async function request<T>(
  endpoint: Endpoints,
  params: object,
  array = false,
): Promise<T | undefined> {
  const url = buildUrl(endpoint, params);
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      return array ? data : data[0];
    }
  } catch {
    throw new Error(`Internal error while fetching URL "${url}"`);
  }
}

export default {
  get available() {
    return {
      /**
       * Get availability status of a single username
       */
      getOne: (username: { login: string }) => {
        return request<Availability>('available', username);
      },

      /**
       * Get availability status of multiple usernames
       */
      getMany: (usernames: { logins: string[] }) => {
        return request<Availability[]>('available', { login: usernames.logins }, true);
      },
    };
  },

  get roles() {
    return {
      /**
       * Get mods/vips from a single channel
       */
      getOne: (channel: UserFilter) => {
        return request<Roles>('roles', channel);
      },

      /**
       * Get mods/vips from multiple channels
       */
      getMany: (channels: UsersFilter) => {
        const params = {
          ...(channels.ids ? { id: channels.ids } : { login: channels.logins }),
        };

        return request<Roles[]>('roles', params, true);
      },
    };
  },

  get subs() {
    return {
      /**
       * Get subscription info from a user to a single channel
       */
      getOne: async (from: UserFilter, to: UserFilter) => {
        const params = {
          ...(from.id ? { user_id: from.id } : { user_login: from.login }),
          ...(to.id ? { channel_id: to.id } : { channel_login: to.login }),
        };

        return request<Subscription>('subs', params);
      },

      /**
       * Get subscription info from a user to multiple channels
       */
      getMany: (from: UserFilter, to: UsersFilter) => {
        const params = {
          ...(from.id ? { user_id: from.id } : { user_login: from.login }),
          ...(to.ids ? { channel_id: to.ids } : { channel_login: to.logins }),
        };

        return request<Subscription[]>('subs', params, true);
      },
    };
  },

  get users() {
    return {
      /**
       * Get a single user
       */
      getOne: (user: UserFilter) => {
        return request<User>('users', user);
      },

      /**
       * Get multiple users
       */
      getMany: (users: UsersFilter) => {
        const params = {
          ...(users.ids ? { id: users.ids } : { login: users.logins }),
        };

        return request<User[]>('users', params, true);
      },
    };
  },

  get viewers() {
    return {
      /**
       * Get viewers from a single channel
       */
      getOne: (channel: UserFilter) => {
        return request<ViewersInfo>('viewers', channel);
      },

      /**
       * Get viewers from multiple channels
       */
      getMany: (channels: UsersFilter) => {
        const params = {
          ...(channels.ids ? { id: channels.ids } : { login: channels.logins }),
        };

        return request<ViewersInfo[]>('viewers', params, true);
      },
    };
  },
};
