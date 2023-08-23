const seedCategories = require('./category-seeds');
const seedProducts = require('./product-seeds');
const seedTags = require('./tag-seeds');
const seedProductTags = require('./product-tag-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n--- DATABASE IS SYNCED ---\n');
  await seedCategories();
  console.log('\n--- CATEGORIES ARE SEEDED ---\n');

  await seedProducts();
  console.log('\n--- PRODUCTS ARE SEEDED ---\n');

  await seedTags();
  console.log('\n--- TAGS ARE SEEDED ---\n');

  await seedProductTags();
  console.log('\n--- PRODUCT TAGS ARE SEEDED ---\n');

  process.exit(0);
};

seedAll();
