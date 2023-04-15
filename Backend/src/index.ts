import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { port } from './config/env';
import sequelize from './database';
const app = express();
import router from './routes/index'
app.use(morgan("combined"));
app.use(cors());
app.use(express.json());
app.use('/api',router);
(async () => {
    await sequelize.sync({force:true});
    app.listen(port,()=>{
        console.log(`Server running at ${port} port`);
    })
  })();