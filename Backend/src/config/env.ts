import * as  dotenv from 'dotenv'
dotenv.config()

export const port = process.env.PORT as string
export const dbName = process.env.DB_NAME as string
export const dbUser = process.env.DB_USER as string
export const dbPass = process.env.DB_PASS as string
export const dbHost = process.env.DB_HOST as string
export const jwtSecret = process.env.JWT_SECRET as string

