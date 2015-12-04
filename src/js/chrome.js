import Q from 'q';

export const DEFAULT_DATA = {
  habitica: {
    uuid: '',
    token: '',
    endpoint: 'https://habitica.com/api/v2',
  },
};

export function setChromeOptions (options) {
  return Q.promise((resolve) => {
    chrome.storage.sync.set(options, resolve);
  });
}

export function getChromeOptions (dataToGet = DEFAULT_DATA) {
  return Q.promise((resolve) => {
    chrome.storage.sync.get(dataToGet, (data) => {
      resolve(data);
    });
  });
}

export function logoutHabitica () {
  return setChromeOptions({
    habitica: DEFAULT_DATA.habitica,
  });
}
