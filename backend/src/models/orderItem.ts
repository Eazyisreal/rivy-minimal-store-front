import { DataTypes, Model } from 'sequelize';

import Order from './order';
import Product from './product';
import {sequelize} from '../config/database';

class OrderItem extends Model {
  public id!: string;
  public orderId!: string;
  public productId!: string;
  public quantity!: number;
  public price!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

OrderItem.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Orders',
        key: 'id',
      },
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'id',
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    unitPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
        min: 0,
      },
    },
  },
  {
    sequelize,
    tableName: 'OrderItems',
    timestamps: true,
  }
);


Order.hasMany(OrderItem, { 
  foreignKey: 'orderId',
  as: 'orderItems'
});

OrderItem.belongsTo(Order, { 
  foreignKey: 'orderId',
  as: 'order'
});

Product.hasMany(OrderItem, { 
  foreignKey: 'productId',
  as: 'orderItems'
});

OrderItem.belongsTo(Product, { 
  foreignKey: 'productId',
  as: 'product'
});

export default OrderItem;