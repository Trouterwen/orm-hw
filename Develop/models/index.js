// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'product_id'
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id'
});
// Products belongToMany Tags 
Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
  },
  as: 'tag_id'
});

// Tags belongToMany Products 
Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
  },
  as: 'product_id'
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
