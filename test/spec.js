const { expect } = require('chai');
const { syncAndSeedDev } = require('../db');
const { Order, LineItem, Product } = require('../db').models;

const { getProductByLineItem } = require('../utils');

describe('models', ()=> {

  beforeEach(()=> syncAndSeedDev());

  describe('Order', ()=> {
    it('there is one order', async ()=> {
      const orders = await Order.findAll();
      expect(orders.length).to.equal(1);
    });
    
  });

  describe('LineItem', ()=> {
    it('there are two line items', async ()=> {
      const lineItems = await LineItem.findAll();
      expect(lineItems.length).to.equal(2);
    });
  });

  describe('Product', ()=>{
    it('there are four products', async ()=> {
      const products = await Product.findAll();
      expect(products.length).to.equal(4);
    });
  });

  describe('Associations', ()=> {
    it('one order has two line items', async ()=> {
      const orders = await Order.findAll({
        include: [ LineItem ]
      })
      const appleStoreOrder = orders[0];
      expect(appleStoreOrder.lineItems.length).to.equal(2);
    });
  });

  describe('mapping with only Order and Product models', ()=> {

    it(' can return a full order with line items using only Order and Product models', async ()=> {

      const orders = await Order.findAll({ include: [ LineItem ] });
      const order = orders[0];

      console.log('order number:', order.id);

      const lineItem1 = order.lineItems[0];
      // console.log('lineItem1.dataValues:', order.lineItems[0].dataValues);
      console.log('lineItem1.quantity:', lineItem1.quantity);

      const lineItem1Product = await Product.findById(lineItem1.productId);
      // console.log('lineItem1Product.dataValues:', lineItem1Product.dataValues);

      console.log('lineItem1Product.name:', lineItem1Product.name);

    });


    it('getProductByLineItem mapper function works', async ()=> {

      const orders = await Order.findAll({ include: [ LineItem ] });
      const products = await Product.findAll();

      const order = orders[0];

      const lineItem1 = order.lineItems[0];

      const lineItem1Product = getProductByLineItem(products, lineItem1);

      expect(lineItem1Product.name).to.equal('iPhone');

    });

  });

  

});




