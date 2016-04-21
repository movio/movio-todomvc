
// import { describe, it } from 'mocha';
import { expect } from 'chai';

describe('First Test', () => {
  it('yep', () => {
    expect('foo').to.equal('foo');
  });
  it('truthiness', () => {
    expect(true).to.equal(true);
  });
});

