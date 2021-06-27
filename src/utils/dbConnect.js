import mongoose from "mongoose";

const connection = {};

const connectToDatabase = async () => {
  if (connection.isConnected) {
    return;
  }

  const database = process.env.DATABASE?.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
  );

  try {
    const db = await mongoose.connect(database, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    connection.isConnected = db.connections[0].readyState;

    console.log("Connect with Database!");
  } catch (error) {
    console.log("Database connection fail!");
    console.log(error);
  }
};

export default connectToDatabase;
