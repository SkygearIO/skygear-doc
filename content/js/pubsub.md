+++
date = "2015-09-30T12:57:07+08:00"
draft = true
title = "Pubsub"

+++

## Subscribing to an event

```js
skygear.on('ping', function(data) {
  let from_ = data.from;
  console.log('received a ping from %s', from_);
});
```

## Publishing an event

```js
skygear.trigger('ping', {'from': 'Specialized Ping Force'});
```

## Unsubscribing an event

### Unsubscribing from all events

```js
skygear.off('ping');
```

### Unsubscribing a specific handler

**DEV NOTE**: Should we implement it? :D

```js
let subscriber = skygear.on('ping', function(data) {
  console.log('received a ping');
});

// later
subscriber.off();
```
