import { print, OutputType } from "../helpers/print";
import Exception from '../exceptions/Exception';
import * as dotenv from 'dotenv'
import pkg from 'pg';

const { Pool } = pkg;
dotenv.config()

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL ,
})

async function connect() {
  try {
    await pool.connect();
    print('Connected to PostgreSQL', OutputType.SUCCESS);
  } catch (error) {
    throw new Exception(Exception.CANNOT_CONNECT_POSTGRESQL);
  }
}

export default connect;
