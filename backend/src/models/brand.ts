import { DataTypes, Model } from 'sequelize';

import {sequelize} from '../config/database';

class Brand extends Model {
  public id!: string;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Brand.init(
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
  },
  {
    sequelize,
    tableName: 'Brands',
    timestamps: true,
  }
);

export default Brand;