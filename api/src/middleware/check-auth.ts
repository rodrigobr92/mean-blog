import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export default (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, 'secret_this_should_be_longer');
    next();
  } catch (error) {
    res.status(401).json({ message: 'Auth failed!' });
  }
};
