Skygear plugin system allows you to write your own
[Cloud Code](/cloud-code/guide) or install [Plugin](/plugin/guide) to extend
the functionality of Skygear. The following introduces how Android SDK interacts
with the Skygear plugins.

<a name="lambda"></a>
## Lambda Function

[Lambda Function](/cloud-code/guide/lambda) is an important part of Skygear Plugin System. Using Skygear
SDK, you can call the lambda functions defined by providing the function name.

```java
Container skygear = Container.defaultContainer(this);
skygear.callLambdaFunction(functionName, new LambdaResponseHandler() {
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

If your lambda function need some arguments, you can pass them from the SDK:

```java
Container skygear = Container.defaultContainer(this);
Object[] argv = new Object[]{ "Hello", "World" };
skygear.callLambdaFunction(functionName, argv, new LambdaResponseHandler() {
    // Implementation of Response Handler
});
```

Currently, all Java primitive types , `JSONArray` and `JSONObject` are supported
as arguments.
