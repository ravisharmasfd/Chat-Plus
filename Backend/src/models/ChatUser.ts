import { DataTypes, Model, Sequelize } from "sequelize";
import sequelize from "../database";

interface ChatUsersAttributes {
  id?: number;
  userId?: number;
  chatId?: number;
}

const ChatUsers = sequelize.define<Model<ChatUsersAttributes, ChatUsersAttributes>>(
  "ChatUsers",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "id",
      },
    },
    chatId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Chat",
        key: "id",
      },
    },
  },
  {
    tableName: "chat_users",
  }
);

export { ChatUsers };
export type { ChatUsersAttributes };
