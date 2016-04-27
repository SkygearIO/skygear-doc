Introduction & Glossary to Skygear Architecture

{{< img src="/intro/blocks.jpg" title="Compoent blocks connection"
    caption="Showing the data flow between component">}}


### Skygear Server

This is the component bring different part together. After you config it
properly it will make sure every compoent is working normally. On any incident,
it will notify you.

### Handler

This is where your Application will talk through SDK. Handler provide a reabable
API, which will help you developing and debuging.

### Database

By default data are stored in SQL storage, which is proven solution for common
use cases. We also offer other DB storage if you need to scale the things out.

#### Flexible Schema, protection at production

Even it is SQL, you are not required to defined the schema before writing your
code. Skygear Server automaticaly create the schema you need during development. This
feature allow you to refine the schema during development. Resulting a
similiar usage experience like develope with mongodb, get things done quickly.
You can also check and modify the development schema as needed at Skygear dashboard.

At the first time of your deployment, Skygear Server will copied the schema developed
during development to production database. Once the schema is copied, schema
will not able to change.

#### Full control by SQL

Unlike other cloud store solution. You can perform raw SQL to perform migration,
bath updates efficiently.

### Plugins

Plugin provide extensibility to Skygear. It is a good place for puting your
business logic, tracking, trigger and exposing custom handlers to user.

#### DB Hook

You can hook any pices of code before/after a record save or delete.

- You can do field level validation.
- You can add business logic.
- You can send tracking data to other system.
- You can sync data to other data store.
- You can cacasde update or delete other records.

#### Auth

Beside ordinary username and password login. You can write a auth plugin to
provide alternate authentication method. We are providing facebook, github and
twitter auth plugin for your convenience.

#### Custom Handler

Expose custom handler that perform your app specific task. Skygear Server will take care
of the data transport and authentication, you just need to focus on the logic.
