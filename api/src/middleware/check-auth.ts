import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export interface UserData extends JwtPayload {
  userId: string;
  email: string;
  username: string;
}

// Custom request interface
export interface AuthenticatedRequest extends Request {
    userData?: UserData; 
}

export default (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if(!token) {
      res.status(401).json({ message: 'Auth failed!' });
    }
    const decodedToken = jwt.verify(token, 'secret_this_should_be_longer') as UserData;
    req.userData = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Auth failed!' });
  }
};
