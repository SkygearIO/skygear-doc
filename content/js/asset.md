+++
date = "2015-10-16T17:13:24+08:00"
draft = true
title = "Assets"

+++

## Uploading an asset by base64 data

```js
// node.js
fs.readFile('my-awesome-picture.jpg', function(err, data) {
  if (err) {
    throw err;
  }

  let profilePic = new skygear.Asset({data: data});
  // Profile = skygear.Record.extend('profile');
  let profile = new Profile({
    name: 'Handsome Guy',
    picture: profilePic
  });
  skygear.publicDB.save(profile).then(function(p) {
    // fetched record field will have a `url` attribute available
    console.log('Download my handsome selfie here => %s', p.picture.url);
  });
})
```

## Creating an asset from `input` element

Consider the following HTML:

```html
<form id="profile-form">
  <label>Name: <input type="text" name="profile-form-name" id="profile-form-name"></label><br>
  <label>Profile Pic: <input type="file" name="profile-form-pic" id="profile-form-pic" accept="image/*"></label><br>
  <input type="submit" value="Submit">
</form>
```

Javascript:

```js
$('#profile-form').on('submit', function() {
  let name = $('#profile-form-name').val();
  let pic = $('#profile-form-pic').attr('files')[0];

  let profile = new skygear.Profile({
    name: name,
    picture: new skygear.Asset({file: pic}})
  });

  // proceed to saving
});
```

## Creating an asset from URL

```js
let profilePic = new skygear.Asset({url: 'file:///home/steven/.selfie/0001.jpg'});
```
