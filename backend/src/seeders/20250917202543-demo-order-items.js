'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
  
    const orders = await queryInterface.sequelize.query(
      'SELECT id, total, "userId" FROM "Orders" ORDER BY "createdAt" DESC',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const products = await queryInterface.sequelize.query(
      'SELECT id, name, price FROM "Products"',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (orders.length === 0 || products.length === 0) {
      console.log('No orders or products found. Make sure to run orders and products seeders first.');
      return;
    }

  
    const findProductByName = (name) => products.find(p => p.name.includes(name));

    const orderItems = [

      {
        id: uuidv4(),
        orderId: orders[0]?.id,
        productId: findProductByName('SunPower Maxeon 3')?.id || products[0]?.id,
        quantity: 20,
        unitPrice: 299.99,
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      },
      {
        id: uuidv4(),
        orderId: orders[0]?.id,
        productId: findProductByName('SolarEdge SE7600H')?.id || products[1]?.id,
        quantity: 1,
        unitPrice: 1299.99,
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      },
      {
        id: uuidv4(),
        orderId: orders[0]?.id,
        productId: findProductByName('SolarEdge P850')?.id || products[2]?.id,
        quantity: 20,
        unitPrice: 79.99,
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      },
      {
        id: uuidv4(),
        orderId: orders[0]?.id,
        productId: findProductByName('IronRidge XR')?.id || products[3]?.id,
        quantity: 1,
        unitPrice: 899.99,
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      },

    
      {
        id: uuidv4(),
        orderId: orders[1]?.id,
        productId: findProductByName('Canadian Solar HiKu')?.id || products[4]?.id,
        quantity: 100, 
        unitPrice: 189.99,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
      {
        id: uuidv4(),
        orderId: orders[1]?.id,
        productId: findProductByName('Fronius Primo')?.id || products[5]?.id,
        quantity: 5, 
        unitPrice: 899.99,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
      {
        id: uuidv4(),
        orderId: orders[1]?.id,
        productId: findProductByName('IronRidge XR')?.id || products[6]?.id,
        quantity: 5,
        unitPrice: 899.99,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },

      
      {
        id: uuidv4(),
        orderId: orders[2]?.id,
        productId: findProductByName('Renogy 320W')?.id || products[7]?.id,
        quantity: 12, 
        unitPrice: 139.99,
        createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
      },
      {
        id: uuidv4(),
        orderId: orders[2]?.id,
        productId: findProductByName('Enphase IQ8+')?.id || products[8]?.id,
        quantity: 12, 
        unitPrice: 149.99,
        createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
      },

      
      {
        id: uuidv4(),
        orderId: orders[3]?.id,
        productId: findProductByName('Tesla Powerwall 2')?.id || products[9]?.id,
        quantity: 1,
        unitPrice: 11999.99,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      },
      {
        id: uuidv4(),
        orderId: orders[3]?.id,
        productId: findProductByName('IronRidge XR')?.id || products[10]?.id,
        quantity: 1,
        unitPrice: 1000.00, 
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      },

      
      {
        id: uuidv4(),
        orderId: orders[4]?.id,
        productId: findProductByName('Goal Zero Yeti 1500X')?.id || products[11]?.id,
        quantity: 1,
        unitPrice: 1999.99,
        createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      },
      {
        id: uuidv4(),
        orderId: orders[4]?.id,
        productId: findProductByName('Renogy 100W Portable')?.id || products[12]?.id,
        quantity: 1,
        unitPrice: 199.99,
        createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      },

      
      {
        id: uuidv4(),
        orderId: orders[5]?.id,
        productId: findProductByName('LG NeON R 365W')?.id || products[13]?.id,
        quantity: 12, 
        unitPrice: 249.99,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        id: uuidv4(),
        orderId: orders[5]?.id,
        productId: findProductByName('SolarEdge SE7600H')?.id || products[14]?.id,
        quantity: 1,
        unitPrice: 1299.99,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        id: uuidv4(),
        orderId: orders[5]?.id,
        productId: findProductByName('SolarEdge P850')?.id || products[15]?.id,
        quantity: 12,
        unitPrice: 79.99,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        id: uuidv4(),
        orderId: orders[5]?.id,
        productId: findProductByName('IronRidge XR')?.id || products[16]?.id,
        quantity: 1,
        unitPrice: 899.99,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },

      
      {
        id: uuidv4(),
        orderId: orders[6]?.id,
        productId: findProductByName('SunPower Maxeon 6')?.id || products[17]?.id,
        quantity: 20,
        unitPrice: 449.99,
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        id: uuidv4(),
        orderId: orders[6]?.id,
        productId: findProductByName('Enphase IQ Battery 10T')?.id || products[18]?.id,
        quantity: 1,
        unitPrice: 8999.99,
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        id: uuidv4(),
        orderId: orders[6]?.id,
        productId: findProductByName('IronRidge XR')?.id || products[19]?.id,
        quantity: 1,
        unitPrice: 899.99,
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },

      
      {
        id: uuidv4(),
        orderId: orders[7]?.id,
        productId: findProductByName('Jinko Solar Tiger Pro')?.id || products[0]?.id,
        quantity: 8, 
        unitPrice: 159.99,
        createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
      },
      {
        id: uuidv4(),
        orderId: orders[7]?.id,
        productId: findProductByName('Goal Zero Boulder 200')?.id || products[1]?.id,
        quantity: 2,
        unitPrice: 399.99,
        createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
      },
      {
        id: uuidv4(),
        orderId: orders[7]?.id,
        productId: findProductByName('Goal Zero Yeti 1500X')?.id || products[2]?.id,
        quantity: 2,
        unitPrice: 1999.99,
        createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
      },

      
      {
        id: uuidv4(),
        orderId: orders[8]?.id,
        productId: findProductByName('Goal Zero Yeti 1500X')?.id || products[3]?.id,
        quantity: 1,
        unitPrice: 1999.99,
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      },
      {
        id: uuidv4(),
        orderId: orders[8]?.id,
        productId: findProductByName('Goal Zero Boulder 200')?.id || products[4]?.id,
        quantity: 2,
        unitPrice: 399.99,
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      },
      {
        id: uuidv4(),
        orderId: orders[8]?.id,
        productId: findProductByName('Renogy 100W Portable')?.id || products[5]?.id,
        quantity: 1,
        unitPrice: 199.99,
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      },

      
      {
        id: uuidv4(),
        orderId: orders[9]?.id,
        productId: findProductByName('Goal Zero Boulder 200')?.id || products[6]?.id,
        quantity: 2,
        unitPrice: 399.99,
        createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
      },
      {
        id: uuidv4(),
        orderId: orders[9]?.id,
        productId: findProductByName('Renogy 320W')?.id || products[7]?.id,
        quantity: 4,
        unitPrice: 139.99,
        createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
      },
      {
        id: uuidv4(),
        orderId: orders[9]?.id,
        productId: findProductByName('Renogy 100W Portable')?.id || products[8]?.id,
        quantity: 2,
        unitPrice: 199.99,
        createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
      },

      
      {
        id: uuidv4(),
        orderId: orders[10]?.id,
        productId: findProductByName('Canadian Solar HiKu')?.id || products[9]?.id,
        quantity: 200, 
        unitPrice: 189.99,
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
      },
      {
        id: uuidv4(),
        orderId: orders[10]?.id,
        productId: findProductByName('Fronius Primo')?.id || products[10]?.id,
        quantity: 10,
        unitPrice: 899.99,
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
      },
      {
        id: uuidv4(),
        orderId: orders[10]?.id,
        productId: findProductByName('LG Chem RESU16H')?.id || products[11]?.id,
        quantity: 2, 
        unitPrice: 9499.99,
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
      },

      
      {
        id: uuidv4(),
        orderId: orders[11]?.id,
        productId: findProductByName('Enphase IQ8+')?.id || products[12]?.id,
        quantity: 25, 
        unitPrice: 149.99,
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      },
    ];

    
    const validOrderItems = orderItems.filter(item => 
      item.orderId && item.productId
    );

    if (validOrderItems.length > 0) {
      await queryInterface.bulkInsert('OrderItems', validOrderItems, {});
    } else {
      console.log('No valid order items to insert. Check if orders and products exist.');
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('OrderItems', null, {});
  }
};