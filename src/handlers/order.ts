import express, { Request, Response } from 'express';
import { OrderStore } from '../models/order';
import verifyAuthToken from '../middleware/verifyAuthToken';

const orderRoutes = (app: express.Application) => {
  app.get('/orders', index);
  app.get('/orders/:id', show);
  app.post('/orders', create);
  app.get('/orders/user/:id/active', verifyAuthToken, getCurrentByUser);
  app.get('/orders/user/:id/complete', verifyAuthToken, getCompleteByUser);
  app.post('/orders/:id/products', addProduct);
};

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
  const orders = await store.index();
  res.json(orders);
};

const show = async (req: Request, res: Response) => {
  const order = await store.show(req.params.id);
  res.json(order);
};

const create = async (req: Request, res: Response) => {
  try {
    const order = {
      status: req.body.status,
      user_id: req.body.user_id,
    };
    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const getCurrentByUser = async (req: Request, res: Response) => {
  const order = await store.getCurrentByUser(req.params.id);
  res.json(order);
};

const getCompleteByUser = async (req: Request, res: Response) => {
  const order = await store.getCompleteByUser(req.params.id);
  res.json(order);
};

const addProduct = async (req: Request, res: Response) => {
  try {
    const order = await store.addProduct({
      quantity: parseInt(req.body.quantity),
      order_id: req.params.id,
      product_id: req.body.productId,
    });
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

export default orderRoutes;
