import Brand from './brand';
import Category from './category';
import Order from './order';
import OrderItem from './orderItem';
import Product from './product';

Category.hasMany(Category, {
  foreignKey: 'parentId',
  as: 'subCategories',
});

Category.belongsTo(Category, {
  foreignKey: 'parentId',
  as: 'parentCategory',
});


Category.hasMany(Product, { 
  foreignKey: 'categoryId',
  as: 'products' 
});
Product.belongsTo(Category, { 
  foreignKey: 'categoryId',
  as: 'category'
});


Brand.hasMany(Product, { 
  foreignKey: 'brandId',
  as: 'products'
});
Product.belongsTo(Brand, { 
  foreignKey: 'brandId',
  as: 'brand'
});


Product.hasMany(OrderItem, { 
  foreignKey: 'productId',
  as: 'orderItems'
});
OrderItem.belongsTo(Product, { 
  foreignKey: 'productId',
  as: 'product'
});

Order.hasMany(OrderItem, { 
  foreignKey: 'orderId',
  as: 'orderItems'
});
OrderItem.belongsTo(Order, { 
  foreignKey: 'orderId',
  as: 'order'
});

export { Category, Brand, Product, Order, OrderItem };