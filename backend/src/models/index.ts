import Brand from './brand';
import Category from './category';
import Order from './order';
import OrderItem from './orderItem';
import Product from './product';

Category.hasMany(Category, { foreignKey: 'parentId', as: 'subCategories' });
Category.hasMany(Product, { foreignKey: 'categoryId' });

Brand.hasMany(Product, { foreignKey: 'brandId' });

Product.belongsTo(Category, { foreignKey: 'categoryId' });
Product.belongsTo(Brand, { foreignKey: 'brandId' });
Product.hasMany(OrderItem, { foreignKey: 'productId' });

Order.hasMany(OrderItem, { foreignKey: 'orderId' });

OrderItem.belongsTo(Order, { foreignKey: 'orderId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });

export { Category, Brand, Product, Order, OrderItem };