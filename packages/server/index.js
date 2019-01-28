var admin = require("firebase-admin");
var serviceAccount = require("./serviceKey.json");

import schema from "./graphql/schema";
import { ApolloServer } from "apollo-server";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://heroic-command-225220.firebaseio.com"
});
admin.firestore().settings({ timestampsInSnapshots: true }); // Supposedly doing something with storing a !date!

const server = new ApolloServer({ schema });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
