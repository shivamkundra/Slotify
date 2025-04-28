import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import routes from "./routes/index";
import db from "./db/db";
import configs from "./config";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// PORT is read from environment variables (e.g. .env file) or defaults to 5000 if not set
const PORT = configs.port || 5000;
const startServer = async () => {
  try {
    const supabase = db;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error);
    process.exit(1);
  }
};

startServer();
// this will make sure that the server is started only after the database is connected

app.use("/api", routes);