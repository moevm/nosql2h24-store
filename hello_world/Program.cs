using System;
using System.IO.Pipes;
using System.Reflection.Metadata;
using Core.Arango;
using Core.Arango.Protocol;


// from connection string
var arango = new ArangoContext("Server=https://2b71327f1e85.arangodb.cloud:8529;Realm=opa;User=root;Password=njeYmNHT491eDWhbf6oO;");

await arango.Database.CreateAsync("database");

await arango.Collection.CreateAsync("database", "collection", ArangoCollectionType.Document);


var key = "1";
await arango.Document.CreateAsync("database", "collection", new
{
    Key = key,
    SomeValue = "Hello World!"
});

var list1 = await arango.Document.GetManyAsync<object>("database", "collection", new List<string> {
  "1"
});

Console.WriteLine($"{list1[0]}");