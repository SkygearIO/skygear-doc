import { expect } from 'chai';
import * as ContentSearcher from '../utils/guideContentSearcher';

const database = [
  {
    title: 'Quick Start Guide',
    description: 'Adding Skygear to your iOS, Android and web apps',
    baseUrl: '/guides/quickstart/',
    languages: ['ios', 'android', 'js'],
  },
  {
    title: 'User Authentication Basics',
    description: 'User Log-in/Log-out, user access tokens, email and password managements',
    baseUrl: '/guides/auth/basics/',
    languages: ['ios', 'android', 'js'],
  },
  {
    title: 'Quick Start for Chat',
    description: 'Adding Skygea Chat to your iOS, Android and web apps',
    baseUrl: '/guides/chat/quick-start/',
    languages: ['ios', 'android', 'js'],
  },
  {
    title: 'Skygear Chat Basics',
    description: 'Creating chatrooms, sending and receiving messages with Chat APIs',
    baseUrl: '/guides/chat/basics/',
    languages: ['ios', 'android', 'js'],
  },
];

describe('Guide Content Searcher', () => {
  it('can get the existing content', () => {
    expect(ContentSearcher.search('guides/chat/basics/js', database))
    .eql({
      title: 'Skygear Chat Basics',
      description: 'Creating chatrooms, sending and receiving messages with Chat APIs',
      baseUrl: '/guides/chat/basics/',
      languages: ['ios', 'android', 'js'],
    });
  });

  it('can get the content even language not match', () => {
    expect(ContentSearcher.search('guides/chat/basics/python', database))
    .eql({
      title: 'Skygear Chat Basics',
      description: 'Creating chatrooms, sending and receiving messages with Chat APIs',
      baseUrl: '/guides/chat/basics/',
      languages: ['ios', 'android', 'js'],
    });
  });

  it('cannot get the not existing content', () => {
    expect(ContentSearcher.search('guides/auth/provider/js', database)).to.be.undefined;
  });
});
