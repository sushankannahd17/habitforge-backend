const express = require("express");
const cors = require("cors")
const dbConnection = require("./src/config/db")
const appRouter = require("./src/app")
require("dotenv").config()

const allowedOrigins = process.env.CLIENT_URI.split(",");
const app = express();

app.use(express.json());
app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    })
);
app.use("/api", appRouter);

dbConnection();
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server listening through port ${port}`)
})
