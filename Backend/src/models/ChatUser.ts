import { DataTypes, Model } from "sequelize";
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
        model: "users",
        key: "id",
      },
    },
    chatId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "chats",
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
