import { Router } from 'express';
import multer from 'multer';

import PostSchema from '../models/post.schema';
import checkAuth from '../middleware/check-auth';

const router = Router();

const MIME_TYPE_MAP: { [key: string]: string } = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
};

const storage = multer.diskStorage({
  destination: (_req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error: Error | null = new Error(
      'Invalid mime type',
    );
    if (isValid) {
      error = null;
    }
    cb(error, 'uploads');
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(' ')
      .join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  },
});

const upload = multer({ storage: storage });

router.post(
  '',
  checkAuth,
  upload.single('image'),
  (req, res) => {
    let imagePath: string | undefined;
    if (req.file) {
      imagePath =
        req.protocol +
        '://' +
        req.get('host') +
        '/uploads/' +
        req.file.filename;
    }
    const post = new PostSchema({
      title: req.body.title,
      content: req.body.content,
      imagePath: imagePath,
      updatedDate: Date.now(),
      createdDate: Date.now(),
    });
    post.save().then((createdPost) => {
      res.status(201).json({
        message: 'Post added successfully',
        postId: createdPost._id,
        updatedDate: Date.now(),
      });
    });
  },
);

router.put(
  '',
  checkAuth,
  upload.single('image'),
  (req, res, next) => {
    console.log(req.body);
    let imagePath = req.body.imagePath;
    if (req.file) {
      imagePath =
        req.protocol +
        '://' +
        req.get('host') +
        '/uploads/' +
        req.file.filename;
    }
    const post = new PostSchema({
      _id: req.body._id,
      title: req.body.title,
      content: req.body.content,
      imagePath: imagePath,
      updatedDate: Date.now(),
    });
    PostSchema.updateOne({ _id: req.body._id }, post).then(
      (result) => {
        console.log(result);
        res
          .status(200)
          .json({ message: 'Update successful!' });
      },
    );
  },
);

router.get('', async (req, res, next) => {
  const query = {
    page: Number(req.query.page),
    pageSize: Number(req.query.pageSize),
  };
  const pageTotal =
    await PostSchema.estimatedDocumentCount();

  const postFind = PostSchema.find().sort([
    ['createdDate', -1],
  ]);

  if (query.page > 1) {
    postFind.skip(query.pageSize * (query.page - 1));
  }
  if (query.pageSize) {
    postFind.limit(query.pageSize);
  }
  postFind.then((documents) => {
    res.status(200).json({
      message: 'Posts fetched successfully!',
      pagination: {
        page: query.page,
        pageSize: query.pageSize,
        total: pageTotal,
      },
      posts: documents,
    });
  });
});

router.get('/:id', (req, res, next) => {
  PostSchema.findById(req.params.id).then((post: any) => {
    if (post && post.title) {
      res.status(200).json({
        message: `Post ${post.title} fetched successfully`,
        post: post,
      });
    } else {
      res.status(404).json({ message: 'Post not found!' });
    }
  });
});

router.delete('/:id', checkAuth, (req, res, next) => {
  PostSchema.deleteOne({ _id: req.params.id }).then(
    (result) => {
      console.log(result);
      res.status(200).json({ message: 'Post deleted!' });
    },
  );
});

export default router;
