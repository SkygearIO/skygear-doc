### Uploading and associating an asset to a record

You can make use of `Asset` to store file references such as images and videos on the database. An asset can only be saved with a record but not as a standalone upload.
Skygear automatically uploads the files to a server that you specify, like Amazon S3.

For example, you want to allow users to upload an image as an `image` to his `SKYRecord`. Once the user has selected the image to upload, you can save it by:

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

Asset names will never collide. i.e. you can upload multiple assets with the same asset name.

`asset.name` is rewritten after the asset being uploaded.

```obj-c
NSString *newName = asset.name;
// The name is changed to "c36e803a-f333-47bf-a3e9-4d52b660a71a-profile-picture" 
// from "profile-picture"
```


### Accessing asset

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
