import { DataTypes, Model } from 'sequelize';

import {sequelize} from '../config/database';

class Category extends Model {
  public id!: string;
  public name!: string;
  public parentId!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Category.init(
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
    parentId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Categories',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'Categories',
    timestamps: true,
  }
);

export default Category;