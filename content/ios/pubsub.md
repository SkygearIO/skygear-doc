### Subscribing a channel

```obj-c
SKYContainer *container = [SKYContainer defaultContainer];
[container.pubsubClient subscribeTo:@"hello" handler:^(NSDictionary *info) {
    NSString *name = info[@"name"];
    NSLog(@"%@ says hello", name);
}];
```

### Publishing to a channel

```obj-c
[container.pubsubClient publishMessage:@{@"name": @"world"} toChannel:@"hello"];
```

### Unsubscribing a channel

```obj-c
[container.pubsubClient unsubscribe:@"hello"];
```

### Example: PING-PONG

```obj-c
SKYContainer *container = [SKYContainer defaultContainer];

// Pinger
[container.pubsubClient subscribeTo:@"PING" handler:^(NSDictionary *info) {
    NSLog(@"Received a PING");
    [container.pubsubClient publishMessage:nil toChannel:@"PONG"];
}];

// Ponger
[container.pubsubClient subscribeTo:@"PONG" handler:^(NSDictionary *info) {
    NSLog(@"Received a PONG");
    [container.pubsubClient publishMessage:nil toChannel:@"PING"];
}];

// kick start the game
[container.pubsubClient publishMessage:nil toChannel:@"PING"];
```
