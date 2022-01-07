const { Kafka } = require("kafkajs");

const connectKafkaProducer = async ({ clientId, brokers }) => {
  const kafka = new Kafka({ clientId, brokers });
  const producer = kafka.producer();
  await producer.connect();
  return producer;
};

const createProducer = async ({ clientId, brokers, topic, messages }) => {
  const producer = await connectKafkaProducer({ clientId, brokers });
  console.log(topic, messages);
  if (topic && messages) {
    const msg = [];
    for (const message of messages) {
      msg.push({ value: message });
    }
    console.log(msg);
    await producer.send({
      topic,
      messages: msg,
    });
  } else if ((!topic && messages) || (topic && messages)) {
    new Error("To send messages please input topic and messages");
  }
  return producer;
};

const createConsumer = async ({
  clientId,
  brokers,
  groupId,
  topic,
  onmessage = (topic, partition, message) => null,
}) => {
  const kafka = new Kafka({ clientId, brokers });
  const consumer = kafka.consumer({ groupId });
  try {
    await consumer.connect();
    console.log("consumer created");
  } catch (e) {
    console.error(e);
  }
  await consumer.subscribe({ topic });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      onmessage(topic, partition, message);
    },
  });
};

module.exports = {
  createConsumer,
  createProducer,
  connectKafkaProducer,
};
