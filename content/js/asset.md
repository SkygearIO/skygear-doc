Consider the following HTML:

``` html
<input type="file" id="picture" accept="image/*">
```

Once the user have selected the image to upload, maybe he wants to save it
into one of his notes:

``` javascript
const Note = skygear.Record.extend('note');

var picture = new skygear.Asset({
  name: 'picture',
  file: document.getElementById('picture').files[0]
});
var note = new Note({ attachment: picture });
skygear.publicDB.save(note) // automatically upload the picture
.then((note) => {
  console.log(note.attachment.url); // where you can load the image
  console.log(picture.url); // the asset object is updated for you as well
}, (error) => {
  console.error(error)
})
```
