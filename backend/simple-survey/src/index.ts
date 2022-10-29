import router from "./routes";

const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

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