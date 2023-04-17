import { DataTypes, Model, Sequelize } from "sequelize";
import sequelize from "../database";

interface ChatAttributes {
id ?: number;
group: boolean;
}

const Chat = sequelize.define<Model<ChatAttributes, ChatAttributes>>(
"Chat",
{
group: {
type: DataTypes.BOOLEAN,
allowNull: false,
defaultValue:false,
},
},
{
tableName: "chats",
}
);

export { Chat };
export type { ChatAttributes };