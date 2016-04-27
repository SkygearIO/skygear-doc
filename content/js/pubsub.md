## Subscribing to an event

```js
skygear.on('ping', (data) => {
  let from_ = data.from;
  console.log('received a ping from %s', from_);
});
```

## Unsubscribing an event

### Unsubscribing from all handler

```js
skygear.off('ping');
```

### Unsubscribing a specific handler

```js
const handler = (data) => {
  console.log('received a ping');
};
let subscriber = skygear.on('ping', handler);

// later
subscriber.off('ping', handler);
```

## More control on pubsub package

Developer will need to interact directly with `pubsub` package for more advanced
usages.

## Publishing an event

```js
skygear.pubsub.publish('ping', {'from': 'Specialized Ping Force'});
```

## Listening to Connection state

For application that needs to know the status of pubsub connection, we
provide `onOpen` and `onClose` callback for that.


```js
function welcome() {
  console.log('Chat are ready!');
}

function alert() {
  console.log('Chat is temporarily unavaliable');
}

const welcomeHandle = skygear.pubsub.onOpen(welcome);
const alertHandle = skygear.pubsub.onClose(alert);

// You may cancel the registered callback by calling cancel
welcomeHandle.cancel();
alertHandle.cancel();
```
