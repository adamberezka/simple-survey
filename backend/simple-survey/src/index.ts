const express = require('express');
const cors = require('cors');
const NodeCache = require('node-cache');
const cookies = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();

import router from "./routes";
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { logger } from "./utils/loggerUtils";

const app = express();
const port = process.env.PORT || 8080;

export const appCache = new NodeCache(); 

AppDataSource.initialize()
    .then(() => {
        console.log("[database]: Database has been initialized");
    })
    .catch((error) => console.log(error))

/** Take care of cookies */
app.use(cookies());
app.use(cors());

/** Logging */



/** Parse the request */
app.use(express.urlencoded({ extended: false }));

/** Takes care of JSON data */
app.use(express.json());

app.use('/', router);

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
  logger.log('info', `Server is running at https://localhost:${port}`);
});