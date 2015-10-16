+++
date = "2015-10-02T21:56:24+08:00"
draft = true
title = "relationship base"

+++

## GOD

GOD is a special user in the db that owns all the records. Record permission is managed by user making special relation with this user.

For this to happen we need two things:

1. Making GOD owns all the records
2. A way to manage user relationship with GOD

### 1. Making GOD owns all the records

Two possible ways:

1. Create all records through plugin, and set the owner to GOD
2. Allow user to transfer its record ownership to others (require agreement of both parties? A shouldn't be able to pollute B's database)

### 2. Managing GOD's relationship

Requirements:

1. Mutal relationship (probably friend)
2. God has to respond to friend request / or delegate its power to other users

   e.g. GOD: I appoint those with `admin` relationship with me can add all kinds of relationship for me
   e.g. GOD: I appoint those with `project_2046_staff` relationship with me can add `project_2046_writer` relationship for me

## Making an admin

1. admin has a `admin` relation with GOD

## Default relation

1. `admin`
2. `writer` (represent a writer, doesn't necessarily assigned to any project)

## Project

### Creation

Let's say we created a project 2046:

```js
// Create the relation
staffRelation = Relation('project_2046_staff')
writerRelation = Relation('project_2046_writer')

project.writtableBy(staffRelation)
project.readableBy(writerRelation)

privateProject = Project()
privateProject.writtableBy(staffRelation)
project.private = Reference(privateProject)
```

### Write

```python
@skygear.hook("beforeSave", type="project", sync=True)
def before_save_project(proj, old_proj, db):  # booking is record
    writer_relation = Relation('project_%s_writer' % proj.id.name)
    if project['isRecruiting']:
        proj.readableBy(writer_relation)
    else:
        proj.notReadablyBy(writer_relation)

    proj_doc = skygear.public_db.get(proj.doc)
    proj_task = skygear.public_db.get(proj.task)
    proj_ticket = skygear.public_db.get(proj.ticket)
    proj_app = skygear.public_db.get(proj.app)
    proj_payment = skygear.public_db.get(proj.payment)

    // duplicate isRecruiting to implement those recruiting
    // access control on document and applicationoikl9
    for child in [proj_doc, proj_task, proj_ticket, proj_app, proj_payment]:
        child['isRecruiting'] = proj['isRecuriting']
```

## Project document

### Creation

```js
staffRelation = Relation('project_2046_staff')
projectWriterRelation = Relation('project_2046_writer')

doc = Record('document')
doc.readableBy(staffRelation)
doc.readableBy(projectWriterRelation)
```

### Updating `isRecruiting`

```python
# will be triggered by Project's beforeSave
@skygear.hook("beforeSave", type="project", sync=True)
def before_save_project(doc, old_doc, db):  # booking is record
    writer_relation = Relation('writer')
    if doc['isRecruiting']:
        proj.readableBy(writer_relation)
    else:
        proj.notReadablyBy(writer_relation)
```


## Project task

### Creation

```js
task = Record('task')
task.writtableBy(Relation('project_%s_staff' % project_id_name))
```

## Project ticket

### Creation

```js
ticket = Record('ticket')
ticket.writtableBy(Relation('project_%s_staff' % project_id_name)
```

### On assigning writer

```js
ticket.writtableBy(Relation('project_%s_writer' % project_id_name)
```
