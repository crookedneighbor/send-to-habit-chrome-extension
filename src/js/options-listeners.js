import {
  findElement as findOne,
  findElements as findAll,
} from './dom';

export function chooseTab (evt) {
  let link = evt.srcElement;
  let parentLi = link.parentElement;
  let tabId = link.getAttribute('href');

  let tabPanes = findAll('.tab-pane');
  let tabs = findAll('.nav.nav-tabs li');

  let removeActiveClass = (element) => { element.classList.remove('active'); };

  tabPanes.map(removeActiveClass);
  tabs.map(removeActiveClass);

  findOne(tabId).classList.add('active');
  parentLi.classList.add('active');
}

export function loginWithAuth (habitica = new Habitica()) {
  let username = findOne('#username').value;
  let password = findOne('#password').value;
  let endpoint = findOne('#api-login-endpoint').value;

  habitica.setCredentials({ endpoint });

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
