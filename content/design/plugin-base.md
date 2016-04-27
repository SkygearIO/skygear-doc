It is possible to control access to records by making Skygear plugin. You
can implement custom logic in access control that cannot be easily implemented
by using other approaches.

## Deny before record save

You can use the decorator `before_save` to deny changes to record.
For example, in order to deny changes to a record after the record is saved
once:

``` python
@skygear.before_save("book")
def before_save_book(record, original, db):
    if original:
        raise Exception("Cannot change a saved book.")
```

When an exception is raised by a plugin when Skygear Server is handling a record
hook, the change operation of the record is aborted. In this example,
when the original record is available, an exception is raised to prevent
the client from overwritting a record.

Note: Raising an exception in `after_save` has no effect. The record
is already saved when `after_save` is called.

## Deny before record delete

You can also make use of `before_delete` to permit a record from deleting:

``` python
@skygear.before_delete("book")
def before_delete_book(record, db):
    if record['checked_out']:
        raise Exception("Cannot delete a checked-out book.")
```

In this example, the delete operation is aborted when the `checked_out`
field of the record to be deleted is `True`.

## Deny before record fetch

**NOT IMPLEMENTED**: `before_fetch` hook is not implemented yet.

**NOT IMPLEMENTED**: Context variable is not implemented yet.

**NOT IMPLEMENTED**: User role is not implemented yet.

**TO BE DISCUSSED**: How will `before_fetch` affects `record:query`?

``` python
from skygear import context as ctx

@skygear.before_fetch("book")
def before_fetch_book(record, db):
    if 'admin' not in ctx.user.roles:
        raise Exception("Only admin can fetch a book.")
```

## To deny access based on user

**NOT IMPLEMENTED**: Context variable is not implemented yet.

**NOT IMPLEMENTED**: User role is not implemented yet.

You can also deny changes to a record based on the current user. The
current user can be accessed

``` python
from skygear import context as ctx

@skygear.before_delete("book")
def before_delete_book(record, db):
    if 'admin' not in ctx.user.roles:
        raise Exception("Only admin can delete a book.")
```

In this example, no one can delete a book unless the user has a 'admin' role.

## To deny access based on a referenced record

**NOT IMPLEMENTED**: Eager loading with database hooks are not implemented.

Occassionally you might want to control access to a record based on the value
of a field of a referenced record. To do that, you need to eager load
the referenced record.

``` python
from skygear import context as ctx

@skygear.before_save("book", eager_load="writer")
def before_save_book(record, original, db):
    writer = record['_transient']['writer']
    if writer['is_dead']
        raise Exception("Cannot make changes to a book whose writer is dead.")
```

Specify the name of the field where a reference of a record is to be eager
loaded in the `eager_load` parameter. When Skygear Server calls your hook, it
will also load the referenced record.

## To deny access based on an unreferenced record

**NOT IMPLEMENTED**: Fetching unreferenced record is not yet implemented.

``` python
@skygear.before_save("book")
def before_save_book(record, original, db):
    writer = db.fetch("writer/24")
    if writer['is_dead']
        raise Exception("Cannot make changes to a book.")
```

## Covenient decorators for access control

**NOT IMPLEMENTED**: Convenient decorators not implemented yet.

There are convenient decorators to make access control easier to implement
with plugins. When decorated, your function will be called with the
affected record as the only parameter.

Your function should return `True` if access is allowed and `False` if access
is not allowed.

These convenient decorators are `allow_save`, `allow_delete` and `allow_fetch`.

``` python

@skygear.allow_delete("book")
def allow_delete_book(record):
    return record['checked_out']:
```

This is equivalent to hooking the function to `before_delete` and raising
an exception when `checked_out` is not `True`.

These decorators can be chained together:

``` python

@skygear.allow_save("book")
@skygear.allow_delete("book")
def allow_delete_book(record):
    return record['checked_out']:
```

## Example

Example of plugin base access control of taylors

``` python

class UnauthorizedException(Exception):
    pass

#S0-S17 as stated below
#SA0-SA5 not yet considered

# (not mentioned) #S0
#- Admin can write Staff #S1
#- Admin can write Writer #S2
#- Admin can write EVERYTHING #S3
#- Staff can write Project #S4
#- Staff can write Project Task #S5
#- Staff can write Project Ticket #S6
#- Staff can write Customer #S7
#- Staff can view Project Application #S8
#- Staff can write himself #S9
#- Staff can write Writer #S10
#- ** Staff cannot change its role to Admin #SA1
#- ** Writer cannot create Project #SA2
#- ** Writer cannot view price of the Project #SA3
#- ** Writer cannot view tasks of the Project #SA4
#- Writer can write himself #S11
#- Writer can view Project when Project is Recruiting #S12
#- Writer can view Project Document when Project is Recuriting #S13
#- Writer can write Project Application when Project is Recruiting #S14
#- Writer can write Project Document if Project assigned to him #S15
#- Writer can write Project Ticket if Project Ticket assigned to him #S16
#- Writer can view Payment regarding himself #S17
#- ** Writer cannot change his roles to Staff/Admin #SA5

# admin
#
@skygear.before_save("admin")
@skygear.before_delete("admin")
def before_save_admin(r, o, db):
    if not 'admin' in ctx.user.roles:
        raise UnauthorizedException()

@skygear.before_fetch("admin")
def before_fetch_admin(r, o, db):
    pass  # S0


# staff
#
@skygear.before_save("staff")
@skygear.before_delete("staff")
def before_save_staff(r, o, db):
    def can_save():
        if 'admin' in ctx.user.roles:
            return True  # S1, S3
        if 'staff' in ctx.user.roles and ctx.user.id == r.record_id
            return True  # S9
        return False
    if not can_save():
        raise UnauthorizedException()

@skygear.before_fetch("staff")
def before_fetch_staff(r, o, db):
    pass  # S0

# writer
#
@skygear.before_save("writer")
@skygear.before_delete("writer")
def before_save_writer(r, o, db):
    def can_save():
        if 'admin' in ctx.user.roles:
            return True  # S2, S3
        if 'staff' in ctx.user.roles:
            return True  # S10
        if 'writer' in ctx.user.roles and ctx.user.id == r.record_id
            return True  # S11
        return False
    if not can_save():
        raise UnauthorizedException()

@skygear.before_fetch("writer")
def before_fetch_writer(r, o, db):
    pass  # S0


# project
#
@skygear.before_save("project")
@skygear.before_delete("project")
def before_save_project(r, o, db):
    if not ('admin' in ctx.user.roles or 'staff' in ctx.user.roles):
        raise UnauthorizedException()  # S3, S4

@skygear.before_fetch("project")
def before_fetch_project(r, o, db):
    if not ('admin' in ctx.user.roles or 'staff' in ctx.user.roles) \
            and not r.get('isRecruiting', False):
        raise UnauthorizedException()  # S11, S12

# project task
#
@skygear.before_save("project_task")
@skygear.before_delete("project_task")
def before_save_project_task(r, o, db):
    if not ('admin' in ctx.user.roles or 'staff' in ctx.user.roles):
        raise UnauthorizedException()  # S3, S5

@skygear.before_fetch("project_task")
def before_fetch_project_task(r, o, db):
    pass  # S0

# project ticket
#
@skygear.before_save("project_ticket")
@skygear.before_delete("project_ticket")
def before_save_project_ticket(r, o, db):
    def can_save():
        if 'admin' in ctx.user.roles:
            return True  # S3
        if 'staff' in ctx.user.roles:
            return True  # S6
        if 'writer' in ctx.user.roles and ctx.user.id == r['assignee']
            return True  # S16
        return False
    if not can_save():
        raise UnauthorizedException()

@skygear.before_fetch("project_ticket")
def before_fetch_project_ticket(r, o, db):
    pass  # S0

# customer
#
@skygear.before_save("customer")
@skygear.before_delete("customer")
def before_save_project(r, o, db):
    if not ('admin' in ctx.user.roles or 'staff' in ctx.user.roles):
        raise UnauthorizedException()  # S7

@skygear.before_fetch("customer")
def before_fetch_project(r, o, db):
    pass  # S0

# project application
#
@skygear.before_save("project_application")
@skygear.before_delete("project_application")
def before_save_project_application(r, o, db):
    def can_save():
        if 'admin' in ctx.user.roles:
            return True  # S3
        if 'writer' in ctx.user.roles:
            project_record = db.fetch(r['project'])
            return project_record['isRecruiting']  # S14
        return False  # S0
    if not can_save():
        raise UnauthorizedException()

@skygear.before_fetch("project_application")
def before_fetch_project_application(r, o, db):
    def can_fetch():
        if 'admin' in ctx.user.roles:
            return True  # S0
        if 'staff' in ctx.user.roles:
            return True  # S8
        if 'writer' in ctx.user.roles and ctx.user.id == r['_owner']:
            return True  # S0
        return False  # S0
    if not can_fetch():
        raise UnauthorizedException()

# project document
#
@skygear.before_save("project_document")
@skygear.before_delete("project_document")
def before_save_project_document(r, o, db):
    def can_save():
        if 'admin' in ctx.user.roles:
            return True  # S3
        if 'writer' in ctx.user.roles:
            project_record = db.fetch(r['project'])
            return project_record['assignee'] == ctx.user.id  # S15
        return False  # S0
    if not can_save():
        raise UnauthorizedException()

@skygear.before_fetch("project_document")
def before_fetch_project_document(r, o, db):
    def can_fetch():
        if 'admin' in ctx.user.roles:
            return True  # S3
        if 'writer' in ctx.user.roles:
            project_record = db.fetch(r['project'])
            return project_record['isRecruiting']  # S13
        return False  # S0
    if not can_fetch():
        raise UnauthorizedException()

# payment
#
@skygear.before_save("payment")
@skygear.before_delete("payment")
def before_save_project(r, o, db):
    if not 'admin' in ctx.user.roles:
        raise UnauthorizedException()  # S3

@skygear.before_fetch("payment")
def before_fetch_project(r, o, db):
    def can_fetch():
        if 'admin' in ctx.user.roles:
            return True  # S3
        if 'writer' in ctx.user.roles and ctx.user.id == r['writer']:
            return True  # S17
        return False
    if not can_fetch():
        raise UnauthorizedException()

```
