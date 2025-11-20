require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const bookRoutes = require("./routes/bookRoutes");
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/db");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Mongodb database connection
connectDB();

// Routes
app.use("/book", bookRoutes);
app.use("/user", userRoutes);

app.listen(process.env.PORT || 4545, () => {
  console.log(`Server started at: http://localhost:${process.env.PORT}/`);
});
