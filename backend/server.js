require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = 3000;

// Configura CORS para permitir peticiones desde el frontend (ajusta el origen)
app.use(cors({
  origin: 'http://localhost:4321', // Cambia este puerto si tu frontend corre en otro
}));

app.use(express.json());

// Conexión a PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.post('/contacto', async (req, res) => {
  const { nombre, email, mensaje } = req.body;

  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  try {
    const query = `
      INSERT INTO formulario_contacto (nombre, email, mensaje)
      VALUES ($1, $2, $3)
      RETURNING id_from, fecha
    `;
    const values = [nombre, email, mensaje];
    const result = await pool.query(query, values);

    res.status(201).json({ mensaje: 'Mensaje guardado', id: result.rows[0].id_from, fecha: result.rows[0].fecha });
  } catch (error) {
    console.error('Error guardando el mensaje:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
