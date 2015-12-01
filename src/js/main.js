import { setupHabitica } from './habitica';
import {
  createKeyListener,
  addFunctionToKeyEvents,
} from './dom';
import { getChromeOptions } from './chrome';

const PAGE_TITLE = document.title;
const PAGE_URL = window.location.href;

getChromeOptions().then((data) => {
  let habitica = setupHabitica(data.habitica);
  let keyListener = createKeyListener({
    habitica,
    task: {
      text: PAGE_TITLE,
      type: 'todo',
      notes: PAGE_URL,
    },
  });

  addFunctionToKeyEvents(keyListener);
}).catch((err) => {
  // Figure out what to do with thrown err, if anything
  console.log(err); // eslint-disable-line no-console
});
