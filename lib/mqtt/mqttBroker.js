const aedes = require("aedes")();
const mqttBroker = require("net").createServer(aedes.handle);

const createMqttBroker = (port, callback) =>
  mqttBroker.listen(mqttBrokerPort, callback);

module.exports = mqttBroker;
