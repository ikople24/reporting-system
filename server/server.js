const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const { readdirSync } = require("fs");
const handleError = require("./middlewares/error");
require("dotenv/config");
const {clerkMiddleware} = require("@clerk/express")


app.use(cors()); // allow all origins
app.use(express.json({limit: "10mb"})); // allow json data
app.use(morgan("dev")); // show log in console
app.use(clerkMiddleware())

readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

app.use(handleError);

const PORT = 4000;
app.listen(PORT, () => console.log(`Server is run on port ${PORT}`));
