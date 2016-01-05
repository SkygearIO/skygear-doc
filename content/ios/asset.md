+++
date = "2015-09-21T19:45:46+08:00"
draft = true
title = "Assets"

+++

## Uploading and associating an asset to a record

```obj-c
- (void)imagePickerController:(UIImagePickerController *)picker
didFinishPickingMediaWithInfo:(NSDictionary<NSString *, id> *)info
{
    NSURL *url = info[UIImagePickerControllerReferenceURL];
    SKYAsset *asset = [SKYAsset assetWithName:@"profile-picture" fileURL:url];
    asset.mimeType = @"image/png";

    SKYContainer *container = [SKYContainer defaultContainer];
    [container uploadAsset:asset completionHandler:^(SKYAsset *asset, NSError *error) {
        if (error) {
            NSLog(@"error uploading asset: %@", error);
            return;
        }

        self.photoRecord[@"image"] = asset;
        [container.privateCloudDatabase saveRecord:self.photoRecord completion:nil];
    }];
}
```

TODO: Asset names will never collide. i.e. you can upload multiple assets
with the same asset name.

TODO: Show that `asset.name` is rewritten after the asset being uploaded.

## Accessing asset

`SKYAsset.url` will be populated with an expiry URL after fetching /
querying the record from server.


```obj-c
[privateDB fetchRecordWithID:photoRecordID completionHandler:^(SKYRecord *photo, NSError *error) {
    if (error) {
        NSLog(@"error fetching photo: %@", error);
        return;
    }

    SKYAsset *asset = photo[@"image"];
    NSURL *url = asset.url;
    // do something with the url
}];
```
