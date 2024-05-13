import express, {
  NextFunction,
  Request,
  Response,
} from 'express';
import path from 'node:path';

import postRoutes from './src/routes/post.routes';
import userRoutes from './src/routes/user.routes';
import mongoose from 'mongoose';

const app = express();

app.use(express.json());

app.use("/uploads", express.static(path.join("uploads")));

async function connect() {
  try {
    // mongodb://username:password@localhost:27017/myDatabase
    await mongoose.connect(
      'mongodb://admin:blog1234@localhost:27017'
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
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    );
    next();
  }
);

app.use('/api/posts', postRoutes);
app.use('/api/user', userRoutes);

app.listen(3333, () => 'server running on port 3333');
