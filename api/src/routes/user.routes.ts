import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.schema';

const router = Router();

router.post('/signup', (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      email: req.body.email,
      password: hash,
    });
    user
      .save()
      .then((result: any) => {
        res.status(201).json({
          message: 'User created!',
          result: result,
        });
      })
      .catch((err: any) => {
        res.status(500).json({
          error: err,
        });
      });
  });
});

interface User {
  email: string;
  password: string;
}

router.post('/login', (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: 'Auth failed',
        });
      }
      if (
        bcrypt.compare(req.body.password, user.password)
      ) {
        return user;
      } else {
        return null;
      }
    })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: 'Auth failed',
        });
      }
      const token = jwt.sign(
        {
          email: user.get('email'),
          userId: user.get('id'),
        },
        'secret_this_should_be_longer',
        { expiresIn: '1h' }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
      });
    })
    .catch((err: any) => {
      console.log(err);
      return res.status(401).json({
        message: 'Auth failed',
      });
    });
});

export default router;
