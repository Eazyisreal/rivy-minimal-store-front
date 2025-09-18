'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          isDecimal: true,
          min: 0,
        },
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          min: 0,
        },
      },
      categoryId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Categories',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      brandId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Brands',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      imageUrl: {
        type: Sequelize.STRING,
        allowNull: true,
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
    await queryInterface.addIndex('Products', ['categoryId']);
    await queryInterface.addIndex('Products', ['brandId']);
    await queryInterface.addIndex('Products', ['name']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};