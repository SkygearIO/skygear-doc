const guideListConfig = {
  sections: [
    {
      name: 'Getting Started',
      guides: [
        {
          title: 'Setup Skygear',
          description: 'Signing up for Skygear hosting and' +
            ' create your first application using our iOS/Android/JavaScript SDK.',
          baseUrl: '/guide/get-started/',
          languages: ['ios', 'android', 'js'],
        },
      ],
    },
    {
      name: 'User Authentication',
      guides: [
        {
          title: 'User Authentication Basics',
          description: 'User Log-in/Log-out, user access tokens, email and password managements',
          baseUrl: '/guide/auth/basics/',
          languages: ['ios', 'android', 'js'],
        },
        {
          title: 'Social Login',
          description: 'Third-party login, e.g. Facebook, Google',
          baseUrl: '/guide/auth/social-login/',
          languages: ['ios', 'android', 'js'],
        },
        {
          title: 'Creating User Profile for Authenticated Users',
          description: 'Saving and retrieving custom profile attributes',
          baseUrl: '/guide/auth/user-profile/',
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
          baseUrl: '/guide/cloud-db/basics/',
          languages: ['ios', 'android', 'js'],
        },
        {
          title: 'Performing Data Queries from Database',
          description: 'From the simplest queries to more complex ones' +
            ' such as AND/OR conditions and pagination',
          baseUrl: '/guide/cloud-db/queries/',
          languages: ['ios', 'android', 'js'],
        },
        {
          title: 'Data Types',
          description: 'A guide to the supported data types:' +
            ' numbers, strings, foreign keys, locations, file uploads and more',
          baseUrl: '/guide/cloud-db/data-types/',
          languages: ['ios', 'android', 'js'],
        },
        {
          title: 'Access Control Basics',
          description: 'Setting up restriction to certain database table' +
            ' or individual record is easy',
          baseUrl: '/guide/cloud-db/acl/',
          languages: ['ios', 'android', 'js'],
        },
        {
          title: 'Offline Storage',
          description: 'Creating cached queries to save query results locally',
          baseUrl: '/guide/cloud-db/offline-storage/',
          languages: ['ios', 'android', 'js'],
        },
        {
          title: 'Query Subscriptions',
          description: 'Subscribing to database data changes from the client',
          baseUrl: '/guide/cloud-db/query-subscription/',
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
          baseUrl: '/guide/pubsub/basics/',
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
          baseUrl: '/guide/push-notifications/basics/',
          languages: ['ios', 'android', 'js'],
        },
      ],
    },
    {
      name: 'Cloud Functions',
      guides: [
        {
          title: 'Introduction and Deployment of Cloud Functions',
          description: 'The first step to using the Skygear cloud functions' +
            ' to have your codes running on Skygear server',
          baseUrl: '/guide/cloud-function/intro-and-deployment/',
          languages: ['python'],
        },
        {
          title: 'Cloud Functions for Database Event Hooks',
          description: 'Running codes upon database events such as' +
            ' creating, updating or deleting records',
          baseUrl: '/guide/cloud-function/database-hooks/',
          languages: ['python'],
        },
        {
          title: 'Cloud Functions for Creating Scheduled Tasks',
          description: 'Executing your server codes at specified time' +
            ' or intervals',
          baseUrl: '/guide/cloud-function/scheduled-tasks/',
          languages: ['python'],
        },
        {
          title: 'Cloud Functions for Skygear SDKs to call',
          description: 'Lambda functions can be called from the SDKs' +
            ' to execute your custom codes on Skygear server',
          baseUrl: '/guide/cloud-function/lambda/',
          languages: ['python'],
        },
        {
          title: 'Cloud Functions as HTTP Endpoint',
          description: 'Creating your own HTTP endpoint so that external' +
            ' applications can send GET/POST and other requests to your app',
          baseUrl: '/guide/cloud-function/http-endpoint/',
          languages: ['python'],
        },
        {
          title: 'Cloud Functions as Restful HTTP Endpoint',
          description: 'Creating your own set of restful HTTP endpoint easily' +
            ' through cloud functions',
          baseUrl: '/guide/cloud-function/restful-http-endpoint/',
          languages: ['python'],
        },
        {
          title: 'Serving Static Assets from Skygear Server',
          description: 'Methods to make your static assets such as images' +
            ' accessible with a URL',
          baseUrl: '/guide/cloud-function/static-assets/',
          languages: ['python'],
        },
        {
          title: 'Calling Skygear API from Cloud Functions',
          description: 'Calling Skygear API, using database connections,' +
            ' pubsub, push notifications, and using the master key to' +
            ' impersonate user for the admin',
          baseUrl: '/guide/cloud-function/calling-skygear-api/',
          languages: ['python'],
        },
        {
          title: 'Authenticating Users',
          description: 'Getting the authenticated user ID from the cloud' +
            ' functions, and resetting the password of a user',
          baseUrl: '/guide/cloud-function/authenticating-users/',
          languages: ['python'],
        },
        {
          title: 'Error Handling',
          description: 'Error handling in cloud functions',
          baseUrl: '/guide/cloud-function/error-handling/',
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
          baseUrl: '/guide/social-network/basics/',
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
          baseUrl: '/guide/advanced/skycli', // no trailing slash if language not applicable
          languages: [''],
        },
      ],
    },
  ],
};

export default guideListConfig;
