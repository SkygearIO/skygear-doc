Skygear supports access control on records. You can use it to control whether
a user can query, update or delete a record.

Access Control in Skygear can be set as 3 levels:

1. No Access
2. Read Only Access
3. Read Write Access

The access control in Skygear can be devided in following type:

- [Public Access Control](/android/guide/acl/public)
- [User-based Access Control](/android/guide/acl/user-based)
- [Role-based Access Control](/android/guide/acl/role-based)

Besides of setting each record to a specific access control, Skygear also
allows you set a default access control for records. If you don't set any
default access control, it would be **public readable**.

```java

Container skygear = Container.defaultContainer(this);
AccessControl acl = /* construct your own access control */

skygear.setDefaultAccessControl(acl);

```
