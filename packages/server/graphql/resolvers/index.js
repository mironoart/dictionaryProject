var admin = require("firebase-admin");
import { v4 as uuid } from "uuid";
import translate from "../utils/translate";
var algoliasearch = require("algoliasearch");
const client = algoliasearch(
  process.env.ALGOLIASEARCH_APPLICATION_ID,
  process.env.ALGOLIASEARCH_API_KEY
);
const index = client.initIndex("MyNameTranslate");

const resolvers = {
  Query: {
    getRuWords: async (_, { word }) => {
      const wordData = await admin
        .firestore()
        .collection("English")
        .doc(word)
        .get();
      const getWordData = wordData.data().id;
      index
        .search({
          query: getWordData
        })
        .then(function(responses) {
          console.log(responses.hits);
        });
      return "Finded!";
    }
  },

  Mutation: {
    addWord: async (_, { word }) => {
      const eId = uuid();
      const rId = uuid();
      const translatedWord = await translate(word, "ru");
      admin
        .firestore()
        .collection("Russian")
        .doc(translatedWord)
        .create({
          id: rId,
          word: translatedWord,
          translationsId: eId
        });
      const ruWordSearch = {
        word: translatedWord,
        translationsId: eId,
        objectID: rId
      };
      index.saveObject(ruWordSearch);
      admin
        .firestore()
        .collection("English")
        .doc(word)
        .create({
          id: eId,
          word: word,
          translationsId: rId
        });
      const enWordSearch = {
        word: word,
        translationsId: rId,
        objectID: eId
      };
      index.saveObject(enWordSearch);

      return "Done";
    }
  }
};

export default resolvers;
