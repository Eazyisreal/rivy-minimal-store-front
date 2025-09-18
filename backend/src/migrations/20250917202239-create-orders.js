'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('pending', 'placed', 'completed'),
        allowNull: false,
        defaultValue: 'pending',
      },
      total: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          isDecimal: true,
          min: 0,
        },
      },
      userId: {
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
    await queryInterface.addIndex('Orders', ['userId']);
    await queryInterface.addIndex('Orders', ['status']);
    await queryInterface.addIndex('Orders', ['createdAt']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};