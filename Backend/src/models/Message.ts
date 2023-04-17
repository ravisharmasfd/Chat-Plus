import { DataTypes, Model, Sequelize } from "sequelize";
import sequelize from "../database";

interface MessageAttributes {
id ?: number;
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
tableName: "messages",
}
);

export { Message };
export type { MessageAttributes };