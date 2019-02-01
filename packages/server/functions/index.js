const admin = require("firebase-admin");
const functions = require("firebase-functions");
const algoliasearch = require("algoliasearch");
const uuid = require("uuid/v4");

const client = algoliasearch("6QTW9QZLGC", "eae63e7a6ede2ed3e059047b8cf6f5e6");
const index = client.initIndex("MyNameTranslate");

admin.initializeApp();

exports.addIndex = functions.firestore
  .document("English")
  .onCreate((snap, context) => {
    const word = snap.data();
    word.objectID = uuid();

    return index.saveObject(word);
  });
