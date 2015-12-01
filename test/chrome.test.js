import {
  setChromeOptions,
  getChromeOptions,
} from '../src/js/chrome';

describe('chrome', () => {
  describe('#setChromeOptions', () => {
    beforeEach(() => {
      chrome.storage.sync.set.yields();
    });

    afterEach(() => {
      chrome.storage.sync.set.reset();
    });

    it('sets chrome storage with specified options', () => {
      let options = { foo: 'foo', bar: 'bar' };

      return setChromeOptions(options).then(() => {
        expect(chrome.storage.sync.set).to.be.calledOnce;
        expect(chrome.storage.sync.set).to.be.calledWith(options);
      });
    });
  });

  describe('#getChromeOptions', () => {
    beforeEach(() => {
      chrome.storage.sync.get.yields();
    });

    afterEach(() => {
      chrome.storage.sync.get.reset();
    });

    it('gets chrome storage with specified options', () => {
      let options = { foo: 'foo', bar: 'bar' };

      return getChromeOptions(options).then(() => {
        expect(chrome.storage.sync.get).to.be.calledOnce;
        expect(chrome.storage.sync.get).to.be.calledWith(options);
      });
    });

    it('gets chrome storage with default options if none are provided', () => {
      let defaultOptions = {
        habitica: {
          uuid: '',
          token: '',
          endpoint: 'https://habitica.com/api/v2',
        },
      };

      return getChromeOptions().then(() => {
        expect(chrome.storage.sync.get).to.be.calledOnce;
        expect(chrome.storage.sync.get).to.be.calledWith(defaultOptions);
      });
    });
  });
});
