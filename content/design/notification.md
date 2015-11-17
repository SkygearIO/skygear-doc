+++
date = "2015-11-11T15:04:30+08:00"
draft = true
title = "Push Notification"

+++

This text summarizes the design decisions made on Skygear's Push Notification
support.

## Goals

1. Allow developers to send server-to-client notifications to users' device
   (preferrably within plugin)
2. Support major Push Notification Service providers.
3. Allow Subscription Notification to sent via Push Notification, as a backup
   channel of existing websocket channel
4. Support sending client-to-client notification

## Push Notification Service

### Primary Support:

1. [APNS](https://developer.apple.com/library/ios/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/Chapters/ApplePushService.html)
2. [GCM](https://developers.google.com/cloud-messaging/)

### Secondary Support:

Might support these in the future:

1. [Chrome Push Notification](https://developers.google.com/web/updates/2015/03/push-notifications-on-the-open-web?hl=en)
2. Firefox

   1. [Simple Push](https://developer.mozilla.org/en-US/docs/Web/API/Simple_Push_API)
   2. [Mozilla Push Service](http://mozilla-push-service.readthedocs.org/en/latest/)

3. [Safari Push Notification](https://developer.apple.com/library/mac/documentation/NetworkingInternet/Conceptual/NotificationProgrammingGuideForWebsites/PushNotifications/PushNotifications.html)

### Good-to-have (we-do-not-really-care)

1. Amazon Push Service

## API

### Notification format

```json
{
  "aps": { /* ... */ },
  "gcm": { /* ... */ },
  "data": {
    "custom": "field"
  }
}
```

Please refer to
[APNS docs](https://developer.apple.com/library/ios/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/Chapters/ApplePushService.html#//apple_ref/doc/uid/TP40008194-CH100-SW1)
and [GCM docs](https://developers.google.com/cloud-messaging/http-server-ref#downstream-http-messages-json)
for the valid format of `aps` and `gcm` dict. The content is sent as-is with
custom fields ignored (i.e. top-level keys in `aps` and `data` dict in `gcm`).
Developer should specify such custom fields in the top-most `data` dict.

## API Discussion

### Unified vs. Diversified

Currently different push notification services has different capabilities and
message formats. For example, here is a sample notification from APNS docs:

```json
{
  "aps": {
    "alert": {
      "loc-key": "GAME_PLAY_REQUEST_FORMAT",
      "loc-args": ["Jenna", "Frank"]
    },
    "content-available": 1,
    "sound": "chime.aiff"
  },
  "acme": "foo"
}
```

Compare it with an equivalent in GCM:

```json
{
  "content-available": true,
  "notification": {
    "title": "You have got a new request!", // title field required
    "body_loc_key": "GAME_PLAY_REQUEST_FORMAT",
    "body_loc_args": "[\"Jenna\", \"Frank\"]",
    "sound": "android.resource://com.example.myapp/chime.aiff" // sth. like this, not very sure
  },
  "data": {
    "acme": "foo"
  }
}
```

There has been a dicussion on whether we should provide

* a unified interface to these PNSs, like what [GCM is trying to do](https://developers.google.com/cloud-messaging/http-server-ref#downstream-http-messages-json); or
* separate interface per PNS, let develop configure all.

#### State of affairs

Both Parse.com and Urban Airship provide a unified interface for some common
fields of APNS and GCM.

#### Pros and Cons

Unified:

*Pros*

* Don't repeat yourself. Write once and works on many platforms
* Thinner API
* (Possibly) Elegant

*Cons*

* Large and difficult-to-understand API. Might confuse less-experienced developers
* It is either complete and complex, or simple but less capable
* Might be difficult to incorporate new PNS (e.g. Web Push)

Diversified:

*Pros*

* Flexible
* Easy to design and implement. Just copy the specs
* Experienced developers do not need to learn a new set of API, just re-use
  its existing knowledges.

*Cons*

* Repeated configurations if multiple PNSs are used
* Not elegant (by limouren)

#### Conclusions

1. Use the diversified approach.

   * Well... it works. (Pragmatic)
   * In many cases, different PNS receives different content for the same
     notifications. So duplication isn't that worse.

2. Could provide a unified interface for common PNS operations later
