+++
date = "2015-09-24T12:17:40+08:00"
draft = true
title = "Handling Errors"

+++

Whenever you invoke an async operation in Ourd, there is a `NSError` parameter
available in the completion callback. For example, the completion callback of
`saveRecord:completion:` is:

```obj-c
void(^)(ODRecord *record, NSError *error)
```

All errors passed from Ourd will have `error.domain` equaled to
`ODOperationErrorDomain`.

*What documented below is not implemented*

Imaginary complete error handling of fetching record

```obj-c
[privateDB fetchRecordWithID:recordID completion:^(ODRecord *record, NSError *error){
    // we don't need to check for error.domain here, Ourd should ensure all
    // errors thrown are in ODOperationErrorDomain

    if (error.code == ODErrorNotFound) {
        NSLog(@"record %@ doesn't exist", recordID);
        return;
    } else if (error.code == ODErrorNetworkFailure) {
        // generally this block of code should reside in manager written by
        // user
        NSError *urlSessionError = error.userInfo[NSUnderlyingErrorKey];
        NSLog(@"network error = %@", urlSessionError);
        return;
    } else if (error) {
        NSLog(@"unknown error = %@", error)
        return;
    }

    NSLog(@"got a record = %@", record);
}];
```
