const { connectKafkaProducer } = require("./lib/kafka/kafkaClientFactory");
const { createSubscriber } = require("./lib/mqtt/mqttClientFactory");

async function mqttKafka(host, brokers, topic) {
  const producer = await connectKafkaProducer({ clientId: topic, brokers });
  createSubscriber({
    host,
    topic,
    onerr: (err) => (err ? console.log(err) : console.log("subscribe success")),
    onmessage: (topic, message) => {
      message = message.toString("utf8");
      console.log(topic, message);
      producer.send({
        topic,
        messages: [{ value: message }],
      });
    },
  });
}

module.exports = mqttKafka;
