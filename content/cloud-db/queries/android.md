---
title: Queries
---

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

### Eager Loading

Skygear supports eager loading of referenced records when you are querying the
referencing records. It is done by specify the transient include on the query.
The transient field will be available through the `getTransient` method.

```java
/* Assume the `Order` table has a field named `shipping_address`,
   which is a foreign key to a table named `address`
*/
Query orderQuery = new Query("Order"); /* build the query as usual */
orderQuery.transientInclude("shipping_address");

// after getting a record of the query result
Map<String, Record> transientMap = record.getTransient();
Record shippingAddress = (Record) transientMap.get("shipping_address");

```

By default you access the transient attributes by using the field name.
If you prefer another key, you can specify it by providing the second
argument to `transientInclude`:

```java
orderQuery.transientInclude("shipping_address", "shipping");
Record shippingAddress = (Record) transientMap.get("shipping");

```

<a name="cached-query"></a>
## Cached Query

<a name="subscription"></a>
## Subscribing to Query Change
