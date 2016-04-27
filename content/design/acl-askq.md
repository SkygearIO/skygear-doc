Everything's public:

* Question
* Answer
* Comment

Should be 

Except one:

* Private Question

## Question

### Creation

```obj-c
ODRecord *question = [ODRecord recordWithRecordType:@"question"];
[question.accessControl addPublicReadWriteAccess];	// not implemented
[publicDB saveRecord:question completion:nil];
```

### Query: Explore feed

Intended to be provided by feed plugin. 

```obj-c
operation = [[ODFetchNewsfeedOperation alloc] initForCurrentUserWithNewsfeedID:@"ExploreFeed"];
```

### Query: Following feed

```obj-c
NSPredicate *predicate = [NSPredicate predicateWithFormat:@"_createdBy = %@", [ODReference referenceWithRecordID:userID]];
ODQuery *query = [ODQuery queryWithRecordType:@"question" predicate:predicate];
[publicDB performQuery:query completionHandler:^(NSArray *questions, NSError *error) {
    // do something with questions
}];
```

## Private Question

### Creation

```obj-c
ODRecord *question = [ODRecord recordWithRecordType:@"question"];
for (ODRecordUserID *userID in usersToForward) {
    [question.accessControl addReadAccessForUserID:userID];
}
```

By doing so the questions can be fetched and queried by whoever can read it.

## Answer

Logically it should follow the acl of the parent question (either public or private).

### Creation

```obj-c
ODRecord *answer = [ODRecord recordWithRecordType:@"answer"];

// Everything below not implemented

// Proposal #1
answer.accessControl = question.accessControl

// Proposal #2
for (ODAccessControlEntity *ace in question.accessControl) {
	[answer.accessControl addEntity:ace];
}

// Proposal #3
[answer.accessControl shouldFollow:question.accessControl];
```

#1 and #2 are basically the same, only syntax difference. #3 implies that answer's ACL changes when its parent ACL changes too.

NOTE: We can have all three.

### Query by question

```obj-c
NSPredicate *predicate = [NSPredicate predicateWithFormat:@"_createdBy = %@", [ODReference referenceWithRecordID:questionID]];
ODQuery *query = [ODQuery queryWithRecordType:@"answer" predicate:predicate];
[publicDB performQuery:query completionHandler:^(NSArray *answers, NSError *error) {
    // do something with answers
}];
```

## Comment

Same as [Answer]({{ relref "#answer" }}).
