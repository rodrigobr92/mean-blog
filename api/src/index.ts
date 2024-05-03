import express, {
  NextFunction,
  Router,
  Request,
  Response,
} from 'express';

import postRoutes from './routes/post.routes';
import mongoose from 'mongoose';

const app = express();

app.use(express.json());

async function connect() {
  try {
    // mongodb://username:password@localhost:27017/myDatabase
    await mongoose.connect(
      'mongodb://admin:blog1234@localhost:27017?retryWrites=true'
    );
  } catch (err) {
    console.log(err);
  }
};

connect();

app.use(
  (_req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    );
    next();
  }
);

app.use('/api/posts', postRoutes);

app.listen(3333, () => 'server running on port 3333');
