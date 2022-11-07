import { NextFunction, Request, Response } from "express";

const jwt = require('jsonwebtoken');

const requierAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.jwt;

    if (token) {
      jwt.verify(token, process.env.OAUTH_CLIENT_SECRET, (err: Error, _decodedToken: Object) => {
        if (err) {
          console.log(err.message);
          res.redirect('/login')
        } else {
          next();
        }
      })
    } else {
      res.redirect('/login')
    }
  } catch (error) {
    console.log("Auth error ->", error);
    res.status(401).redirect('/login');
  }
}

export default requierAuth;