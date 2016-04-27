Whenever you invoke an async operation in SKYKit, there is a `NSError` parameter
available in the completion callback. For example, the completion callback of
`saveRecord:completion:` is:

```obj-c
void(^)(SKYRecord *record, NSError *error)
```

All errors passed from SKYKit will have `SKYOperationErrorDomain` as error
domain.

## Guideline for error handling

The `NSError` returned from SKYKit contains a `localizedDescription`
property which contains a general description of the error occurred.
Although this description is written in a way for displaying to the user,
this is not recommended as the description does not provide meaningful
explanation and how to resolve the error.

The `code` property contains an integer error code for you to handle
the returneded erorr programatically. For example, a `SKYErrorResourceNotFound`
code means that the requested resource is not found. If you are fetching
a record while encountering this error, you may present a meaningful alert
explaning what the user should do. You can even create a new record
for the user show that the user will not see any erorr at all.

The `userInfo` property contains detailed information about the error:

* `SKYErrorNameKey` - contains the name of the error in string representation.
* `SKYErrorMessageKey` - contains a technical description of the error.
* `NSUnderlyingErrorKey` - if there is an underlying error, the error object
  is available through this key.
* `SKYOperationErrorHTTPStatusCodeKey` - contains the HTTP status code of the
  request.
* Other information about the error is also available in this dictionary.

## Example

Here is an example for getting error information after an operation fails:

```obj-c
[privateDB fetchRecordWithID:recordID completion:^(SKYRecord *record, NSError *error){
    if (error.code == SKYErrorResourceNotFound) {
        NSLog(@"record %@ doesn't exist", recordID);
        return;
    } else if (error.code == SKYErrorNetworkFailure) {
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
