+++
date = "2015-10-02T20:45:10+08:00"
draft = true
title = "plugin base"

+++

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
@ourd.before_save("admin")
@ourd.before_delete("admin")
def before_save_admin(r, o, db):
    if not 'admin' in ctx.user.roles:
        raise UnauthorizedException()

@ourd.before_fetch("admin")
def before_fetch_admin(r, o, db):
    pass  # S0


# staff
#
@ourd.before_save("staff")
@ourd.before_delete("staff")
def before_save_staff(r, o, db):
    def can_save():
        if 'admin' in ctx.user.roles:
            return True  # S1, S3
        if 'staff' in ctx.user.roles and ctx.user.id == r.record_id
            return True  # S9
        return False
    if not can_save():
        raise UnauthorizedException()

@ourd.before_fetch("staff")
def before_fetch_staff(r, o, db):
    pass  # S0

# writer
#
@ourd.before_save("writer")
@ourd.before_delete("writer")
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

@ourd.before_fetch("writer")
def before_fetch_writer(r, o, db):
    pass  # S0


# project
#
@ourd.before_save("project")
@ourd.before_delete("project")
def before_save_project(r, o, db):
    if not ('admin' in ctx.user.roles or 'staff' in ctx.user.roles):
        raise UnauthorizedException()  # S3, S4

@ourd.before_fetch("project")
def before_fetch_project(r, o, db):
    if not ('admin' in ctx.user.roles or 'staff' in ctx.user.roles) \
            and not r.get('isRecruiting', False):
        raise UnauthorizedException()  # S11, S12

# project task
#
@ourd.before_save("project_task")
@ourd.before_delete("project_task")
def before_save_project_task(r, o, db):
    if not ('admin' in ctx.user.roles or 'staff' in ctx.user.roles):
        raise UnauthorizedException()  # S3, S5

@ourd.before_fetch("project_task")
def before_fetch_project_task(r, o, db):
    pass  # S0

# project ticket
#
@ourd.before_save("project_ticket")
@ourd.before_delete("project_ticket")
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

@ourd.before_fetch("project_ticket")
def before_fetch_project_ticket(r, o, db):
    pass  # S0

# customer
#
@ourd.before_save("customer")
@ourd.before_delete("customer")
def before_save_project(r, o, db):
    if not ('admin' in ctx.user.roles or 'staff' in ctx.user.roles):
        raise UnauthorizedException()  # S7

@ourd.before_fetch("customer")
def before_fetch_project(r, o, db):
    pass  # S0

# project application
#
@ourd.before_save("project_application")
@ourd.before_delete("project_application")
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

@ourd.before_fetch("project_application")
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
@ourd.before_save("project_document")
@ourd.before_delete("project_document")
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

@ourd.before_fetch("project_document")
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
@ourd.before_save("payment")
@ourd.before_delete("payment")
def before_save_project(r, o, db):
    if not 'admin' in ctx.user.roles:
        raise UnauthorizedException()  # S3

@ourd.before_fetch("payment")
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