// Importaciones
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';//carga las variables de entorno desde un archivo .env
import { Pool } from 'pg';

// Cargar variables de entorno
dotenv.config();

// Crear app de Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());// Permitir solicitudes desde cualquier origen
app.use(express.json()); // Para recibir datos en formato JSON

// Configuración de PostgreSQL con variables .env
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor activo');
});

// Ruta para recibir el formulario
app.post('/contacto', async (req, res) => {
  const { nombre, email, mensaje } = req.body;// Desestructuración de los datos del formulario

  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  try {
    await pool.query(
      'INSERT INTO formulario_contacto (nombre, email, mensaje) VALUES ($1, $2, $3)',
      [nombre, email, mensaje]
    );

    console.log('📥 Mensaje guardado en la base de datos');
    res.status(200).json({ mensaje: 'Mensaje enviado con éxito.' });
  } catch (error) {
    console.error('❌ Error al guardar mensaje:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

//elimine el db.js