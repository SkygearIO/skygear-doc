For file upload to work properly, please set `ASSET_STORE_URL_PREFIX` environment
variable to have value `https://<your-app-name>.skygeario.com/files` (which is
simply your Server EndPoint plus `files` at the end) on Skygear
[Portal](https://portal.skygear.io/app/info) Settings page. For more environment variable
configurations, please visit [Server](/server/guide#others) page.

Consider the following HTML:

``` html
<input type="file" id="picture" accept="image/*">
```

Once the user have selected the image to upload, maybe he wants to save it
into one of his notes:

``` javascript
const Note = skygear.Record.extend('note');

const picture = new skygear.Asset({
  name: '<your-asset-name>',
  file: document.getElementById('picture').files[0]
});
const note = new Note({ attachment: picture });
skygear.publicDB.save(note) // automatically upload the picture
.then((note) => {
  console.log(note.attachment.url); // where you can load the image
  console.log(picture.url); // the asset object is updated for you as well
  // if configured properly, the url should look like the following
  // <ASSET_STORE_URL_PREFIX>/<asset-id>-<your-asset-name>
}, (error) => {
  console.error(error)
})
```
