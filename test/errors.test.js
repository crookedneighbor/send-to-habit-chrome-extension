import {
  MessageError
} from '../src/js/errors';

describe('Errors', () => {
  describe('MessageError', () => {
    it('is an instance of Error', () => {
      let error = new MessageError();

      expect(error).to.be.an.instanceOf(Error);
    });

    it('instantiates text parameter with an empty string by default', () => {
      let error = new MessageError();

      expect(error.text).to.eql('');
    });

    it('allows argument to be passed in for message', () => {
      let error = new MessageError('some message');

      expect(error.text).to.eql('some message');
    });

    it('is not silent by default', () => {
      let error = new MessageError('some message');

      expect(error.silent).to.eql(false);
    });

    it('can be configured to be silent', () => {
      let error = new MessageError('some message', { silent: true });

      expect(error.silent).to.eql(true);
    });

    it('configures to be silent if no message is passed in', () => {
      let error = new MessageError();

      expect(error.silent).to.eql(true);
    });
  });
});
