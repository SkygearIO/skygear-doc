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
    ODAsset *asset = [ODAsset assetWithName:@"profile-picture" fileURL:url];

    ODContainer *container = [ODContainer defaultContainer];
    [container uploadAsset:asset completionHandler:^(ODAsset *asset, NSError *error) {
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

`ODAsset.url` will be populated with an expiry URL after fetching /
querying the record from server.


```obj-c
[privateDB fetchRecordWithID:photoRecordID completionHandler:^(ODRecord *photo, NSError *error) {
    if (error) {
        NSLog(@"error fetching photo: %@", error);
        return;
    }

    ODAsset *asset = photo[@"image"];
    NSURL *url = asset.url;
    // do something with the url
}];
```
