'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const orders = [
      {
        id: uuidv4(),
        status: 'completed',
        total: 15899.85, 
        userId: 'cust_residential_001',
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), 
        updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), 
      },
      
      {
        id: uuidv4(),
        status: 'placed',
        total: 48999.75, 
        userId: 'cust_commercial_002',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), 
        updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), 
      },

      {
        id: uuidv4(),
        status: 'completed',
        total: 3299.96,
        userId: 'cust_diy_003',
        createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000), 
        updatedAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000), 
      },

      {
        id: uuidv4(),
        status: 'pending',
        total: 12999.99,
        userId: 'cust_battery_004',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), 
        updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), 
      },

      {
        id: uuidv4(),
        status: 'completed',
        total: 2199.98,
        userId: 'cust_rv_005',
        createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      },

      {
        id: uuidv4(),
        status: 'placed',
        total: 8749.93,
        userId: 'cust_starter_006',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), 
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), 
      },

      
      {
        id: uuidv4(),
        status: 'pending',
        total: 23499.94,
        userId: 'cust_premium_007',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), 
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), 
      },

      
      {
        id: uuidv4(),
        status: 'completed',
        total: 5999.96,
        userId: 'cust_offgrid_008',
        createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000), 
        updatedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), 
      },

    
      {
        id: uuidv4(),
        status: 'placed',
        total: 2899.98,
        userId: 'cust_emergency_009',
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), 
        updatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000), 
      },

      
      {
        id: uuidv4(),
        status: 'completed',
        total: 1599.98,
        userId: null, 
        createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), 
      },

      
      {
        id: uuidv4(),
        status: 'pending',
        total: 67499.85,
        userId: 'cust_enterprise_010',
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000), 
        updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000), 
      },

      
      {
        id: uuidv4(),
        status: 'completed',
        total: 3749.88,
        userId: 'cust_upgrade_011',
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), 
        updatedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), 
      }
    ];

    await queryInterface.bulkInsert('Orders', orders, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Orders', null, {});
  }
};