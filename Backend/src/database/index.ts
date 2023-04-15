
import { Sequelize } from "sequelize";
import { dbHost, dbName, dbPass, dbUser } from "../config/env";
import mysql2 from "mysql2"
// Configure database connection
const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  dialect: "mysql",
  dialectModule: mysql2,
});
export default sequelize;
