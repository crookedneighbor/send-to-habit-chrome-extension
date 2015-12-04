import {
  createKeyListener,
  addFunctionToKeyEvents,
  displayMessage,
  findElement,
} from '../src/js/dom';

describe('dom', () => {
  describe('#createKeyListener', () => {
    let options, habitica, keys, cb;

    beforeEach(() => {
      habitica = {
        task: {
          post: sinon.stub().returns({
            then: sinon.stub().returnsThis(),
            catch: sinon.stub().returnsThis(),
          }),
        },
      };
      keys = [];
      cb = sinon.stub();

      options = {
        habitica,
        keys,
        cb,
      };
    });

    context('setup', () => {
      it('returns a function', () => {
        let keyListener = createKeyListener(options);

        expect(keyListener).to.be.a('function');
      });
    });

    context('key listener', () => {
      it('keeps track of pressed down keys', () => {
        let keyListener = createKeyListener(options);
        let evt1 = {
          type: 'keydown',
          keyCode: 50,
        };
        let evt2 = {
          type: 'keydown',
          keyCode: 52,
        };
        let evt3 = {
          type: 'something-else',
          keyCode: 54,
        };

        keyListener(evt1);
        keyListener(evt2);
        keyListener(evt3);

        expect(keys[50]).to.eql(true);
        expect(keys[52]).to.eql(true);
        expect(keys[54]).to.eql(false);
      });

      it('toggles actively pressed keys', () => {
        let keyListener = createKeyListener(options);
        let evt1 = {
          type: 'keydown',
          keyCode: 50,
        };
        let evt2 = {
          type: 'keyup',
          keyCode: 50,
        };

        keyListener(evt1);
        expect(keys[50]).to.eql(true);

        keyListener(evt2);
        expect(keys[50]).to.eql(false);
      });

      it('sends habitica request when alt + shift + s key are pressed', () => {
        options.task = {
          text: 'page title',
          type: 'todo',
          notes: 'page url',
        };
        let keyListener = createKeyListener(options);
        let altKey = 18;
        let shiftKey = 16;
        let sKey = 83;
        let evt = {
          keyCode: sKey,
          type: 'keydown',
        };

        keys[altKey] = true; // alt
        keys[shiftKey] = true; // shift

        keyListener(evt);

        expect(habitica.task.post).to.be.calledOnce;
        expect(habitica.task.post).to.be.calledWith({
          text: 'page title',
          type: 'todo',
          notes: 'page url',
        });
      });

      it('does not send habitica request when missing shortcut key', () => {
        let keyListener = createKeyListener(options);
        let altKey = 18;
        let sKey = 83;
        let evt = {
          keyCode: sKey,
          type: 'keydown',
        };

        keys[altKey] = true; // alt

        keyListener(evt);

        expect(habitica.task.post).to.not.be.called;
      });
    });
  });

  describe('#addFunctionToKeyEvents', () => {
    let dom, fn;

    beforeEach(() => {
      fn = sinon.stub();
      dom = {
        addEventListener: sinon.stub(),
      };
    });

    it('adds keyListener to keydown event', () => {
      addFunctionToKeyEvents(fn, dom);

      expect(dom.addEventListener).to.be.calledWith('keydown', fn);
    });

    it('adds keyListener to keyup event', () => {
      addFunctionToKeyEvents(fn, dom);

      expect(dom.addEventListener).to.be.calledWith('keyup', fn);
    });
  });

  describe('#displayMessage', () => {
    let dom, element, clock;

    beforeEach(() => {
      clock = sinon.useFakeTimers();
      element = {
        classList: { add: sinon.stub() },
        style: {},
        remove: sinon.stub(),
      };
      dom = {
        createElement: sinon.stub().returns(element),
        body: {
          appendChild: sinon.stub(),
        },
      };
    });

    afterEach(() => {
      clock.restore();
    });

    context('errors', () => {
      it('adds error message to element\'s text', () => {
        displayMessage({text: 'some error'}, null, dom);

        expect(element.innerText).to.eql('ERROR: some error');
      });

      it('includes full error if there is no text attribute', () => {
        displayMessage({notText: 'some error'}, null, dom);

        expect(element.innerText).to.eql('ERROR: {"notText":"some error"}');
      });

      it('displays text if no error object passed in', () => {
        displayMessage('some text only error', null, dom);

        expect(element.innerText).to.eql('ERROR: "some text only error"');
      });

      it('skips messsage display if error includes a silent flag', () => {
        displayMessage({text: 'some text only error', silent: true }, null, dom);

        expect(element.innerText).to.not.exist;
      });

      it('applies msg classes', () => {
        displayMessage({text: 'some error'}, null, dom);

        expect(element.classList.add).to.be.calledWith('send-to-habitica-msg');
        expect(element.classList.add).to.be.calledWith('send-to-habitica-msg-error');
      });

      it('adds element to body', () => {
        displayMessage({text: 'some error'}, null, dom);

        expect(dom.body.appendChild).to.be.calledWith(element);
      });

      it('adjusts style of element to appear after 100 miliseconds', () => {
        displayMessage({text: 'some error'}, null, dom);

        clock.tick(99);
        expect(element.style).to.not.have.property('top');

        clock.tick(1);
        expect(element.style).to.have.property('top', '20px');
      });

      it('makes element dissapear after 4000 miliseconds', () => {
        displayMessage({text: 'some error'}, null, dom);

        clock.tick(3999);
        expect(element.style).to.not.have.property('opacity');

        clock.tick(1);
        expect(element.style).to.have.property('opacity', 0);
      });

      it('removes element from dom after 5000 miliseconds', () => {
        displayMessage({text: 'some error'}, null, dom);

        clock.tick(4999);
        expect(element.remove).to.not.be.called;

        clock.tick(1);
        expect(element.remove).to.be.calledOnce;
      });
    });

    context('success', () => {
      it('adds success message to element\'s text', () => {
        displayMessage(null, 'success!', dom);

        expect(element.innerText).to.eql('success!');
      });

      it('applies msg classes', () => {
        displayMessage(null, 'success!', dom);

        expect(element.classList.add).to.be.calledWith('send-to-habitica-msg');
        expect(element.classList.add).to.be.calledWith('send-to-habitica-msg-success');
      });

      it('adds element to body', () => {
        displayMessage(null, 'success!', dom);

        expect(dom.body.appendChild).to.be.calledWith(element);
      });

      it('adjusts style of element to appear after 100 miliseconds', () => {
        displayMessage(null, 'success!', dom);

        clock.tick(99);
        expect(element.style).to.not.have.property('top');

        clock.tick(1);
        expect(element.style).to.have.property('top', '20px');
      });

      it('makes element dissapear after 4000 miliseconds', () => {
        displayMessage(null, 'success!', dom);

        clock.tick(3999);
        expect(element.style).to.not.have.property('opacity');

        clock.tick(1);
        expect(element.style).to.have.property('opacity', 0);
      });

      it('removes element from dom after 5000 miliseconds', () => {
        displayMessage(null, 'success!', dom);

        clock.tick(4999);
        expect(element.remove).to.not.be.called;

        clock.tick(1);
        expect(element.remove).to.be.calledOnce;
      });
    });
  });

  describe('#findElement', () => {
    let dom;

    beforeEach(() => {
      dom = {
        querySelector: sinon.stub(),
      }
    });

    it('finds element by query selector', () => {
      findElement('#id', dom);

      expect(dom.querySelector).to.be.calledOnce;
      expect(dom.querySelector).to.be.calledWith('#id');
    });
  });
});
