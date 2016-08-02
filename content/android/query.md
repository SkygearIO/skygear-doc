Skygear provides query of records with conditions. You can apply condition to
Skygear queries, only getting the records you want.

<a name="basic-queries"></a>
## Basic Queries

To perform a query, first you need to construct a `Query` object:

```java
Query noteQuery = new Query("Note")
        .equalTo("title", "Hello world")
        .greaterThan("rating", 3);
        .addAscending("rating");
```

After constructing a `Query` object, you can perform a query as following:

```java
Container skygear = Container.defaultContainer(this);
Database publicDB = skygear.getPublicDatabase();

publicDB.query(noteQuery, new RecordQueryResponseHandler() {
    @Override
    public void onQuerySuccess(Record[] records) {
        Log.i("Record Query", String.format("Successfully got %d records", records.length));
    }

    @Override
    public void onQueryError(String reason) {
        Log.i("Record Query", String.format("Fail with reason:%s", reason));
    }
});
```

### Or operation

`Or` operation can be applied to multiple `Query` objects. The usage is as
following:

```java
Query query1 = new Query("Note").caseInsensitiveLike("title", "%important%");
Query query2 = new Query("Note").greaterThan("rating", 3);
Query query3 = new Query("Note").greaterThan("readCount", 10);

Query compoundQuery = Query.or(query1, query2, query3)
compoundQuery.addAscending("rating");

// perform query using `compoundQuery` object...
```

### Negate operation

`negate` operation can be applied to a `Query` object to negate the whole query
predicate.

```java
// (rating > 1) AND (rating < 3)
Query betweenOneAndThree = new Query("Note")
        .greaterThan("rating", 1)
        .lessThan("rating", 3);

// NOT ((rating > 1) AND (rating < 3))
Query notBetweenOneAndThree = new Query("Note")
        .greaterThan("rating", 1)
        .lessThan("rating", 3)
        .negate();

```

<a name="conditions"></a>
## Conditions

Besides the operations shown above, the following list out all operations supported.

- `like`
- `notLike`
- `caseInsensitiveLike`
- `caseInsensitiveNotLike`
- `equalTo`
- `notEqualTo`
- `greaterThan`
- `greaterThanOrEqualTo`
- `lessThan`
- `lessThanOrEqualTo`
- `contains`
- `notContains`
- `containsValue`
- `notContainsValue`
- `negate`
- `addDescending`
- `addAscending`

<a name="pagination-ordering"></a>
## Pagination and Ordering

<a name="relational-queries"></a>
## Relational Queries

<a name="cached-query"></a>
## Cached Query

<a name="subscription"></a>
## Subscribing to Query Change
