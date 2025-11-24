require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const { routeNotFound } = require("./middlewares/routeNotFound");
const { checkAuthentication } = require("./middlewares/authMiddleware");

const bookRoutes = require("./routes/bookRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const librarianRoutes = require("./routes/librarianRoutes");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(checkAuthentication);

// Mongodb database connection
connectDB();

// Routes
app.use("/book", bookRoutes);
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/lib", librarianRoutes);

app.use(routeNotFound);

app.listen(process.env.PORT || 4545, () => {
  console.log(`Server started at: http://localhost:${process.env.PORT}/`);
});
