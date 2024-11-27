const http = require('http');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const estanciaRoutes = require('../routes/estanciaRoutes');
const reservaRoutes = require('../routes/reservaRoutes');
const pagoRoutes = require('../routes/pagoRoutes');
const usuarioRoutes = require('../routes/usuarioRoutes');
const reporteRoutes = require('../routes/reporteRoutes');

let httpServer;
const port = process.env.HTTP_PORT || 3000;

function initialize() {
  return new Promise((resolve, reject) => {
    const app = express();
    httpServer = http.createServer(app);

    app.use(morgan('combined'));
    app.use(express.json());
    app.use(cors());
    app.use('/estancias', estanciaRoutes);
    app.use('/reservas', reservaRoutes);
    app.use('/pagos', pagoRoutes);
    app.use('/usuarios', usuarioRoutes);
    app.use('/reporte', reporteRoutes);

    httpServer.listen(port, err => {
      if (err) {
        reject(err);
        return;
      }

      console.log(`Servidor web escuchando en localhost:${port}`);

      resolve();
    });
  });
}

function close() {
  return new Promise((resolve, reject) => {
    httpServer.close((err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
}

module.exports.initialize = initialize;
module.exports.close = close;