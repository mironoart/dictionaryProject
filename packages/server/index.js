var admin = require("firebase-admin");
var serviceAccount = require("./serviceKey.json");

import schema from "./graphql/schema";
import { GraphQLServer } from "graphql-yoga";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://heroic-command-225220.firebaseio.com"
});
admin.firestore().settings({ timestampsInSnapshots: true }); // Supposedly doing something with storing a !date!

const server = new GraphQLServer({ schema });
server.start(() => console.log("Server is running on localhost:4000"));
