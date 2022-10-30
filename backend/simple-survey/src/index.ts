const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

import router from "./routes";
import "reflect-metadata";
import { AppDataSource } from "./data-source";

const app = express();
const port = process.env.PORT || 8080;

AppDataSource.initialize()
    .then(() => {
        console.log("[database]: Database has been initialized");
    })
    .catch((error) => console.log(error))

/** Logging */
// app.use(morgan('dev'));
/** Parse the request */
app.use(express.urlencoded({ extended: false }));
/** Takes care of JSON data */
app.use(express.json());

app.use('/', router);

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});