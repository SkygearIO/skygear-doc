const guideListConfig = {
  sections: [
    {
      id: 'intro',
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
      id: 'auth',
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
          title: 'Authenticate with a custom auth system',
          description: 'Integrate authentication server to Skygear using JWT',
          baseUrl: '/guides/auth/custom-token/',
          languages: ['ios', 'android', 'js'],
        },
        {
          title: 'User Profile Best Practices',
          description: 'Saving and retrieving custom profile attributes',
          baseUrl: '/guides/auth/user-profile/',
          languages: ['ios', 'android', 'js'],
        },
        {
          title: 'Disabling User Accounts',
          description: 'Learn how to disable a user account',
          baseUrl: '/guides/auth/disable/',
          languages: ['ios', 'android', 'js'],
        },
        {
          title: 'Password Policy',
          description: 'Enforce stronger passwords with Password Policy',
          baseUrl: '/guides/auth/password-policy/',
          languages: ['ios', 'android', 'js'],
        },
      ],
    },
    {
      id: 'cloud-db',
      name: 'Cloud Database',
      guides: [
        {
          title: 'Cloud Database Basics',
          description: 'Intro to Skygear records, ' +
            ' public and private database and Skygear data type',
          baseUrl: '/guides/cloud-db/basics/',
          languages: ['ios', 'android', 'js'],
        },
        {
          title: 'Basic CRUD',
          description: 'Create, update, query and delete Skygear records',
          baseUrl: '/guides/cloud-db/crud/',
          languages: ['ios', 'android', 'js'],
        },
        {
          title: 'More About Queries',
          description: 'Query conditions, paginations and record counts',
          baseUrl: '/guides/cloud-db/queries/',
          languages: ['ios', 'android', 'js'],
        },
        {
          title: 'Relational Records',
          description: 'Create and query Skygear references, eager loading',
          baseUrl: '/guides/cloud-db/relational-records/',
          languages: ['ios', 'android', 'js'],
        },
        {
          title: 'File Storage',
          description: 'Create and query files in Skygear',
          baseUrl: '/guides/cloud-db/files/',
          languages: ['ios', 'android', 'js'],
        },
        {
          title: 'Location, Auto-increment sequence fields',
          description: 'Create and query locations and sequence',
          baseUrl: '/guides/cloud-db/data-types/',
          languages: ['ios','android','js'],
        },
        {
          title: 'Cached query',
          description: 'Working with offline storage',
          baseUrl: '/guides/cloud-db/offline-storage/',
          languages: ['ios', 'android', 'js'],
        },
        {
          title: 'Query Subscriptions',
          description: 'Subscribe to database data changes from the client',
          baseUrl: '/guides/cloud-db/query-subscription/',
          languages: ['ios', 'android', 'js'],
        },
      ],
    },
    {
      id: 'acl',
      name: 'Access Control',
      guides: [
        {
          title: 'Access Control Basics',
          description: 'Intro to access control in Skygear',
          baseUrl: '/guides/acl/acl-overview/',
          languages: ['ios', 'android', 'js'],
        },
        {
          title: 'Record-based ACL',
          description: 'Set the ACL of a record type',
          baseUrl: '/guides/acl/record-acl/',
          languages: ['ios', 'android', 'js'],
        },
        {
          title: 'Field-based ACL',
          description: 'Set the ACL of a record field',
          baseUrl: '/guides/acl/field-acl',
          languages: [''],
        },
      ],
    },
    {
      id: 'chat',
      name: 'Real-time Chat',
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
        {
          title: 'Skygear Chat Data Models',
          description: 'Data models of Skygear Chat',
          baseUrl: '/guides/chat/models',
          languages: ['']
        },
        {
          title: 'Chat Event Hooks',
          description: 'Running codes upon chat event such as message sent',
          baseUrl: '/guides/chat/cloud-event-hook/',
          languages: ['python', 'js']
        },
        {
          title: 'Skygear Chat UI Kit',
          description: 'UIKit of Skygear Chat',
          baseUrl: '/guides/chat/uikit/',
          languages:['ios', 'android'],
        },
      ],
    },
    {
      id: 'pubsub',
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
      id: 'push-notifications',
      name: 'Push Notifications',
      guides: [
        {
          title: 'Setting up Push Notification',
          description: 'Setting Push Notification with FCM or APN',
          baseUrl: '/guides/push-notifications/config/',
          languages: ['ios', 'android'],
        },
        {
          title: 'Push Notification Basics',
          description: 'Sending push notifications with Skygear',
          baseUrl: '/guides/push-notifications/basics/',
          languages: ['ios', 'android', 'js'],
        },
      ],
    },
    {
      id: 'cloud-function',
      name: 'Cloud Functions',
      guides: [
        {
          title: 'Introduction to Cloud Functions',
          description: 'The first step to using the Skygear cloud functions' +
            ' to have your codes running on Skygear server',
          baseUrl: '/guides/cloud-function/intro-and-deployment',
          languages: [''],
        },
        {
          title: 'Trigger by Database Event',
          description: 'Running codes upon database events such as' +
            ' creating, updating or deleting records',
          baseUrl: '/guides/cloud-function/database-hooks/',
          languages: ['python', 'js'],
        },
        {
          title: 'Trigger by Schedule',
          description: 'Executing your server codes at specified time' +
            ' or intervals',
          baseUrl: '/guides/cloud-function/scheduled-tasks/',
          languages: ['python', 'js'],
        },
        {
          title: 'Trigger by Client SDK',
          description: 'Lambda functions can be called from the SDKs' +
            ' to execute your custom codes on Skygear server',
          baseUrl: '/guides/cloud-function/lambda/',
          languages: ['python', 'js'],
        },
        {
          title: 'Trigger by HTTP Endpoint',
          description: 'Creating your own HTTP endpoint so that external' +
            ' applications can send GET/POST and other requests to your app',
          baseUrl: '/guides/cloud-function/http-endpoint/',
          languages: ['python', 'js'],
        },
        {
          title: 'Trigger by Restful HTTP Endpoint',
          description: 'Creating your own set of restful HTTP endpoint easily' +
            ' through cloud functions',
          baseUrl: '/guides/cloud-function/restful-http-endpoint/',
          languages: ['python'],
        },
        {
          title: 'Trigger by Chat Events',
          description: 'Running codes upon chat event such as message sent',
          baseUrl: '/guides/chat/cloud-event-hook/',
          languages: ['python', 'js']
        },
        {
          title: 'Serving Static Assets',
          description: 'Methods to make your static assets such as images' +
            ' accessible with a URL',
          baseUrl: '/guides/cloud-function/static-assets/',
          languages: ['python', 'js'],
        },
        {
          title: 'APIs in Cloud Functions',
          description: 'Calling Skygear API, using database connections,' +
            ' pubsub, push notifications, and using the master key to' +
            ' impersonate user for the admin',
          baseUrl: '/guides/cloud-function/calling-skygear-api/',
          languages: ['python', 'js'],
        },
        {
          title: 'Authenticating Users',
          description: 'Getting the authenticated user ID from the cloud' +
            ' functions, and resetting the password of a user',
          baseUrl: '/guides/cloud-function/authenticating-users/',
          languages: ['python', 'js'],
        },
        {
          title: 'Error Handling',
          description: 'Error handling in cloud functions',
          baseUrl: '/guides/cloud-function/error-handling/',
          languages: ['python', 'js'],
        },
      ],
    },
    {
      id: 'advanced',
      name: 'Advanced',
      guides: [
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
        {
          title: 'Error Handling in the SDKs',
          description: 'Handle error with error codes in SDK when operations fail',
          // no trailing slash if language not applicable
          baseUrl: '/guides/advanced/sdk-error-handling/',
          languages: ['ios', 'android', 'js'],
        },
        {
          title: 'User Relations',
          description: 'Creating Friends/Followers relationships',
          baseUrl: '/guides/social-network/basics/',
          languages: ['ios', 'android', 'js'],
        },
        {
          title: 'Record Storage',
          description: 'Working with the Skygear offline database',
          baseUrl: '/guides/advanced/record-storage/',
          languages: ['ios'],
        },
      ],
    },
  ],
};

export default guideListConfig;
