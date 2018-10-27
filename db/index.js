const Sequelize = require('sequelize');

const conn = new Sequelize(process.env.DATABASE_URL, {
  logging: false
});

const Product = conn.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  }
});

const Order = conn.define('order', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  status: {
    type: Sequelize.ENUM('CART', 'ORDER'),
    allowNull: false,
    defaultValue: 'CART'
  }
});

const LineItem = conn.define('lineItem', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
});

Order.hasMany(LineItem);
LineItem.belongsTo(Order);
LineItem.belongsTo(Product);


const syncAndSeedDev = async ()=> {
  await conn.sync({
    force: true
  });

  /*CREATE PRODUCTS*/
  const [ iphone, ipad, imac ] = await Promise.all([
    Product.create({ name: 'iPhone' }),
    Product.create({ name: 'iPad' }),
    Product.create({ name: 'iMac' }),
    Product.create({ name: 'Macbook' })
  ]);

  /*CREATE LINEITEMS*/
  const iphones = await LineItem.create({ quantity: 5 });
  await iphones.setProduct(iphone);
  
  const ipads = await LineItem.create({ quantity: 3 });
  await ipads.setProduct(ipad);

  const imacs = null;

  /*CREATE ORDERS*/
  const appleStoreOrder = await Order.create({ status: 'CART' });
  await iphones.setOrder(appleStoreOrder);
  await ipads.setOrder(appleStoreOrder);

};

const syncAndSeed = async ()=> {
  await conn.sync({
    force: true
  });

  const [ iphone, ipad, imac ] = await Promise.all([
    Product.create({ name: 'iPhone' }),
    Product.create({ name: 'iPad' }),
    Product.create({ name: 'iMac' }),
    Product.create({ name: 'Macbook' })
  ]);

  

};



module.exports = {
  syncAndSeedDev,
  syncAndSeed,
  models: {
    Order,
    LineItem,
    Product
  }
};




//order has many lineitems
//lineitem belongs to an order
//product belongs to a line item .....or does a lineitem belong to a product??

//product belongs to an order //do i need this one? ...if i don't need it, don't use it.
