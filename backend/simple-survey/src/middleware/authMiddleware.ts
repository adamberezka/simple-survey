import axios from "axios";
import { NextFunction, Request, Response } from "express";

const jwt = require('jsonwebtoken');

const jwksClient = require("jwks-rsa");

const client = jwksClient({
  jwksUri: 'https://www.googleapis.com/oauth2/v3/certs'
});

const getKey = (header: any, callback: Function) => {
  client.getSigningKey(header.kid, (err: Error, key: any) => {
    if (err) {
      console.log(err.message);
    } else {
      const signingKey = key.publicKey || key.rsaPublicKey;
      callback(null, signingKey);
    }
  });
}

const requierAuth = async (req: Request, res: Response, next: NextFunction) => {
  console.log("New request: ", req.baseUrl + req.url);

  try {
    const token = req.body.jwt;

    if (token) {
      jwt.verify(token, getKey, { algorithms: ['RS256'] }, (err: Error, _decodedToken: Object) => {
        if (err) {
          console.log("Verify error ->", err.message);
          res.status(401);
        } else {
          next();
        }
      })
    } else {
      console.log("Missing token error");
      res.status(401);
    }
  } catch (error) {
    console.log("Auth error ->", error);
    res.status(401);
  }
}

export default requierAuth;