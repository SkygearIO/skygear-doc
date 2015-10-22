+++
date = "2015-10-16T18:13:21+08:00"
draft = true
title = "Subscriptions"

+++

## Creating a subscription

```js
let Note = Record.extend('note');
let query = skygear.Query(Note);
query.equalTo('_created_by', currentUserID);

subscription = skygear.Subscription('my notes');
subscription.query = query;
skygear.publicDB.saveSubscription(subscription);
```

## Fetching subscription

```js
skygear.publicDB.fetchSubscription('my notes').then((subscription) => {
  // examine the subscription here
}, (error) => {
  console.log('error fetching "my notes": %o', error);
});
```

## Fetching all subscriptions

```js
skygear.publicDB.fetchAllSubscriptions.then((subscriptions) => {
  subscriptions.forEach(sub => {
    // do something with the subscription here
  });
}, (error) => {
  console.log('error fetching all subscriptions: %o', error);
});
```

## Deleting a subscription

```js
skygear.publicDB.deleteSubscription('my notes').then((subscription) => {
  console.log('success deleting "my notes"')
}, (error) => {
  console.log('error deleting "my notes": %o', error)
});
```

## Listening to subscription notification

```js
skygear.addNotificationListener((notification) => {
  if (notification.subscriptionID === 'my notes') {
    switch (notification.reason) {
      case skygear.NOTIFICATION_REASON_DELETED:
        deleteNote(notification.recordID);
        break;
      case skygear.NOTIFICATION_REASON_CREATED:
      case skygear.NOTIFICATION_REASON_UPDATED:
        let id = notification.recordID;
        let changes = notification.recordChanges;
        updateNote(id, changes);
        break;
    }
  }
});
```

# Removing a notification listener

```js
let listener = skygear.addNotificationListener((notification) => {
  // ...
});

// later in the program
listener.off();
```
