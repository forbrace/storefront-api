import express, { Request, Response } from 'express';

import { User, UserStore } from '../models/user';
import verifyAuthToken from '../middleware/verifyAuthToken';
import jwt from 'jsonwebtoken';

const userRoutes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index);
  app.get('/users/:id', verifyAuthToken, show);
  app.post('/users', create);
  app.post('/users/authenticate', authenticate);
  app.delete('/users/:id', verifyAuthToken, destroy);
};

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  const users = await store.index();
  res.json(users);
};

const show = async (req: Request, res: Response) => {
  const user = await store.show(req.params.id);
  res.json(user);
};

const create = async (req: Request, res: Response) => {
  const user: User = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username,
    password: req.body.password,
  };
  try {
    const newUser = await store.create(user);
    // Sign as part of user create action
    const token = jwt.sign({ user: newUser }, <string>process.env.TOKEN_SECRET);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const authenticate = async (req: Request, res: Response) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
  };
  try {
    const authUser = await store.authenticate(user.username, user.password);
    const token = jwt.sign(
      { user: authUser },
      <string>process.env.TOKEN_SECRET
    );
    res.json(token);
  } catch (err) {
    res.status(401);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.params.id);
  res.json(deleted);
};

export default userRoutes;
