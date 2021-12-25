import express, { Request, Response } from 'express';

import { DashboardQueries } from '../services/dashboard';

const dashboardRoutes = (app: express.Application) => {
  app.get('/products/five-most-popular', fiveMostPopular);
  app.get('/products/:category', productsByCategory);
};

const dashboard = new DashboardQueries();

const fiveMostPopular = async (_req: Request, res: Response) => {
  const products = await dashboard.fiveMostPopularProducts();
  res.json(products);
};

const productsByCategory = async (req: Request, res: Response) => {
  const products = await dashboard.productsByCategory(req.params.category);
  res.json(products);
};

export default dashboardRoutes;
