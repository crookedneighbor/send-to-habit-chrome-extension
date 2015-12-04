export class MessageError extends Error {
  constructor (message = '', options = {}) {
    super();

    this.text = message;
    this.silent = options.silent === true || message === '';
  }
}
