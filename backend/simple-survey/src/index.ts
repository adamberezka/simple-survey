const express = require('express');
const cors = require('cors');
const NodeCache = require('node-cache');
const cookies = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();

import router from "./routes";
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { defaultLogger } from "./utils/loggerUtils";
import logRequests from "./middleware/loggerMiddleware";

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

/** Parse the request */
app.use(express.urlencoded({ extended: false }));

/** Takes care of JSON data */
app.use(express.json());

app.set('trust proxy', true);

app.use('/', logRequests, router);

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
  defaultLogger.log('info', `Server is up and running at port: ${port}`);
});