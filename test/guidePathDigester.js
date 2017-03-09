import { expect } from 'chai';
import * as PathDigester from '../utils/guidePathDigester';

describe('Guide Path Digester', () => {
  it('can digest 3 parts paths', () => {
    expect(PathDigester.digest('guides/cloud-db/queries/js')).eql({
      section: 'cloud-db',
      name: 'queries',
      language: 'js',
    });
  });

  it('can digest 2 parts paths', () => {
    expect(PathDigester.digest('guides/advanced/server')).eql({
      section: 'advanced',
      name: 'server',
    });
  });

  it('can digest 1 part paths', () => {
    expect(PathDigester.digest('guides/get-started')).eql({
      name: 'get-started',
    });
  });

  it('cannot digest null path', () => {
    expect(() => PathDigester.digest()).to.throw('Missing path');
  });

  it('cannot digest path with incorrect prefix', () => {
    expect(() => PathDigester.digest('non-guides/cloud-db/queries/js'))
    .to.throw('Missing path');
  });

  it('can will trim the trailing slash', () => {
    expect(PathDigester.digest('guides/cloud-db/queries/js/')).eql({
      section: 'cloud-db',
      name: 'queries',
      language: 'js',
    });
  });

  it('can will trim the leading slash', () => {
    expect(PathDigester.digest('/guides/cloud-db/queries/js')).eql({
      section: 'cloud-db',
      name: 'queries',
      language: 'js',
    });
  });
});
