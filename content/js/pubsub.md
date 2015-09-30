+++
date = "2015-09-30T12:57:07+08:00"
draft = true
title = "Pubsub"

+++

## Subscribing to an event

```js
jsourd.on('ping', function(data) {
  let from_ = data.from;
  console.log('received a ping from %s', from_);
});
```

## Publishing an event

```js
jsourd.trigger('ping', {'from': 'Specialized Ping Force'});
```

## Unsubscribing an event

### Unsubscribing from all events

```js
jsourd.off('ping');
```

### Unsubscribing a specific handler

**DEV NOTE**: Should we implement it? :D

```js
let subscriber = jsourd.on('ping', function(data) {
  console.log('received a ping');
});

// later
subscriber.off();
```
