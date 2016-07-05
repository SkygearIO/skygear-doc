The use of Handler Extension Point makes it possible to serve any web content.
The user's browser loads the
web content returned from the Handler Extension Point, allowing you to
generate dynamic content. This works really well for dynamic website.

Most websites also load content which are static, such as images, JavaScript
files and stylesheets. These files don’t need to be dynamically generated
for each request. We call them “static assets” and we have an easier way
to serve static assets to your users.

## Put your static assets in a directory

The simplest way to serve static assets to your users is to put them into
a folder called `public_html` in your cloudcode directory. The static
assets you put in this folder will be automatically available at
`http://<endpoint>/static/`.

For example, if your cloudcode projects contains a file saved at
`./public_html/images/hero.png`, your user will be able to access it
at `http://<endpoint>/static/images/hero.png`.

## Declare your static assets using decorator

If your cloudcode project is more complex, or if you cannot put your static
assets
in the `public_html` directory, you can also declare your static assets using
decorator so that Skygear knows where to find your static assets.

```python
from skygear import static_assets
from skygear.utils.assets import directory_assets


@static_assets('/hello-world')
def hello_world():
    return directory_assets('my-assets/files')
```

In the above example, Skygear will find your static assets under
`./my-assets/files` if the user request a resource under
`http://<endpoint>/static/hello-world`.

If you develop a cloudcode plugin, you need to declare static assets
using `package_assets` function. Once you declared your static assets in your
plugin, the static assets will also be available to the user of your cloudcode
plugin.
