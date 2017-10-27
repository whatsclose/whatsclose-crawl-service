import NATS from 'nats';

const nats = NATS.connect('nats://ruser:T0pS3cr3t@nats:4222');
// const nats = NATS.connect()

export function initialize() {
    console.log('Entered in init function');
    // Simple Publisher
    nats.publish('foo', 'Hello World!');

    // Simple Subscriber
    nats.subscribe('foo', (msg) => {
        console.log(`Received a message: ${msg}`);
    });
}
