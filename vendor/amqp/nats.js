import config from 'config/index';
import NATS from 'nats';
import serializer from 'vendor/serializer/index';

const natsAdapter = function () {
    this.nats = null;

    return {
        connect() {
            this.nats = NATS.connect({
                url: `nats://${config.NATS_HOST}:${config.NATS_PORT}`,
                user: config.NATS_USER,
                pass: config.NATS_PASSWORD,
                preserveBuffers: config.NATS_PROTOBUF_ENABLED,
            });
            return this.nats;
        },
        disconnect() {
            return this.nats.close();
        },
        publish(channel, message) {
            serializer.serialize(message)
                .then((buffer) => {
                    this.nats.publish(channel, buffer);
                });
        },
        subscribe(channel, callback) {
            this.nats.subscribe(channel, (msg) => {
                serializer.deSerialize(msg)
                    .then((message) => {
                        callback(message);
                    });
            });
        },
    };
};

export default Object.assign(natsAdapter(), {
    CHANNEL: {
        foo: `foo`,
    },
});

