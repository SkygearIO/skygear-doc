+++
date = "2015-10-29T17:58:57+08:00"
draft = true
title = "Utility functions"

+++

There are some utility functions available to plugin.

## reset_password

You can reset the password of a user by using this function.

```python
from skygear.utils.user import reset_password

reset_password(db, user_id, password)
```

* `db` - the database connection
* `user_id` - the user ID of the user, in string
* `password` - the new password of the user, in string
