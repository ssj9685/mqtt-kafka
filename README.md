# mqtt kafka

## usage

```javascript
import aedes from "aedes";
import mqttKafka from "./mqttKafka.js";
import net from "net";

const mqttHost = "mqtt://jxq.kr:1884";
const kafkaBrokers = ["jxq.kr:9092"];

const mqttBroker = net.createServer(aedes.handle);
mqttBroker.listen(1884, () => console.log("mqttBroker on 1884"));

mqttKafka(mqttHost, kafkaBrokers, "temperature");
mqttKafka(mqttHost, kafkaBrokers, "test");
```
