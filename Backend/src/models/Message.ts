import { DataTypes, Model } from "sequelize";
import sequelize from "../database";

interface MessageAttributes {
  id?: number;
  text: string;
  userId: number;
  chatId: number;
}

const Message = sequelize.define<Model<MessageAttributes, MessageAttributes>>(
  "Message",
  {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
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
    tableName: "messages",
  }
);

export { Message };
export type { MessageAttributes };
