import { DataTypes, Model } from "sequelize";
import sequelize from "../database";

interface GroupAttributes {
  id?: number;
  chatId?: number;
  name: string;
  admin?: number;
}

const Group = sequelize.define<Model<GroupAttributes, GroupAttributes>>(
  "Group",
  {
    chatId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "chats",
        key: "id",
      },
    },
    admin: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
    }

  },
  {
    tableName: "groups",
  }
);

export { Group };
export type { GroupAttributes };
