import {
  chooseTab,
  loginWithAuth,
} from '../src/js/options-listeners';
import * as dom from '../src/js/dom';

let makeDomElement = () => {
  return {
    classList: {
      add: sinon.stub(),
      remove: sinon.stub(),
    },
  };
};

describe('options listeners', () => {
  beforeEach(() => {
    sinon.stub(dom, 'findElements');
    sinon.stub(dom, 'findElement');

    dom.findElement.returns(makeDomElement());
    dom.findElements.returns([]);
  });

  afterEach(() => {
    dom.findElements.restore();
    dom.findElement.restore();
  });

  describe('chooseTab', () => {
    let evt, parentLi, tab;

    beforeEach(() => {
      parentLi = makeDomElement();

      tab = makeDomElement();
      tab.getAttribute = sinon.stub().withArgs('href').returns('#tab-id');
      tab.parentElement = parentLi;

      evt = {
        srcElement: tab,
      };
    });

    it('removes active class from all tab panes', () => {
      let tabPane1 = makeDomElement();
      let tabPane2 = makeDomElement();

      dom.findElements.withArgs('.tab-pane').returns([
        tabPane1,
        tabPane2,
      ]);

      chooseTab(evt);

      expect(tabPane1.classList.remove).to.be.calledOnce;
      expect(tabPane1.classList.remove).to.be.calledWith('active');
      expect(tabPane2.classList.remove).to.be.calledOnce;
      expect(tabPane2.classList.remove).to.be.calledWith('active');
    });

    it('removes active class from all tabs', () => {
      let tab1 = makeDomElement();
      let tab2 = makeDomElement();

      dom.findElements.withArgs('.nav.nav-tabs li').returns([
        tab1,
        tab2,
      ]);

      chooseTab(evt);

      expect(tab1.classList.remove).to.be.calledOnce;
      expect(tab1.classList.remove).to.be.calledWith('active');
      expect(tab2.classList.remove).to.be.calledOnce;
      expect(tab2.classList.remove).to.be.calledWith('active');
    });

    it('adds active class to tab li', () => {
      chooseTab(evt);

      expect(parentLi.classList.add).to.be.calledOnce;
      expect(parentLi.classList.add).to.be.calledWith('active');
    });

    it('adds active class to accompaning tab pane', () => {
      let foundTab = makeDomElement();

      dom.findElement.withArgs('#tab-id').returns(foundTab);

      chooseTab(evt);

      expect(foundTab.classList.add).to.be.calledOnce;
      expect(foundTab.classList.add).to.be.calledWith('active');
    });
  });

  describe('#loginWithAuth', () => {
    let habitica;

    beforeEach(() => {
      habitica = {
        setCredentials: sinon.stub(),
        account: { login: sinon.stub() }
      };
    }):

    it('sets endpoint to provided endpoint', () => {

    });
  });
});
