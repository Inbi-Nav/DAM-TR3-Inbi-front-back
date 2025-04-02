const axios = require('axios');

let serviceStatus = {
  auth: true,
  game: true,
  stats: true
};

function logToMongo({ type, message, userId = null }) {
  axios.post('http://localhost:4001/logs', {
    type,
    message,
    userId
  }).catch(err => console.error('Error guardando log:', err.message));
}

function toggleService(serviceName, enabled, userId = null) {
  if (serviceStatus.hasOwnProperty(serviceName)) {
    serviceStatus[serviceName] = enabled;
    console.log(`🔁 Servicio ${serviceName} ${enabled ? 'activado' : 'desactivado'}`);

    logToMongo({
      type: 'control',
      message: `Servicio '${serviceName}' ${enabled ? 'activado' : 'desactivado'}`,
      userId
    });
  }
}

function isServiceEnabled(serviceName) {
  return serviceStatus[serviceName] !== false;
}

module.exports = {
  toggleService,
  isServiceEnabled
};
