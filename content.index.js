const guideListConfig = {
  sections: [
    {
      name: 'Quick Start',
      guides: [
        {
          title: 'Quick Start Guide',
          description: 'Adding Skygear to your iOS, Android and web apps',
          baseUrl: '/guides/intro/quickstart/',
          languages: ['ios', 'android', 'js'],
        },
        {
          title: 'Integrating frameworks',
          description: 'Integrating Webpack, Ionic and Angular',
          baseUrl: '/guides/intro/integration/',
          languages: ['js'],
        },
      ],
    },
    {
      name: 'User Authentication',
      guides: [
        {
          title: 'User Authentication Basics',
          description: 'User Log-in/Log-out, user access tokens, email and password managements',
          baseUrl: '/guides/auth/basics/',
          languages: ['ios', 'android', 'js'],
        },
        {
          title: 'Social Login',
          description: 'Third-party login, e.g. Facebook, Google',
          baseUrl: '/guides/auth/social-login/',
          languages: ['ios', 'android', 'js'],
        },
        {
          title: 'User Profile Best Practices',
          description: 'Saving and retrieving custom profile attributes',
          baseUrl: '/guides/auth/user-profile/',
          languages: ['ios', 'android', 'js'],
        },
      ],
    },
    {
      name: 'Skygear Cloud Database',
      guides: [
        {
          title: 'Cloud Database Basics',
          description: 'Storing data in the database using Records, with' +
            ' guides to basic record CRUD (create, read, update, delete)',
          baseUrl: '/guides/cloud-db/basics/',
          languages: ['ios', 'android', 'js'],
        },
        {
          title: 'Queries',
          description: 'From the simplest queries to more complex ones' +
            ' such as AND/OR conditions and pagination',
          baseUrl: '/guides/cloud-db/queries/',
          languages: ['ios', 'android', 'js'],
        },
        {
          title: 'Data Types',
          description: 'A guide to the supported data types:' +
            ' numbers, strings, foreign keys, locations, file uploads and more',
          baseUrl: '/guides/cloud-db/data-types/',
          languages: ['ios', 'android', 'js'],
        },
        {
          title: 'Access Control Basics',
          description: 'Setting up restriction to certain database table' +
            ' or individual record is easy',
          baseUrl: '/guides/cloud-db/acl/',
          languages: ['ios', 'android', 'js'],
        },
        {
          title: 'Offline Storage',
          description: 'Creating cached queries to save query results locally',
          baseUrl: '/guides/cloud-db/offline-storage/',
          languages: ['ios', 'android', 'js'],
        },
        {
          title: 'Query Subscriptions',
          description: 'Subscribing to database data changes from the client',
          baseUrl: '/guides/cloud-db/query-subscription/',
          languages: ['ios', 'android', 'js'],
        },
      ],
    },
    {
      name: 'Skygear Chat',
      guides: [
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
      ],
    },
    {
      name: 'Skygear PubSub',
      guides: [
        {
          title: 'PubSub Basics',
          description: 'Adding the publish-subscribe functioality to your' +
            ' app with Skygear',
          baseUrl: '/guides/pubsub/basics/',
          languages: ['ios', 'android', 'js'],
        },
      ],
    },
    {
      name: 'Push Notifications',
      guides: [
        {
          title: 'Push Notification Basics',
          description: 'Sending push notifications with Skygear',
          baseUrl: '/guides/push-notifications/basics/',
          languages: ['ios', 'android', 'js'],
        },
      ],
    },
    {
      name: 'Cloud Functions',
      guides: [
        {
          title: 'Introduction to Cloud Functions',
          description: 'The first step to using the Skygear cloud functions' +
            ' to have your codes running on Skygear server',
          baseUrl: '/guides/cloud-function/intro-and-deployment/',
          languages: ['python'],
        },
        {
          title: 'Trigger by Database Event',
          description: 'Running codes upon database events such as' +
            ' creating, updating or deleting records',
          baseUrl: '/guides/cloud-function/database-hooks/',
          languages: ['python'],
        },
        {
          title: 'Trigger by Schedule',
          description: 'Executing your server codes at specified time' +
            ' or intervals',
          baseUrl: '/guides/cloud-function/scheduled-tasks/',
          languages: ['python'],
        },
        {
          title: 'Trigger by Client SDK',
          description: 'Lambda functions can be called from the SDKs' +
            ' to execute your custom codes on Skygear server',
          baseUrl: '/guides/cloud-function/lambda/',
          languages: ['python'],
        },
        {
          title: 'Trigger by HTTP Endpoint',
          description: 'Creating your own HTTP endpoint so that external' +
            ' applications can send GET/POST and other requests to your app',
          baseUrl: '/guides/cloud-function/http-endpoint/',
          languages: ['python'],
        },
        {
          title: 'Trigger by Restful HTTP Endpoint',
          description: 'Creating your own set of restful HTTP endpoint easily' +
            ' through cloud functions',
          baseUrl: '/guides/cloud-function/restful-http-endpoint/',
          languages: ['python'],
        },
        {
          title: 'Serving Static Assets',
          description: 'Methods to make your static assets such as images' +
            ' accessible with a URL',
          baseUrl: '/guides/cloud-function/static-assets/',
          languages: ['python'],
        },
        {
          title: 'APIs in Cloud Functions',
          description: 'Calling Skygear API, using database connections,' +
            ' pubsub, push notifications, and using the master key to' +
            ' impersonate user for the admin',
          baseUrl: '/guides/cloud-function/calling-skygear-api/',
          languages: ['python'],
        },
        {
          title: 'Authenticating Users',
          description: 'Getting the authenticated user ID from the cloud' +
            ' functions, and resetting the password of a user',
          baseUrl: '/guides/cloud-function/authenticating-users/',
          languages: ['python'],
        },
        {
          title: 'Error Handling',
          description: 'Error handling in cloud functions',
          baseUrl: '/guides/cloud-function/error-handling/',
          languages: ['python'],
        },
      ],
    },
    {
      name: 'Social Network',
      guides: [
        {
          title: 'User Relations Basics',
          description: 'Creating Friends/Followers relationships',
          baseUrl: '/guides/social-network/basics/',
          languages: ['ios', 'android', 'js'],
        },
      ],
    },
    {
      name: 'Advanced',
      guides: [
        {
          title: 'Skygear Command Line Tools',
          description: 'Managing your database schema and data through the command line interface.',
          // no trailing slash if language not applicable
          baseUrl: '/guides/advanced/skycli',
          languages: [''],
        },
        {
          title: 'Deploy Skygear Local Server',
          description: 'Reference for deploy Skygear server',
          // no trailing slash if language not applicable
          baseUrl: '/guides/advanced/server',
          languages: [''],
        },
        {
          title: 'Skygear Database Schema',
          description: 'More details about database record tables, reserved columns,' +
            ' schema migration and reserved tables',
          // no trailing slash if language not applicable
          baseUrl: '/guides/advanced/database-schema',
          languages: [''],
        },
        {
          title: 'Custom Authentication Provider',
          description: 'User authentication with third-party service',
          // no trailing slash if language not applicable
          baseUrl: '/guides/advanced/auth-provider/',
          languages: ['python'],
        },
      ],
    },
  ],
};

export default guideListConfig;
