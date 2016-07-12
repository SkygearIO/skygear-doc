Pubsub will only work after the user has logged in. You can check the connection
by accessing `skygear.pubsub.connected`. Here, all the examples are using event
`ping`.

## Subscribing to an event

``` javascript
skygear.on('ping', (data) => {
  console.log(data);
});
```

## Unsubscribing an event

### Unsubscribing all handlers for an event

``` javascript
skygear.off('ping');
```

### Unsubscribing a specific handler for an event

``` javascript
const handler = (data) => console.log(data);
skygear.on('ping', handler); // also returns handler

// later
skygear.off('ping', handler);
```

## Check if an event has handler

``` javascript
skygear.pubsub.hasHandlers('ping');
```

## Publishing an event

You can send a JavaScript object or native types (e.g. number, string, etc.) as
data, and all the skygear users (including yourself) will receive this data
with the correct type if they subscribed to event `ping`.

``` javascript
skygear.pubsub.publish('ping', data);
```

## Listening to Connection state

For application that needs to know the status of pubsub connection, we
provide `onOpen` and `onClose` callback for that.

``` javascript
function welcome() {
  console.log('Chat are ready!');
}

function warning() {
  console.log('Chat is temporarily unavailable');
}

const welcomeHandle = skygear.pubsub.onOpen(welcome);
const alertHandle = skygear.pubsub.onClose(warning);

// You may cancel the registered callback by calling cancel
welcomeHandle.cancel();
alertHandle.cancel();
```
