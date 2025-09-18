import { DataTypes, Model } from 'sequelize';

import {sequelize} from '../config/database';

class Order extends Model {
  public id!: string;
  public status!: string;
  public total!: number;
  public userId!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Order.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    status: {
      type: DataTypes.ENUM('pending', 'placed', 'completed'),
      allowNull: false,
      defaultValue: 'pending',
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
        min: 0,
      },
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'Orders',
    timestamps: true,
  }
);

export default Order;