import {
  setChromeOptions,
  getChromeOptions,
} from './chrome';
import { displayMessage } from './dom';

let uuid = document.getElementById('uuid');
let token = document.getElementById('token');
let apiEndpoint = document.getElementById('api-endpoint');

function saveOptionsToChromeStorage () {
  let data = {
    habitica: {
      uuid: uuid.value,
      token: token.value,
      endpoint: apiEndpoint.value,
    },
  };

  setChromeOptions(data).then(() => {
    displayMessage(null, 'Options saved.');
  });
}

function restoreOptionsFromChromeStorage () {
  getChromeOptions().then((data) => {
    let habiticaCreds = data.habitica;

    uuid.value = habiticaCreds.uuid;
    token.value = habiticaCreds.token;
    apiEndpoint.value = habiticaCreds.endpoint;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptionsFromChromeStorage);
document.getElementById('save').addEventListener('click', saveOptionsToChromeStorage);
