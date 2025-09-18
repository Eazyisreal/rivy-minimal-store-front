'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const categories = await queryInterface.sequelize.query(
      'SELECT id, name FROM "Categories" WHERE "parentId" IS NOT NULL',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const brands = await queryInterface.sequelize.query(
      'SELECT id, name FROM "Brands"',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const findByName = (array, name) => array.find(item => item.name === name);

    const products = [
      {
        id: uuidv4(),
        name: 'SunPower Maxeon 3 400W Solar Panel',
        description: 'Premium residential solar panel with industry-leading efficiency of 22.6%. Features copper foundation for maximum durability and 25-year complete confidence warranty. Perfect for limited roof space installations.',
        price: 299.99,
        stock: 150,
        categoryId: findByName(categories, 'Residential Solar Panels')?.id || categories[0]?.id,
        brandId: findByName(brands, 'SunPower')?.id || brands[1]?.id,
        imageUrl: 'https://example.com/sunpower-maxeon-3.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'LG NeON R 365W Monocrystalline Solar Panel',
        description: 'High-efficiency monocrystalline solar panel with 21.8% efficiency. Features LG\'s innovative Cello technology for enhanced performance and aesthetics. 25-year product warranty.',
        price: 249.99,
        stock: 200,
        categoryId: findByName(categories, 'Monocrystalline Panels')?.id || categories[0]?.id,
        brandId: findByName(brands, 'LG Solar')?.id || brands[2]?.id,
        imageUrl: 'https://example.com/lg-neon-r-365.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Canadian Solar HiKu 450W Commercial Panel',
        description: 'High-power commercial solar panel designed for utility-scale and large commercial installations. Features PERC cell technology and excellent low-light performance.',
        price: 189.99,
        stock: 300,
        categoryId: findByName(categories, 'Commercial Solar Panels')?.id || categories[1]?.id,
        brandId: findByName(brands, 'Canadian Solar')?.id || brands[5]?.id,
        imageUrl: 'https://example.com/canadian-solar-hiku-450.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Jinko Solar Tiger Pro 400W Panel',
        description: 'Cost-effective monocrystalline solar panel with 20.78% efficiency. Features half-cut cell technology for reduced hot spot risk and improved performance in partial shade.',
        price: 159.99,
        stock: 400,
        categoryId: findByName(categories, 'Monocrystalline Panels')?.id || categories[2]?.id,
        brandId: findByName(brands, 'Jinko Solar')?.id || brands[6]?.id,
        imageUrl: 'https://example.com/jinko-tiger-pro-400.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        id: uuidv4(),
        name: 'SolarEdge SE7600H-US HD-Wave Inverter',
        description: 'Premium single-phase string inverter with 99% efficiency. Features built-in SafeDC technology, 25-year warranty, and revenue-grade monitoring. Perfect for residential installations.',
        price: 1299.99,
        stock: 75,
        categoryId: findByName(categories, 'String Inverters')?.id || categories[3]?.id,
        brandId: findByName(brands, 'SolarEdge')?.id || brands[4]?.id,
        imageUrl: 'https://example.com/solaredge-se7600h.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Enphase IQ8+ Microinverter',
        description: 'Advanced microinverter with grid-forming capability. Can operate during sunlight hours even during grid outages. Features 25-year warranty and superior shade tolerance.',
        price: 149.99,
        stock: 500,
        categoryId: findByName(categories, 'Microinverters')?.id || categories[4]?.id,
        brandId: findByName(brands, 'Enphase')?.id || brands[3]?.id,
        imageUrl: 'https://example.com/enphase-iq8-plus.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Fronius Primo 8.2kW String Inverter',
        description: 'Austrian-engineered string inverter with SnapINverter technology for easy installation. Features integrated arc fault protection and 10-year standard warranty.',
        price: 899.99,
        stock: 60,
        categoryId: findByName(categories, 'String Inverters')?.id || categories[3]?.id,
        brandId: findByName(brands, 'Fronius')?.id || brands[7]?.id,
        imageUrl: 'https://example.com/fronius-primo-8.2.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        id: uuidv4(),
        name: 'Tesla Powerwall 2 Home Battery',
        description: 'Complete home battery system with 13.5kWh usable capacity. Includes built-in inverter, liquid thermal control, and seamless grid integration. Perfect for backup power and self-consumption.',
        price: 11999.99,
        stock: 25,
        categoryId: findByName(categories, 'Home Battery Systems')?.id || categories[5]?.id,
        brandId: findByName(brands, 'Tesla')?.id || brands[0]?.id,
        imageUrl: 'https://example.com/tesla-powerwall-2.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Enphase IQ Battery 10T',
        description: 'Modular lithium iron phosphate battery with 10.08kWh usable capacity. Features cobalt-free chemistry, integrated safety systems, and 15-year warranty.',
        price: 8999.99,
        stock: 40,
        categoryId: findByName(categories, 'Lithium Ion Batteries')?.id || categories[6]?.id,
        brandId: findByName(brands, 'Enphase')?.id || brands[3]?.id,
        imageUrl: 'https://example.com/enphase-iq-battery-10t.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'LG Chem RESU16H Prime Battery',
        description: 'High-voltage residential battery storage system with 16kWh capacity. Features advanced lithium-ion technology and comprehensive battery management system.',
        price: 9499.99,
        stock: 30,
        categoryId: findByName(categories, 'Home Battery Systems')?.id || categories[5]?.id,
        brandId: findByName(brands, 'LG Solar')?.id || brands[2]?.id,
        imageUrl: 'https://example.com/lg-chem-resu16h.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        id: uuidv4(),
        name: 'Goal Zero Yeti 1500X Portable Power Station',
        description: 'Professional-grade portable solar generator with 1516Wh capacity. Features pure sine wave AC output, multiple charging ports, and WiFi app control. Perfect for off-grid applications.',
        price: 1999.99,
        stock: 35,
        categoryId: findByName(categories, 'Solar Generators')?.id || categories[7]?.id,
        brandId: findByName(brands, 'Goal Zero')?.id || brands[8]?.id,
        imageUrl: 'https://example.com/goal-zero-yeti-1500x.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Renogy 100W Portable Solar Panel',
        description: 'Foldable monocrystalline solar panel perfect for RV, camping, and emergency backup. Features durable ETFE surface and integrated kickstands for optimal sun tracking.',
        price: 199.99,
        stock: 120,
        categoryId: findByName(categories, 'Portable Solar Panels')?.id || categories[8]?.id,
        brandId: findByName(brands, 'Renogy')?.id || brands[9]?.id,
        imageUrl: 'https://example.com/renogy-100w-portable.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Goal Zero Boulder 200 Solar Panel',
        description: 'High-efficiency monocrystalline solar panel designed for base camps and semi-permanent installations. Features rugged aluminum frame and integrated kickstand.',
        price: 399.99,
        stock: 50,
        categoryId: findByName(categories, 'Portable Solar Panels')?.id || categories[8]?.id,
        brandId: findByName(brands, 'Goal Zero')?.id || brands[8]?.id,
        imageUrl: 'https://example.com/goal-zero-boulder-200.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        id: uuidv4(),
        name: 'SolarEdge P850 Power Optimizer',
        description: 'DC power optimizer for maximum energy harvest from each solar panel. Features 25-year warranty, module-level monitoring, and enhanced safety with SafeDC technology.',
        price: 79.99,
        stock: 800,
        categoryId: findByName(categories, 'Power Optimizers')?.id || categories[9]?.id,
        brandId: findByName(brands, 'SolarEdge')?.id || brands[4]?.id,
        imageUrl: 'https://example.com/solaredge-p850.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        id: uuidv4(),
        name: 'IronRidge XR Rails and Hardware Kit',
        description: 'Complete roof mounting solution for residential solar installations. Includes anodized aluminum rails, EPDM flashing, and stainless steel hardware. Supports up to 20 panels.',
        price: 899.99,
        stock: 100,
        categoryId: findByName(categories, 'Roof Mounting Systems')?.id || categories[10]?.id,
        brandId: findByName(brands, 'Canadian Solar')?.id || brands[5]?.id,
        imageUrl: 'https://example.com/ironridge-xr-kit.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        id: uuidv4(),
        name: 'Renogy 320W Monocrystalline Solar Panel',
        description: 'Affordable high-efficiency solar panel perfect for DIY installations. Features grade A+ monocrystalline cells and sturdy aluminum frame with 25-year power warranty.',
        price: 139.99,
        stock: 250,
        categoryId: findByName(categories, 'Monocrystalline Panels')?.id || categories[2]?.id,
        brandId: findByName(brands, 'Renogy')?.id || brands[9]?.id,
        imageUrl: 'https://example.com/renogy-320w-mono.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        id: uuidv4(),
        name: 'SunPower Maxeon 6 AC Solar Panel System',
        description: 'Complete AC solar panel with integrated Enphase microinverter. Delivers 435W of clean energy with 22.8% efficiency. Includes 25-year complete system warranty.',
        price: 449.99,
        stock: 80,
        categoryId: findByName(categories, 'Residential Solar Panels')?.id || categories[0]?.id,
        brandId: findByName(brands, 'SunPower')?.id || brands[1]?.id,
        imageUrl: 'https://example.com/sunpower-maxeon-6-ac.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];

    await queryInterface.bulkInsert('Products', products, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};