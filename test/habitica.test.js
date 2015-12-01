import {
  setupHabitica,
} from '../src/js/habitica';

import Habitica from 'habitica';

describe('habitica', () => {
  describe('#setupHabitica', () => {
    it('returns an instance of habitica', () => {
      let data = { uuid: 'foo', token: 'bar' };
      let habitica = setupHabitica(data);

      expect(habitica).to.be.an.instanceOf(Habitica);
    });

    it('initializes habitica with provided uuid and token', () => {
      let data = { uuid: 'foo', token: 'bar' };
      let habitica = setupHabitica(data);

      expect(habitica.getUuid()).to.eql('foo');
      expect(habitica.getToken()).to.eql('bar');
    });

    it('defaults habitica instance to v2 endpoint', () => {
      let data = { uuid: 'foo', token: 'bar', endpoint: '' };
      let habitica = setupHabitica(data);

      expect(habitica.getEndpoint()).to.eql('https://habitica.com/api/v2');
    });

    it('configures habitica with custom endpoint', () => {
      let data = { uuid: 'foo', token: 'bar', endpoint: 'http://localhost:3000/api/v2' };
      let habitica = setupHabitica(data);

      expect(habitica.getEndpoint()).to.eql('http://localhost:3000/api/v2');
    });

    it('throws an error if uuid is missing', () => {
      let data = { token: 'bar', endpoint: 'http://localhost:3000/api/v2' };

      expect(() => {
        setupHabitica(data);
      }).to.throw('Send to Habitica requires you to configure the extension with your Habitica user id and api token. Find them at https://habitica.com/#/options/settings/api');
    });

    it('throws an error if token is missing', () => {
      let data = { uuid: 'foo', endpoint: 'http://localhost:3000/api/v2' };

      expect(() => {
        setupHabitica(data);
      }).to.throw('Send to Habitica requires you to configure the extension with your Habitica user id and api token. Find them at https://habitica.com/#/options/settings/api');
    });
  });
});
