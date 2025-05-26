// src/pages/api/contacto.ts

import type { APIRoute } from 'astro';
import db from '../../lib/db';

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();
  const { nombre, email, mensaje } = data;

  try {
    await db.query(
      'INSERT INTO formulario_contacto (nombre, email, mensaje) VALUES ($1, $2, $3)',
      [nombre, email, mensaje]
    );
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Error al insertar en la DB:', error);
    return new Response(JSON.stringify({ success: false }), { status: 500 });
  }
};
