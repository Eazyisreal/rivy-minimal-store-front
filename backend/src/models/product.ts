import { DataTypes, Model } from 'sequelize';

import {sequelize} from '../config/database';

class Product extends Model {
  public id!: string;
  public name!: string;
  public description!: string;
  public price!: number;
  public stock!: number;
  public categoryId!: string;
  public brandId!: string;
  public imageUrl!: string[] | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
        min: 0,
      },
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 0,
      },
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Categories',
        key: 'id',
      },
    },
    brandId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Brands',
        key: 'id',
      },
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'Products',
    timestamps: true,
  }
);

export default Product;