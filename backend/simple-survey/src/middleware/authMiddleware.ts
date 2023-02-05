import { NextFunction, Request, Response } from "express";
import { appCache } from "..";
import { loginLogger } from "../utils/loggerUtils";

const jwt = require('jsonwebtoken');

const jwksClient = require("jwks-rsa");

const client = jwksClient({
  jwksUri: 'https://www.googleapis.com/oauth2/v3/certs'
});

const getKey = (header: any, callback: Function, res: Response) => {
  if (!!appCache.get('googlePublicKey')) {
    callback(null, appCache.get('googlePublicKey'));
  } else {
    client.getSigningKey(header.kid, (err: Error, key: any) => {
      if (err) {
        console.log("signing error:", err.message);
        loginLogger.log('error', `Signing key error: ${err.message}`);
        res.status(403).end();
      } else {
        const signingKey = key.publicKey || key.rsaPublicKey;
        appCache.set('googlePublicKey', signingKey);
        callback(null, signingKey);
      }
    });
  }
}

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.body.jwt;
    const { name, email } = jwt.decode(req.body.jwt);

    if (token) {
      jwt.verify(token, (header: any, callback: Function) => getKey(header, callback, res), { algorithms: ['RS256'] }, (err: Error, _decodedToken: Object) => {
        if (err) {
          appCache.set('googlePublicKey', null);
          jwt.verify(token, (header: any, callback: Function) => getKey(header, callback, res), { algorithms: ['RS256'] }, (err: Error, _decodedToken: Object) => {
            if (err) {
              loginLogger.log('error', `User with credentials: ${email} : ${name} - verify error: ${err.message}`);
              res.status(403).end();
            } else {
              next();
            }
          })
        } else {
          next();
        }
      })
    } else {
      loginLogger.log('error', 'Missing token error');
      res.status(401).end();
    }
  } catch (error) {
    loginLogger.log('error', `Authentication error: ${error}`);
    res.status(401).end();
  }
}

export default requireAuth;