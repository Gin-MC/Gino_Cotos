import { Pool } from 'pg';
import dotenv from 'dotenv';//carga las variables de entorno desde un archivo .env

dotenv.config();//Ejecuta la configuración de dotenv

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,// = URL de conexión a la base de datos
});

export default pool;
