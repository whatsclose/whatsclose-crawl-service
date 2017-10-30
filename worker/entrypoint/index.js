import config from 'config/index';
import NATS from 'nats';

const natsURL = `nats://${config.NATS_USER}:${config.NATS_PASSWORD}@${config.NATS_HOST}:${config.NATS_PORT}`;
const nats = NATS.connect(natsURL);

export default function initialize() {
    console.log(`Entered in init function`);
    // Simple Publisher
    nats.publish(`foo`, `Hello World!`);

    // Simple Subscriber
    nats.subscribe(`foo`, (msg) => {
        console.log(`Received a message: ${msg}`);
    });
}
