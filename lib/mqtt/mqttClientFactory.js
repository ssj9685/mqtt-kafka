const mqtt = require("mqtt");

const createMqttClient = ({ host, onconnect }) =>
  new Promise((resolve, reject) => {
    const client = mqtt.connect(host);
    client.on("reconnect", () => console.log("try reconnect"));
    client.on("offline", () => console.log("offline"));
    client.on("disconnect", () => console.log("disconnect"));
    client.on("connect", () => {
      if (onconnect) onconnect();
      resolve(client);
    });
  });

const createSubscriber = async ({
  host,
  topic,
  onconnect = null,
  onerr,
  onmessage,
}) => {
  const client = await createMqttClient({ host, onconnect });
  client.subscribe(topic, onerr);
  client.on("message", onmessage);
  return client;
};

const createPublisher = async ({
  host,
  topic,
  onconnect = null,
  message,
  close = true,
}) => {
  const client = await createMqttClient({ host, onconnect });
  client.publish(topic, message);
  if (close) client.end();
  return client;
};

module.exports = {
  createMqttClient,
  createPublisher,
  createSubscriber,
};
