You can make use of `Asset` to store file references such as images and videos on the database. An asset can only be saved with a record but not as a standalone upload. Skygear automatically uploads the files to a server that you specify, like Amazon S3.

For example, you want to allow users to upload an image as an `attachment` to his `note`.

First you need to make a file upload form:

``` html
<input type="file" id="picture" accept="image/*">
```

Once the user has selected the image to upload, you can save it by:

``` javascript
const Note = skygear.Record.extend('note');

const picture = new skygear.Asset({
  name: '<your-asset-name>',
  file: document.getElementById('picture').files[0],
});
const note = new Note({ attachment: picture });
skygear.publicDB.save(note) // automatically upload the picture
.then((record) => {
  console.log(record.attachment.url); // where you can load the image
  // if configured properly, the url should look like the following
  // <ASSET_STORE_URL_PREFIX>/<asset-id>-<your-asset-name>
}, (error) => {
  console.error(error)
})
```

1. Call the `Asset` method to create an `Asset` object and it is stored in an asset column of the `note` object.
2. When you save the `note` object, the image is automatically uploaded to the server.