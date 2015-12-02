import chai from 'chai';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

global.sinon = require('sinon');
global.chrome = require('sinon-chrome');
global.expect = chai.expect;
