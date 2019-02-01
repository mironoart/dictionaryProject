import { initializeApp } from "firebase-admin";
import { firestore } from "firebase-functions";
import algoliasearch from "algoliasearch";
import uuid from "uuid/v4";

const client = algoliasearch(
  process.env.ALGOLIASEARCH_APPLICATION_ID,
  process.env.ALGOLIASEARCH_API_KEY
);
const index = client.initIndex("MyNameTranslate");

initializeApp();

export const addIndex = firestore.document("English").onCreate(snap => {
  const word = snap.data();
  word.objectID = uuid();

  return index.saveObject(word);
});
