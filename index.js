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

app.get('/api/music/play/:nombremusica', (req, res) => {
  const { nombremusica } = req.params;
  const filePath = path.join(MUSIC_DIR, nombremusica);

  if (!filePath.startsWith(MUSIC_DIR)) {
    return res.status(400).json({ error: 'Nombre de archivo inválido' });
  }

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: `Archivo '${nombremusica}' no encontrado` });
  }

  res.download(filePath, nombremusica);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`AeroCigarro API corriendo en http://0.0.0.0:${PORT}`);
});
