+++
date = "2015-09-23T19:42:05+08:00"
draft = true
title = "Plugins"

+++

## Calling lambda functions

We can call lambda functions defined by custom plugin like this:

```obj-c
[container callLambda:@"hello:someone" arguments:@[@"world"] completionHandler:^(NSDictionary *response, NSError *error) {
    if (error) {
        NSLog(@"error calling hello:someone: %@", error);
        return;
    }

    NSLog(@"Received response = %@", response);
}];
```

Please refer to indivdual plugin documentation for expected arguments and
response content.
