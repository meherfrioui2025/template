import { config } from "dotenv";
import express from "express";
import cors from "cors";

import { port } from "./config/keys.js";
import setupDB from "./utils/db.js";
import routesURL from "./routes/index.js";

config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

setupDB();

app.use(routesURL);

const server = app.listen(port, () => {
  console.log(
    `Listening on port ${port}. Visit http://localhost:${port}/ in your browser.`
  );
});
