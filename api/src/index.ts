import fetch from 'cross-fetch';
import type {
  Availability,
  Endpoints,
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
      getOne: (username: { login: string }) => {
        return request<Availability>('available', username);
      },
      getMany: (usernames: { logins: string[] }) => {
        return request<Availability[]>('available', { login: usernames.logins }, true);
      },
    };
  },
};
