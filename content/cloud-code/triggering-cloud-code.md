<a name="overview"></a>
## Overview

Cloud codes on the Skygear Cloud are registered using python function decorators
provided by Skygear. There are 4 types of cloud codes: database hooks,
scheduled tasks (cron), lambda functions (functions to be called from the SDKs),
and custom HTTP endpoint handler.

<a name="database-hooks"></a>
## By Database Hooks

### Overview

Database hooks are executed when a database record is modified through Skygear.
It allows you to run custom codes before or after
a record is created, updated or deleted.
This is useful when you have to perform operations like data validation and
sending emails based on the change in database records,

```python
# Reject empty 'name' before saving a cat to the database
@skygear.before_save('cat', async=False)
def validate_cat_name(record, original_record, db):
    if not record.get('name'):
        raise Exception('Missing cat name')
    return record
```

In this example, the cloud code function `validate_cat_name` is registered as
a database hook by using the function decorator `skygear.before_save`
and specifying the record type `cat` (i.e. database
table name) that it should hook to.

You can have multiple functions registered with the same database hook.
They will all be executed but the execution order is not guaranteed.
If this is not desired, you can call each of the functions from
a single database hook.

### Available Database Hooks

There are 4 types of database hooks, registered with the function
decorators listed below.

These function decorators are available from the `skygear` module, i.e.
you can use `skygear.before_save` after `import skygear`.

- `before_save(record_type, async=True)`: to run before a record is created or updated
- `after_save(record_type, async=True)`: to run after a record is created or updated
- `before_delete(record_type, async=True)`: to run before a record is deleted
- `after_delete(record_type, async=True)`: to run after a record is deleted

Decorator parameters:

- `record_type` (string): the record type (table name) the function
  should hook to
- `async` (boolean): whether the function should be executed asynchronously
  (Default is `True`). If it is set to `False`, the client SDK will only
  receive the response of a database operation only after the database hook
  has finished its execution.

### before_save hook

```python
before_save(record_type, async=True)
```

Functions decorated with `before_save` are executed just before a record
(of the specified record type) is created or updated in the database.

Typical usages of the `before_save` hook includes data validation, setting
default values and checking permissions.

<div class="caution">

**Caution:** `async` must be set to `False` in order for the `before_save`
hook to work properly. It includes modifying record attributes or 
raising an exception to abort the save operation.

</div>

#### Hook function parameters

When a function is decorated with `before_save`, it takes three parameters
when invoked:

```python
@skygear.before_save('comment', async=False)
def my_func(record, original_record, db):
    # write your code
    pass
```

<a name="before-save-func-record"></a>
- **`record` (Skygear `Record` class)**

  It is the record that is going to be saved to the database.
  The `record` is an instance of the Skygear `Record` class.
  Reading and Altering its values are done similar to how you
  manipulating a [Python dictionary][python-dict]:

  ```python
  # read a value
  num = record.get('number')

  # alter a value
  record['number'] = 100
  ```

  <div class="note">

  **Note:** This `record` is a complete object including all attributes.
  It means that even when you are updating an existing record by providing only
  one attribute, you still have the full record object containing
  the existing values of other attributes.

  </div>

<a name="before-save-metadata"></a>

  For the metadata attributes, they can be accessed but not altered.
  Among those attributes, only the record ID, record type,
  owner ID and ACL reflect the latest values as they will be saved to
  the database.
  Values of the other attributes (`updated_at`, `updated_by`,
  `created_at` and `created_by`), if existed, are the
  existing ones, e.g. the `updated_at` is the time
  the record was last updated.

  ```python
  record_type = record.id.type
  record_id = record.id.key
  owner_id = record.owner_id
  acl = record.acl

  # only to retrieve the previous values for these
  updated_at = record.updated_at
  updated_by = record.updated_by
  created_at = record.created_at
  created_by = record.created_by
  ```

<a name="before-save-func-original-record"></a>
- **`original_record` (Skygear `Record` class)**

  It is the existing record object in the database, as identified by the `_id`.
  It is useful when you need to compare to the existing value when you update
  a record.

  If you are creating a new record, `original_record` will be `None`.

<a name="before-save-func-db"></a>
- **`db` (SQLAlchemy connection)**

  It is an instance of the [SQLAlchemy engine connection][sqlalchemy-conn]
  that you can use to interact with the database directly. Common use cases
  include running additional database queries or updating other database records
  using `db.execute`.

  <div class="tips">

  **Tips:**

  1. You are advised to use the [Textual SQL][sqlalchemy-textual-sql]
     feature to bind parameters in queries.

  2. The database schema name is `app_<your_app_name>`, i.e. if your Skygear
     endpoint is `todo.skygeario.com`, your schema name is `app_todo`.
     Alternatively You can find your schema name by connecting to your database.

  </div>

  <div class="caution">

  **Caution:** Any queries made using `db` connect to the database directly.
  These queries do not pass through Skygear. Therefore they are
  not subject to [ACL][doc-acl] restrictions; and the metadata attributes
  of a record, e.g. `_updated_at`, do not get updated upon an `UPDATE` SQL
  query.

  </div>

#### Return Value

A record (`dict`) should be returned. The returned record will be saved to the
database, instead of the `record` provided as the argument.

The record will be saved as is if you return either of the following:

- not returning at all
- `None`
- the `record` in the argument

If you raise an exception, the record will not be saved.
An `UnexpectedError` will be returned, with the Exception message in the
`message` attribute.

#### Example

The following `before_save` hook example on the `Selfie` record type
demonstrates:

1. data validation (`image_url` cannot be empty)
2. setting a default value (`likes_count` is zero)
3. executing a database SQL query (update the user's last seen time)


```python
from datetime import datetime
# need to include SQLAlchemy in requirements.txt
import sqlalchemy as sa
import skygear
from skygear.utils.context import current_user_id


@skygear.before_save('selfie', async=False)
def before_save_selfie(record, original_record, db):

    # check for non-empty image URL
    if record.get('image_url') is None:
        raise Exception('Empty Selfie URL')

    # set initial "like" count if it's a new record
    if original_record is None:
        record['likes_count'] = 0

    # update some other table
    # e.g. update user last seen time
    sql = sa.text('''
        UPDATE "app_helloworld"."user"
        SET last_seen = :current_time
        WHERE "_id" = :user_id
    ''')
    db.execute(
        sql,
        user_id=current_user_id(),
        current_time=datetime.now(),
    )

    return record
```

### after_save hook

```python
after_save(record_type, async=True)
```

Functions decorated with `after_save` are executed after a record
(of the specified record type) is created or updated in the database.

It is different from the `before_save` hook that in an `after_save` hook
the `record` has been saved to the database. This means that we cannot
alter the `record` in place or stop the `record` from being saved by
raising an exception.

Typical usages of the `after_save` hook includes operations that take
significant time to complete, e.g. sending emails, or
updating records related to the newly saved record.

#### Hook function parameters

When a function is decorated with `after_save`, it takes three parameters
when invoked:

```python
@skygear.after_save('comment', async=False)
def my_func(record, original_record, db):
    # write your code
    pass
```

These parameters are the same as
[those in a function decorated with the `before_save` hook][before-save-func-record].
The only difference is that the `record` in the `after_save` hook contains all
up-to-date metadata attributes, whereas the `before_save` hook only has
[a few][before-save-metadata] up-to-date.

<div class="tips">

**Tips**: If you want to alter the `record`, you can either use
the provided `db` connection to execute raw SQL, or
[call the Skygear API using the container][utility-container].

</div>

#### Return Value

No return value is necessary.

#### Example

The following `after_save` hook example on the `selfie` record type
demonstrates:

- updating the user's selfie count after a selfie is successfully saved

```python
from datetime import datetime
# need to include SQLAlchemy in requirements.txt
import sqlalchemy as sa
import skygear
from skygear.utils.context import current_user_id


@skygear.after_save('selfie', async=True)
def after_save_selfie(record, original_record, db):
    # increment user selfie count if it is a new selfie record
    if original_record is None:
        sql = sa.text('''
            UPDATE "app_helloworld"."user"
            SET selfie_count = selfie_count + 1,
                _updated_at = :current_time
            WHERE "_id" = :user_id
        ''')
        db.execute(
            sql,
            user_id=current_user_id(),
            current_time=datetime.now(),
        )
```

### before_delete hook

```python
before_delete(record_type, async=True)
```

Functions decorated with `before_delete` are executed just before a record
(of the specified record type) is deleted from the database.

Typical usages of the `before_delete` hook includes permission checks for
business logic.

#### Hook function parameters

When a function is decorated with `before_delete`, it takes two parameters
when invoked, without the `original_record` parameter from the `before_save`
or `after_save` hooks:

```python
@skygear.before_delete('comment', async=False)
def my_func(record, db):
    # write your code
    pass
```

These parameters are the same as
[those in a function decorated with the `before_save` hook][before-save-func-record].
This time the `record` contains all up-to-date metadata attributes.

#### Return Value

No return value is necessary.

If you raise an exception, the record will not be deleted.
An `UnexpectedError` will be returned, with the Exception message in the
`message` attribute.

<div class="caution">

**Caution:** `async` must be set to `False` if you need to cancel the
delete operation by raising an exception.

</div>

#### Example

The following `before_delete` hook example on the `group_chat_user` record type
demonstrates:

- a feature that the last admin in a group chat cannot be deleted

```python
# need to include SQLAlchemy in requirements.txt
import sqlalchemy as sa
import skygear


# not to allow removing the last admin user in a group
# a group chat user has the following attributes:
# - role: admin/member
# - chat: (foreign key to Chat table) the chat it belongs to
@skygear.before_delete("group_chat_user", async=False)
def before_delete_group_chat_user(record, db):
    if record['role'] == 'admin':
        chat_id = record['chat'].recordID.key
        s = sa.text('''
            SELECT COUNT(*) FROM app_chat.group_chat_user
            WHERE "chat" = :chat_id and role='admin'
        ''')
        count = db.execute(s, chat_id=chat_id).first()['count']
        if count == 1:
            raise Exception("Cannot remove last group admin")
```

### after_delete hook

```python
after_delete(record_type, async=True)
```

Functions decorated with `after_delete` are executed after a record
(of the specified record type) has been deleted from the database.

Typical usages of the `after_delete` hook includes
sending notifications or database cleanups.

#### Hook function parameters

When a function is decorated with `after_delete`, 
it takes two parameters like the `before_delete` hook, `record` and `db`.

```python
@skygear.after_delete('comment', async=False)
def my_func(record, db):
    # write your code
    pass
```

These parameters are the same as
[those in a function decorated with the `before_save` hook][before-save-func-record].
This time the `record` contains all up-to-date metadata attributes.

#### Return Value

No return value is necessary.

#### Example

The following `after_delete` hook example on the `group_chat_user` record type
demonstrates:

- sending email to the user when he is removed from the group chat

```python
# need to include SQLAlchemy in requirements.txt
import sqlalchemy as sa
import skygear


@skygear.after_delete('group_chat_user', async=False)
def after_delete_group_chat_user(record, db):
    group_chat_id = record['group'].recordID.key
    decrement_query = sa.text('''
        UPDATE app_chat.group_chat
        SET user_count = user_count - 1
        WHERE _id = :group_id
    ''')
    db.execute(decrement_query, group_id = group_chat_id)
```

<a name="scheduled-tasks"></a>
## By Scheduled Tasks (Cron)

Skygear supports creating functions that run at specific time intervals using
the `@skygear.every` decorator. It works similar to the
[cron daemon][cron-wiki] in UNIX.

```python
# cron job that runs every 2 minutes
@skygear.every('@every 2m')
def meow_for_food():
    # Skygear Portal Console Log will show 'Meow Meow!' every 2 minutes
    log.info('Meow Meow!')
```

The decorator takes one argument, the `interval`, which specifies the
time at which the function should be invoked.

Some examples of `interval` values are shown below. For detailed
specifications, you can refer to the [cron library for go][robfig-cron-doc],
which is the parser used in Skygear.

```python
@skygear.every('1 2 3 4 5 *') # Every 4th May at 03:02:01
@skygear.every('0 0 0 * * TUE') # Every Tuesday at 00:00:00
@skygear.every('0 15 */2 * * *') # Every 2 hours at 15th minute
@skygear.every('0 0 6,18 * * WED,SUN') # On 6am and 6pm of every Wed/Sun
@skygear.every('0 16-30 * * * *') # At 16-30 minute of every hour
@skygear.every('@daily') # Daily at 0:00:00
@skygear.every('@every 1h') # At 1-hour intervals since the server starts
@skygear.every('@every 1m30s') # At 90-second intervals since the server starts
```

<div class="note">

**Note:**

1. If there are multiple functions to run at the same second, their execution order
   is not guaranteed.
2. For intervals using `@every` (the last two examples above),
   the interval will be reset upon the re-deployment of cloud code.
   For instance, an existing scheduled task running at 1-hour interval
   `@skygear.every('every 1h')` will be run 1 hour after the re-deployment,
   meaning that the actual interval will be longer than 1 hour due to
   the re-deployment.

</div>

<a name="lambda-functions"></a>
## From Client SDK

You will need lambda functions if you want to have codes written on the backend
server instead of inside the SDK. The client SDK calls the cloud codes which
in turn return the response back to the client.

Typical usages include:

- processing payment transactions
- sending emails or SMS
- running complex database queries that cannot be done with
  the SDKs efficiently
- operations that requires permission checking from server side

A lambda function can be created using the `@skygear.op` decorator.

### Decorator Parameters

The decorator syntax is:

```python
@skygear.op(name, user_required=False)
```

- **`name`** (String)

  It is an identifier for the lambda function. The client SDKs call
  this function using this `name` identifier.

- **`user_required`** (boolean, optional)

  If `user_required` is set to `True`, only authenticated user
  can call this function. Skygear will return an `PermissionDenied`
  error if an unauthenticated user tries to call this function.

  The default value is `False`.

### Passing arguments to Lambda Functions

The lambda function can accept arguments.
The list of arguments are defined in the function signature;
and the SDK must provide those arguments when calling the lambda
function. You can refer to the [example][lambda-example] for
how to pass arguments to lambda functions.

If a function takes no parameters, its signature should look like:

```python
@skygear.op('foo')
def my_func():
    pass
```

If a function takes two arguments, `song_name` and `singer`, its
signature should look like:

```python
@skygear.op('bar')
def my_func_two(song_name, singer):
    pass
```

Each of the arguments can be one of the following types.
They are similar to the available types in a JSON object.

- Number
- String
- Boolean
- Array
- Object

Depending on the SDKs, the supplied arguments will be
passed to the lambda function as the corresponding data type.

<div class="tips">

**Tips:** In the JS SDK, the parameters are parsed using the `toJSON`
method. For example, a `Date` object in JS SDK will be passed to
the lambda function in Python as a string like `'2016-10-28T03:23:11.600Z'`.

</div>

### Return Value

A lambda function should return a JSON-serializable Python dictionary or `None`.
It will be the response the client SDK receives.

<a name="lambda-example"></a>
### Example

The following lambda function, named `send_invitation_email`,
accepts two parameters: `to_user_email` and `custom_message`.
It sends the email using [SendGrid][sendgrid].

```python
import skygear
# need to include sendgrid in requirements.txt
import sendgrid


@skygear.op('send_invitation_email')
def send_invitation_email(to_user_email, custom_message):
    email = sendgrid.Mail()
    email.add_to(to_user_eail)
    email.set_from('admin@skygeario.com')
    email.set_subject('You are invited to try the app!')
    email.set_text(custom_message)

    client = sendgrid.SendGridClient('my_api_key')
    client.send(email)
    return {
      'result': 'OK',
    }
```

This function can be invoked from the client SDKs by the followings:

**JS SDK**

```javascript
const params = {
  'to_user_email': 'foo@bar.com',
  'custom_message': 'Hi there!',
};
skygear.lambda('send_invitation_email', params)
  .then(response => {
    console.log(response); // {'result': 'OK'}
  });
```

**Android SDK**

```java
Container skygear = Container.defaultContainer(this);

String lambdaName = "send_invitation_email";

// Argument order follows the lambda function signature
Object[] argv = new Object[]{ "foo@bar.com", "Hi there!" };

// Note: you can skip the argument when calling the function if there is none
skygear.callLambdaFunction(lambdaName, argv, new LambdaResponseHandler() {
    @Override
    public void onLambdaSuccess(JSONObject result) {
        // Your logic to handle the function result
    }

    @Override
    public void onLambdaFail(String reason) {
        // Error Handling
    }
});
```

**iOS SDK**

```obj-c
NSArray *argv = @[@"foo@bar.com", @"Hi there!"];
[container callLambda:@"send_invitation_email" arguments:argv completionHandler:^(NSDictionary *response, NSError *error) {
    if (error) {
        NSLog(@"error calling send_invitation_email:someone: %@", error);
        return;
    }

    NSLog(@"Received response = %@", response);
}];
```

<a name="http-endpoint"></a>
## By Custom HTTP Endpoint

You can configure the cloud code as an HTTP handler, which can respond to
requests coming from outside the SDK. A custom HTTP endpoint can be
created using the `skygear.handler` decorator.

A custom HTTP endpoint can be useful for the followings:

- receiving requests from outside the Skygear SDK
- allowing a third party webhook to call upon (e.g. payment service)

### Decorator Parameters

The decorator syntax is:

```python
@skygear.handler(name, method=['GET', 'POST', 'PUT'], user_required=False)
```

- **`name` (String)**

  It specifies the URL path (following your Skygear server endpoint)
  that the cloud code will respond to. Some examples are shown below:

  ```python
  @skygear.handler('foo') 
  # accepting:
  # - https://<your-end-point>/foo
  # not accepting:
  # - https://<your-end-point>/foo/
  # - https://<your-end-point>/foo/bar

  @skygear.handler('foo/') 
  # accepting:
  # - https://<your-end-point>/foo/
  # - https://<your-end-point>/foo/a
  # - https://<your-end-point>/foo/a/
  # - https://<your-end-point>/foo/a/b
  # it will redirect to https://<your-end-point>/foo/ upon a request to:
  # - https://<your-end-point>/foo

  @skygear.handler('abc/def') 
  # accepting:
  # - https://<your-end-point>/abc/def
  # this will override another handler of 'abc/' if it exists
  # not accepting:
  # - https://<your-end-point>/abc
  # - https://<your-end-point>/abc/
  ```

  When a route is not recognized, it will give you the response
  `{"result": {"status":"OK"}}`, which is the same as requesting
  directly to your Skygear endpoint.

- **`method` (List of Strings, optional)**

  It specifies the HTTP request methods allowed on the URL. Possible options are
  `GET`, `POST`, `PUT` and `DELETE`.

  The Skygear server will return an HTTP 404 error if the request method is
  not allowed.

  The default value is `['GET', 'POST', 'PUT']`.

  <div class="tips">

  **Tips:**

  You can create different functions to handle different request methods
  for the same endpoint, for example:

  ```python
  @skygear.handler('my_endpoint', method=['GET'])
  def handle_get(request):
      pass

  @skygear.handler('my_endpoint', method=['POST'])
  def handle_post(request):
      pass
  ```

  </div>

- **`user_required` (boolean, default `False`)**

  Setting `user_required` to `True` means that the only authenticated users
  are allowed to access the endpoint.

  Since the handler accepts requests from third parties,
  for authentication purpose it needs to send an HTTP request with the
  headers `X-Skygear-API-Key` and `X-Skygear-Access-Token` containing
  your app's API Key and the authenticated user's access token.

  An example request using cURL is:

  ```
  curl -H "X-Skygear-API-Key: your-api-key" \
  -H "X-Skygear-Access-Token: user-access-token" \
  https://your-server-endpoint/your-handler-endpoint
  ```

  You can obtain the user ID of the authenticated user by
  `skygear.utils.context.current_user_id()`.

### Function Arguments

The function should take one argument, `request`,
which is a [`Request` object][werkzeug-request-response]
from the [werkzeug library][werkzeug-doc].

### Return Value

You can return either of the followings in the handler.
The Skygear server will create the corresponding HTTP response to the request.

- a `String`

  Skygear will return an HTTP 200 response, with `Content-Type: text/plain`,
  where the string will be the response body.

- a `dict`, a `list`, an `int`, or `None`

  Skygear will return an HTTP 200 response, with
  `Content-Type: application/json`,
  where the response body will be a JSON-serialized representation
  of the value returned from the handler.

- a `skygear.Response` object

  You can return a `skygear.Response` object, which takes
  the same parameters as the
  [werkzeug Response Object][werkzeug-request-response].

### Examples

To obtain the parameters passed through HTTP GET in the URL:

```python
# curl "https://<your-endpoint>/get_query_string?key=month&value=10"
@skygear.handler('get_query_string')
def json_request_handler(request):
    params = request.args
    return {
        'key': params['key'], # month
        'value': int(params['value']), # 10
    }
```

To parse data from a `Content-Type=application/x-www-form-urlencoded` header:

```python
# curl -H "Content-Type: application/x-www-form-urlencoded" -d "a=3&b=at" https://<your-endpoint>/form
@skygear.handler('form')
def json_request_handler(request):
    params = request.form
    return {
        'a': int(params['a']), # 3
        'b': params['b'], # at
    }
```

To parse data from a JSON request body:

```python
# curl -H "Content-Type: application/json" -d '{"name": "John"}' https://<your-endpoint>/json
@skygear.handler('json')
def json_request_handler(request):
    b = request.stream.read()
    s = b.decode(request.charset, request.encoding_errors)
    request_body = json.loads(s)
    name = request_body.get('name') # John
    return {
        'name': name,
    }
```

To obtain the full request URL:

```python
# curl https://<your-endpoint>/url/more/levels?level=3
@skygear.handler('url/')
def parse_url(request):
    # obtain request URL after url/
    # so you can perform further actions based on the request URL
    full_path = request.full_path # /url/more/levels?level=3
    path = full_path[len('/url/'):] # more/levels?level=3
    return {
        'path': path,
    }
```

## Restful Resource By Custom HTTP Endpoint

While you can easily perform the CRUD (Create, Read, Update, Delete)
operations by using the SDK directly, you still have the option
to implement a custom [restful][restful-wiki] backend using cloud codes.
The decorator `skygear.rest` helps you create the necessary routes
for this purpose.

### Using the decorator

To implement the restful resource, you need to create a `class`
that inherits one of the Skygear restful classes:

- **`skygear.RestfulResource`**
  
  Using the `RestfulResource` class allows you to define the methods
  shown in the example below, which correspond to the restful endpoints
  noted in the comments:

  ```python
  import skygear

  @skygear.rest('/notes')
  class MyNote(skygear.RestfulResource):

      # GET /notes
      def index(self):
          # return list of notes
          pass

      # POST /notes
      def create(self):
          payload = self.get_payload()
          # process the payload and save the notes to database

      # DELETE /notes/{id}
      def delete(self, id):
          # delete the item of the given id
          pass

      # PUT /notes/{id}
      def update(self, id):
          payload = self.get_payload()
          # process the payload and update the notes in the database

      # GET /notes/{id}
      def get(self, id):
          pass
  ```

  In the above example, the mapping between the class methods and
  the HTTP endpoints are:

  | class method | HTTP request method | endpoint | description |
  |---|---|---|---|
  | `index(self)` | GET | /notes | list notes |
  | `create(self)` | POST | /notes | create a note |
  | `delete(self, id)` | DELETE | /notes/{id} | delete the note of given id |
  | `update(self, id)` | PUT | /notes/{id} | update the note of given id |
  | `get(self, id)` | GET | /notes/{id} | fetch the note of given id |

  <div class="caution">

  **Caution:**

  By default, these endpoints are accessible by anyone,
  including unauthenticated user.
  To restrict access to authenticated user, specify the `user_required`
  to be `True` in the decorator. And you can obtain the user ID by
  `skygear.util.context.current_user_id()`.

  ```python
  @skygear.rest('/notes', user_required=True)
  ```

  </div>

- **`skygear.RestfulRecord`**

  Using the `RestfulRecord` class will have the 5 restful API methods
  shown above implemented for you. By subclassing `RestfulRecord`,
  you need to set the class variables `record_type` and `database_id` to specify
  the associated record type and database ID.
  
  ```python`
  @skygear.rest('/tasks')
  class RestfulTask(skygear.RestfulRecord):
      record_type = 'task'
      database_id = '_public'
  ```

  On top of the implemented methods, you can implement
  the custom methods `query_options` and `predicate` to tweak
  the behavior of the listing method `index()`.

  - `query_options` - This method should return a dict containing parameters
    to be sent to the Skygear Server `record:query action`.
  - `predicate` - This method can be used to filter the resources from
    Skygear Server. It should return an array of Skygear query predicates.

  The example below shows the implementation of a restful API with
  pagination support.

  ```python
  import skygear

  @skygear.rest('/tasks')
  class MyTask(skygear.RestfulRecord):
      record_type = 'task'
      database_id = '_public'

      def query_options(self):
          # /tasks?limit=50&offset=100 will return the 101th to 150th records
          # ordered by the `due_date` field
          return {
              'limit': int(self.request.values.get('limit', 100)),
              'offset': int(self.request.values.get('offset', 0)),
              'sort': [[{'$val': 'due_date', '$type': 'keypath'}, 'asc']],
              'count': True,
          }

      def predicate(self):
          # Only tasks belonged to the "work" `category` will be returned
          return ['eq', {'$type': 'keypath', '$val': 'category'}, 'work']
  ```

  <div class="note">

  **Note:**

  The endpoints created with `RestfulRecord` are subject to the usual
  access control, i.e.:

  - Only authenticated users can create, update or delete records
  - Access control defined for the records are applied

  ```python
  @skygear.rest('/notes', user_required=True)
  ```

  </div>


[python-dict]: https://docs.python.org/3.6/tutorial/datastructures.html#dictionaries
[sqlalchemy-conn]: http://docs.sqlalchemy.org/en/latest/core/connections.html#sqlalchemy.engine.Connectioh
[sqlalchemy-textual-sql]: http://docs.sqlalchemy.org/en/latest/core/tutorial.html#using-textual-sql
[doc-acl]: /js/guide/acl
[before-save-metadata]: #before-save-metadata
[before-save-func-record]: #before-save-func-record
[lambda-example]: #lambda-example
[utility-container]: /cloud-code/guide/utils
[cron-wiki]: https://en.wikipedia.org/wiki/Cron
[robfig-cron-doc]: https://github.com/robfig/cron/blob/master/doc.go
[sendgrid]: https://sendgrid.com
[werkzeug-request-response]: http://werkzeug.pocoo.org/docs/wrappers/
[werkzeug-doc]: http://werkzeug.pocoo.org/docs/
[restful-wiki]: https://en.wikipedia.org/wiki/Representational_state_transfer#Applied_to_web_services
