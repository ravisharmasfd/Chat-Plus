import { DataTypes, Model, Sequelize } from "sequelize";
import sequelize from "../database";

interface UserAttributes {
  id ?: string;
  email: string;
  password: string;
  name: string;
  phone: string;
}

const User = sequelize.define<Model<UserAttributes, UserAttributes>>(
  "User",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
  }
);

export { User };
export type { UserAttributes };
