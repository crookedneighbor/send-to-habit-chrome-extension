import Habitica from 'habitica';
import {
  chooseTab,
} from './options-listeners'
import {
  setChromeOptions,
  getChromeOptions,
  logoutHabitica,
} from './chrome';
import { setupHabitica } from './habitica';
import {
  displayMessage,
  findElement as findOne,
  findElements as findAll,
} from './dom';
import {
  MessageError,
} from './errors';

// Panels
let userLoggedInPanel = findOne('#user-is-logged-in');
let userNotLoggedInPanel = findOne('#user-is-not-logged-in');

// Buttons
let logoutBtn = findOne('#logout-btn');
let loginWithAuthBtn = findOne('#login-with-auth-btn');
let loginWithTokensBtn = findOne('#login-with-tokens-btn');

// Form fields
let uuid = findOne('#uuid');
let token = findOne('#token');
let apiEndpoint = findOne('#api-endpoint');

function restoreOptionsFromChromeStorage () {
  let habitica;

  getChromeOptions().then((data) => {
    let habiticaCreds = data.habitica;

    if (habiticaCreds.uuid && habiticaCreds.token) {
      habitica = setupHabitica({
        uuid: habiticaCreds.uuid,
        token: habiticaCreds.token,
      });

      return habitica.user.get();
    }

    userNotLoggedInPanel.classList.remove('hidden');

    throw new MessageError('Options not yet configured', { silent: true });
  }).then((user) => {
    findOne('#logged-in-name').innerText = user.profile.name;

    userLoggedInPanel.classList.remove('hidden');
  }).catch(displayMessage);
}

function logout () {
  logoutHabitica().then(() => {
    window.location.reload();
  });
}

function loginWithAuth () {
  let username = findOne('#username').value;
  let password = findOne('#password').value;
  let endpoint = findOne('#api-login-endpoint').value;

  let habitica = new Habitica({ endpoint });

  return habitica.account.login(username, password).then((creds) => {
    let habiticaCreds = {
      uuid: creds.id,
      token: creds.token,
    };

    return setChromeOptions({ habitica: habiticaCreds });
  }).then(() => {
    window.location.reload();
  }).catch(displayMessage);
}

function loginWithTokens () {
  let uuid = findOne('#uuid').value;
  let token = findOne('#token').value;
  let endpoint = findOne('#api-endpoint').value;

  let habitica = new Habitica({
    uuid,
    token,
    endpoint,
  });

  return habitica.user.get().then(() => {
    let habiticaCreds = {
      uuid,
      token,
    };

    return setChromeOptions({ habitica: habiticaCreds });
  }).then(() => {
    // window.location.reload();
  }).catch(displayMessage);
}

findAll('.nav.nav-tabs li').map((tab) => { tab.addEventListener('click', chooseTab); });
document.addEventListener('DOMContentLoaded', restoreOptionsFromChromeStorage);
loginWithAuthBtn.addEventListener('click', loginWithAuth);
loginWithTokensBtn.addEventListener('click', loginWithTokens);
logoutBtn.addEventListener('click', logout);
