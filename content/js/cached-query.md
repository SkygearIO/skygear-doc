+++
date = "2015-12-09T12:19:07+08:00"
draft = true
title = "Cached Query"

+++

# Cached Query

Skygear provide a simple cached query mechanism for application that want to
display the last state of data before it get new data from Skygear. You just
provide an extra callback function to the `query` function. And Skygear will try
to return you an cached result before it can get the latest result from the
Skygear server.

``` javascript
let query = Query(Note);
query.equalTo('title', 'First note');
function successCallback(notes, cached = false) => {
    if (cached) {
        console.log('The result is a cached one');
    }
    console.log('Result', notes);
}
skygear.publicDB.query(query, successCallback).then(successCallback, (error) => {
  console.log('error: ', error);
});
```

### Note:

- The cached query is not guaranteed to be called. If the Skygear don't see
  the query before and don't have a cache, it won't called.
- You may use one callback to handle both cached callback and server
  callback as above. But you are free to use two callbacks if it works better in
  your usecases.
