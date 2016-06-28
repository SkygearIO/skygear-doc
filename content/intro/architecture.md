Introduction & Glossary to Skygear Architecture

{{< img src="/intro/blocks.jpg" title="Connection between component blocks"
    caption="Showing the data flow between components">}}


### Skygear Server

This is the component which connects different parts together. After you
configured it properly, it will make sure every component is working normally.
In case of any incident, it will notify you.

### Handler

This is where your Application will talk to through the SDK. The Handler
provides a readable API, which will help with your development and debugging
process.

### Database

By default data are stored in SQL storage, which is the proven solution for
common use cases. We also offer other DB storage choices if you need to scale
the things out.

#### Flexible Schema, with protection in production

Even though it is SQL, you are not required to define the schema before writing
your code. Skygear Server automatically creates the schema you need during
development. This feature allows you to refine the schema during
development, resulting in a usage experience similar to the development with
MongoDB: get things done quickly.
You can also check and modify the development schema as needed at Skygear dashboard.

During your initial deployment, Skygear Server will copy the schema developed
during the development to the production database. Once the schema is copied,
the schema will not able to change.

#### Full control by SQL

Unlike other cloud store solutions, you can run raw SQLs to perform data
migration. Both update efficiently.

### Plugins

Plugins provide extensibility to Skygear. A plugin is a good place for triggers,
tracking, putting your business logic, and exposing custom handlers to users.

#### DB Hook

You can hook any pieces of code before/after a record is saved or deleted.

- You can do field level validations.
- You can add business logic.
- You can send tracking data to other systems.
- You can sync data to other data stores.
- You can cacasde update or delete other records.

#### Auth

Besides ordinary username and password authentication, you can write an
authentication plugin to provide alternative authentication methods. We are
providing facebook, github and twitter authentication plugins for your
convenience.

#### Custom Handler

You can expose custom handlers that perform specific task of your app.
Skygear Server will take care of the data transport and authentication, you just
need to focus on the logic.
