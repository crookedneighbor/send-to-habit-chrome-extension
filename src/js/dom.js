export function createKeyListener (options = {}) {
  let { habitica, task, keys = [] } = options;

  let altKey = 18;
  let shiftKey = 16;
  let sKey = 83;

  let keyListener = (e) => {
    let isPressed = e.type === 'keydown';

    keys[e.keyCode] = isPressed;

    if (keys[altKey] && keys[shiftKey] && keys[sKey]) {
      habitica.task.post(task).then(() => {
        displayMessage(null, 'To-Do Created!');
      }).catch(displayMessage);
    }
  };

  return keyListener;
}

export function addFunctionToKeyEvents (fn, dom = document) {
  dom.addEventListener('keydown', fn);
  dom.addEventListener('keyup', fn);
}

export function displayMessage (err, successMsg, dom = document) {
  let message = dom.createElement('div');

  message.classList.add('send-to-habitica-msg');

  if (err) {
    message.classList.add('send-to-habitica-msg-error');
    message.innerText = `ERROR: ${err.text}`;
  } else {
    message.classList.add('send-to-habitica-msg-success');
    message.innerText = successMsg;
  }
  dom.body.appendChild(message);

  let tasks = [{
    fn: _makeElementAppear,
    time: 100,
  }, {
    fn: _makeElementDissapear,
    time: 4000,
  }, {
    fn: _removeElement,
    time: 5000,
  }];

  tasks.map((task) => {
    setTimeout(() => {
      task.fn(message);
    }, task.time);
  });
}

function _makeElementAppear (element) {
  element.style.top = '20px';
}

function _makeElementDissapear (element) {
  element.style.opacity = 0;
}

function _removeElement (element) {
  element.remove();
}
