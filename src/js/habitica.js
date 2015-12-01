import Habitica from 'habitica';

export function setupHabitica (options = {}) {
  let { uuid, token, endpoint } = options;

  if (!uuid || !token) {
    throw 'Send to Habitica requires you to configure the extension with your Habitica user id and api token. Find them at https://habitica.com/#/options/settings/api'; // eslint-disable-line no-throw-literal
  }

  let habitica = new Habitica({
    uuid,
    token,
    endpoint,
  });

  return habitica;
}
