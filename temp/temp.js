var algoliasearch = require("algoliasearch");
const functions = require("firebase-functions");

const client = algoliasearch("6QTW9QZLGC", "eae63e7a6ede2ed3e059047b8cf6f5e6");
const index = client.initIndex("MyNameTranslate");

exports.addIndex = functions.firestore
  .document("English/${ID}")
  .onUpdate((snap, context) => {
    console.log("------------------------------", snap);
    console.log("------------------------------", context);
    const word = snap.data();
    console.log("------------------------------", word);
    word.objectID = context.params.id;
    console.log("------------------------------", context.params);

    return index.saveObject(data);
  });
