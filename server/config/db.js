
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log(
      `MongoDB Connected: ${connection.connection.host}`
    );
  } catch (error) {
    console.error("\nMongoDB connection failed:");
    console.error(error.message);

    if (error.reason?.servers) {
      console.log("\nIndividual server errors:");

      for (const [address, server] of error.reason.servers) {
        console.log(`\nServer: ${address}`);
        console.log(
          "Error:",
          server.error?.message || "No detailed error available"
        );
      }
    }

    process.exit(1);
  }
};

module.exports = connectDB;
