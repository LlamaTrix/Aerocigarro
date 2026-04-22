const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3002;
const MUSIC_DIR = path.join(__dirname + '/music');

app.get('/api/health', (req, res) => {
  res.json({
    estado: 'correcto',
    fecha: new Date().toISOString(),
    uptime: process.uptime(),
    servicio: 'AeroCigarro API',
    version: '1.0.0',
  });
});

app.get('/api/music/play/:nombre', (req, res) => {
  const nombre = req.params.nombre.charAt(0).toUpperCase() + req.params.nombre.slice(1);
  const filePath = path.join(MUSIC_DIR, nombre + '.mp3');

  if (!filePath.startsWith(MUSIC_DIR)) {
    return res.status(400).json({ error: 'Nombre de archivo inválido' });
  }

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: `Archivo '${nombre}' no encontrado` });
  }

  res.download(filePath, nombre);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`AeroCigarro API corriendo en http://0.0.0.0:${PORT}`);
});
