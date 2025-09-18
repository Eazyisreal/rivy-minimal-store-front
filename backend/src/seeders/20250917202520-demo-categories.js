'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const solarPanelsId = uuidv4();
    const invertersId = uuidv4();
    const batteriesId = uuidv4();
    const mountingId = uuidv4();
    const portableId = uuidv4();
    const monitoringId = uuidv4();

    const categories = [
      {
        id: solarPanelsId,
        name: 'Solar Panels',
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: invertersId,
        name: 'Inverters & Power Electronics',
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: batteriesId,
        name: 'Energy Storage',
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: mountingId,
        name: 'Mounting & Racking',
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: portableId,
        name: 'Portable Solar',
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: monitoringId,
        name: 'Monitoring & Control',
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        id: uuidv4(),
        name: 'Residential Solar Panels',
        parentId: solarPanelsId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Commercial Solar Panels',
        parentId: solarPanelsId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Monocrystalline Panels',
        parentId: solarPanelsId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Polycrystalline Panels',
        parentId: solarPanelsId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        id: uuidv4(),
        name: 'String Inverters',
        parentId: invertersId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Microinverters',
        parentId: invertersId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Power Optimizers',
        parentId: invertersId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        id: uuidv4(),
        name: 'Lithium Ion Batteries',
        parentId: batteriesId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Home Battery Systems',
        parentId: batteriesId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Commercial Battery Systems',
        parentId: batteriesId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        id: uuidv4(),
        name: 'Roof Mounting Systems',
        parentId: mountingId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Ground Mount Systems',
        parentId: mountingId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        id: uuidv4(),
        name: 'Portable Solar Panels',
        parentId: portableId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Solar Generators',
        parentId: portableId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('Categories', categories, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};