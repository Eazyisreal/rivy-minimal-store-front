'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrderItems', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      orderId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Orders',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      productId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Products',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          min: 1,
        },
      },
      unitPrice: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          isDecimal: true,
          min: 0,
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });

    // Add indexes for better query performance
    await queryInterface.addIndex('OrderItems', ['orderId']);
    await queryInterface.addIndex('OrderItems', ['productId']);
    
    // Add composite unique constraint to prevent duplicate items in the same order
    await queryInterface.addIndex('OrderItems', ['orderId', 'productId'], {
      unique: true,
      name: 'unique_order_product'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('OrderItems');
  }
};