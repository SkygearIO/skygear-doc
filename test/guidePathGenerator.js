import { expect } from 'chai';
import PathGenerator from '../utils/guidePathGenerator';

describe('Guide Path Generator', () => {
  it('can generate path correctly with relative base URL', () => {
    const generator = new PathGenerator({ baseUrl: 'guides/' });

    expect(generator.generate('push-notifications/basics/android.md'))
      .eql('guides/push-notifications/basics/android/');

    expect(generator.generate('cloud-db/query-subscription/ios'))
      .eql('guides/cloud-db/query-subscription/ios/');
  });

  it('can generate path correctly with absolute base URL', () => {
    const generator = new PathGenerator({
      baseUrl: 'https://docs.skygear.io/guides/',
    });

    expect(generator.generate('push-notifications/basics/android.md'))
      .eql('https://docs.skygear.io/guides/push-notifications/basics/android/');

    expect(generator.generate('cloud-db/query-subscription/ios'))
      .eql('https://docs.skygear.io/guides/cloud-db/query-subscription/ios/');
  });

  it('can generate path correctly without base URL', () => {
    const generator = new PathGenerator();

    expect(generator.generate('push-notifications/basics/android.md'))
      .eql('push-notifications/basics/android/');

    expect(generator.generate('cloud-db/query-subscription/ios'))
      .eql('cloud-db/query-subscription/ios/');
  });
});
