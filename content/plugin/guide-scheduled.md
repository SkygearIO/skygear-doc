You can decorate a function with `skygear.every` so that the function is
executed periodically. To schedule that a task to be executed every minute:

```python
@skygear.every("0 */1 * * * *")
def watch():
    open('/tmp/messages.txt', 'a').write('Hello World!\n')
```

The every accept crontab syntax with second precision. i.e. 's m h  dom mon dow'
