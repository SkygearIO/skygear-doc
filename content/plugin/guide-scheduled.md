+++
date = "2015-09-25T12:31:12+08:00"
draft = true
title = "Scheduled Tasks"

+++

You can decorate a function with `py-skygear.every` so that the function is executed periodically. To schedule that a task to be executed every minute:

```
@py-skygear.every("@every 1m")
def watch(io):
    open('/tmp/messages.txt', 'a').write('Hello World!\n')
```

