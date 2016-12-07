import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Landing from './pages/home/index';
import Guide from './pages/guide/index';
import GuideList from './pages/guideList/index';
import NotFound from './pages/error/index';
import ComingSoon from './pages/comingSoon';

const routes = (
  <Route path='/'>
    <IndexRoute title='Skygear Documentation' component={Landing} />
    <Route path='guides/' component={GuideList} />
    <Route path='guide' component={Guide}>
      <Route path='auth/basics/js/' title='Auth - Basics' markdown={require('./content/auth/basics-js.md')} />
      <Route path='auth/basics/android/' title='Auth - Basics' markdown={require('./content/auth/basics-android.md')} />
      <Route path='auth/basics/ios/' title='Auth - Basics' markdown={require('./content/auth/basics-ios.md')} />
      <Route path='auth/social-login/js/' title='Auth - Social Login' markdown={require('./content/auth/social-login-js.md')} />
      <Route path='auth/social-login/android/' title='Auth - Social Login' markdown={require('./content/auth/social-login-android.md')} />
      <Route path='auth/social-login/ios/' title='Auth - Social Login' markdown={require('./content/auth/social-login-ios.md')} />
      <Route path='auth/user-profile/js/' title='Auth - User Profile' markdown={require('./content/auth/user-profile-js.md')} />
      <Route path='auth/user-profile/android/' title='Auth - User Profile' markdown={require('./content/auth/user-profile-android.md')} />
      <Route path='auth/user-profile/ios/' title='Auth - User Profile' markdown={require('./content/auth/user-profile-ios.md')} />
      <Route path='cloud-db/basics/js/' title='Cloud DB - Basics' markdown={require('./content/cloud-db/basics-js.md')} />
      <Route path='cloud-db/basics/android/' title='Cloud DB - Basics' markdown={require('./content/cloud-db/basics-android.md')} />
      <Route path='cloud-db/basics/ios/' title='Cloud DB - Basics' markdown={require('./content/cloud-db/basics-ios.md')} />
      <Route path='cloud-db/queries/js/' title='Cloud DB - Queries' markdown={require('./content/cloud-db/queries-js.md')} />
      <Route path='cloud-db/queries/android/' title='Cloud DB - Queries' markdown={require('./content/cloud-db/queries-android.md')} />
      <Route path='cloud-db/queries/ios/' title='Cloud DB - Queries' markdown={require('./content/cloud-db/queries-ios.md')} />
      <Route path='cloud-db/data-types/js/' title='Cloud DB - Data Types' markdown={require('./content/cloud-db/data-types-js.md')} />
      <Route path='cloud-db/data-types/android/' title='Cloud DB - Data Types' markdown={require('./content/cloud-db/data-types-android.md')} />
      <Route path='cloud-db/data-types/ios/' title='Cloud DB - Data Types' markdown={require('./content/cloud-db/data-types-ios.md')} />
      <Route path='cloud-db/acl/js/' title='Cloud DB - ACL' markdown={require('./content/cloud-db/acl-js.md')} />
      <Route path='cloud-db/acl/android/' title='Cloud DB - ACL' markdown={require('./content/cloud-db/acl-android.md')} />
      <Route path='cloud-db/acl/ios/' title='Cloud DB - ACL' markdown={require('./content/cloud-db/acl-ios.md')} />
      <Route path='cloud-db/offline-storage/js/' title='Cloud DB - Offline Storage' markdown={require('./content/cloud-db/offline-storage-js.md')} />
      <Route path='cloud-db/offline-storage/android/' title='Cloud DB - Offline Storage' markdown={require('./content/cloud-db/offline-storage-android.md')} />
      <Route path='cloud-db/offline-storage/ios/' title='Cloud DB - Offline Storage' markdown={require('./content/cloud-db/offline-storage-ios.md')} />
      <Route path='cloud-db/query-subscription/js/' title='Cloud DB - Query Subscription' markdown={require('./content/cloud-db/query-subscription-js.md')} />
      <Route path='cloud-db/query-subscription/android/' title='Cloud DB - Query Subscription' markdown={require('./content/cloud-db/query-subscription-android.md')} />
      <Route path='cloud-db/query-subscription/ios/' title='Cloud DB - Query Subscription' markdown={require('./content/cloud-db/query-subscription-ios.md')} />
      <Route path='pubsub/basics/js/' title='Pubsub - Basics' markdown={require('./content/pubsub/basics-js.md')} />
      <Route path='pubsub/basics/android/' title='Pubsub - Basics' markdown={require('./content/pubsub/basics-android.md')} />
      <Route path='pubsub/basics/ios/' title='Pubsub - Basics' markdown={require('./content/pubsub/basics-ios.md')} />
      <Route path='push-notifications/basics/js/' title='Push Notifications - Basics' markdown={require('./content/push-notifications/basics-js.md')} />
      <Route path='push-notifications/basics/android/' title='Push Notifications - Basics' markdown={require('./content/push-notifications/basics-android.md')} />
      <Route path='push-notifications/basics/ios/' title='Push Notifications - Basics' markdown={require('./content/push-notifications/basics-ios.md')} />
      <Route path='cloud-code/authenticating-users/python/' title='Cloud Code - Authenticating Users' markdown={require('./content/cloud-code/authenticating-users-python.md')} />
      <Route path='cloud-code/calling-skygear-api/python/' title='Cloud Code - Calling Skygear API' markdown={require('./content/cloud-code/calling-skygear-api-python.md')} />
      <Route path='cloud-code/database-hooks/python/' title='Cloud Code - Database Hooks' markdown={require('./content/cloud-code/database-hooks-python.md')} />
      <Route path='cloud-code/error-handling/python/' title='Cloud Code - Error Handling' markdown={require('./content/cloud-code/error-handling-python.md')} />
      <Route path='cloud-code/http-endpoint/python/' title='Cloud Code - HTTP Endpoint' markdown={require('./content/cloud-code/http-endpoint-python.md')} />
      <Route path='cloud-code/intro-and-deployment/python/' title='Cloud Code - Introduction and Deployment' markdown={require('./content/cloud-code/intro-and-deployment-python.md')} />
      <Route path='cloud-code/lambda/python/' title='Cloud Code - Lambda Function' markdown={require('./content/cloud-code/lambda-python.md')} />
      <Route path='cloud-code/restful-http-endpoint/python/' title='Cloud Code - Restful HTTP Endpoint' markdown={require('./content/cloud-code/restful-http-endpoint-python.md')} />
      <Route path='cloud-code/scheduled-tasks/python/' title='Cloud Code - Scheduled Tasks' markdown={require('./content/cloud-code/scheduled-tasks-python.md')} />
      <Route path='cloud-code/static-assets/python/' title='Cloud Code - Static Assets' markdown={require('./content/cloud-code/static-assets-python.md')} />
    </Route>
    <Route path='coming-soon/' title='Coming Soon' component={ComingSoon} />
    <Route path='*' title='404: Not Found' component={NotFound} />
  </Route>
);

// Be sure to export the React component so that it can be statically rendered
export default routes;
