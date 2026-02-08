import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const PORT = process.env.PORT || "5001";
const MONGO_URI = process.env.MONGO_URI || "no-mongo-uri";

const startServer = (note?: string): void => {
  if (note) {
    console.warn(note);
  }
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

const isMissingMongoUri =
  MONGO_URI === "no-mongo-uri" ||
  MONGO_URI.includes("<db_password>");

if (isMissingMongoUri) {
  startServer(
    "MongoDB connection skipped: MONGO_URI is missing or contains <db_password>.",
  );
} else {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("Connected to MongoDB");
      startServer();
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
      startServer("Starting server without MongoDB connection.");
    });
}
