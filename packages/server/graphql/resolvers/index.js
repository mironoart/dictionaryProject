var admin = require("firebase-admin");
import translate from "../utils/translate";

const resolvers = {
  Query: {
    async name() {
      const tweets = await admin
        .firestore()
        .collection("users")
        .get();
      const arr = tweets.docs.map(tweet => tweet.data());
      return arr[0].country;
    }
  },
  Mutation: {
    async name() {
      const tra = await translate("Привет", "en");
      admin
        .firestore()
        .collection("users")
        .doc("alovelace")
        .set({
          name: tra,
          state: "CA",
          country: "asdsa",
          capital: false,
          population: 860000
        });
      return tra;
    }
  }
};

export default resolvers;
