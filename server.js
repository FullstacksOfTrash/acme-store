const express = require('express');
const app = express();
const path = require('path');

const { Product, LineItem, Order } = require('./db').models;
const { syncAndSeed } = require('./db');

syncAndSeed();

const port = process.env.PORT || 3000;

app.listen(port, ()=> { console.log(`listening on port ${port}`) });

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next)=> {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use(express.json());

app.get('/api/products', (req, res, next)=> {
  Product.findAll()
    .then(products => res.send(products))
    .catch(next);
});

app.get('/api/orders', async (req, res, next)=> {

  try {
    const cart = await Order.findOne({ where: { status: 'CART' }}); //if an order was created recently, then there's currently no order with the status 'CART'. we'll have to make one.
    if (!cart) {
      await Order.create({ status: 'CART' });
    }
    const orders = await Order.findAll({ include: [ LineItem ]});
    res.send(orders);
  }
  catch(ex) {
    next(ex);
  }
});

app.put('/api/orders/:orderId/lineItems/:lineItemId', (req, res, next)=> {
  // console.log('app.put, req.body:', req.body);
  LineItem.findById(req.params.lineItemId)
    .then(lineItem => lineItem.update(req.body))
    .then(updated => res.send(updated))
    .catch(next);
});

app.delete('/api/orders/:orderId/lineItems/:lineItemId', (req, res, next)=> {
  LineItem.destroy({ where: {
    id: req.params.lineItemId,
    orderId: req.params.orderId
  }})
    .then(()=> res.sendStatus(204))
    .catch(next);
});

app.post('/api/orders/:orderId/lineItems', (req, res, next)=> {
  LineItem.create({
    ...req.body,
    orderId: req.params.orderId
  })
    .then(created => res.send(created))
    .catch(next);
});

app.put('/api/orders/:orderId', (req, res, next)=> {
  Order.findById(req.params.orderId)
    .then(order => order.update(req.body))
    .then(updated => res.send(updated))
    .catch(next);
});

app.post('/api/reset', (req, res, next)=> {
  syncAndSeed()
    .then(()=> res.sendStatus(204))
    .catch(next);
});