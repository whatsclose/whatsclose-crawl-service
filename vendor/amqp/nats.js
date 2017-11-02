import config from 'config/index';
import NATS from 'nats';

const natsAdapter = function () {
    this.nats = null;

    return {
        connect() {
            this.nats = NATS.connect({
                url: `nats://${config.NATS_HOST}:${config.NATS_PORT}`,
                user: config.NATS_USER,
                pass: config.NATS_PASSWORD,
                preserveBuffers: true,
            });
            return this.nats;
        },
        disconnect() {
            return this.nats.close();
        },
        publish(channel, message) {
            return new Promise((resolve, reject) => {
                try {
                    resolve(this.nats.publish(channel, message));
                } catch (err) {
                    reject(err);
                }
            });
            // return this.nats.publish(channel, message);
        },
        subscribe(channel, callback) {
            return this.nats.subscribe(channel, callback);
        },
    };
};

export default Object.assign(natsAdapter(), {
    CHANNEL: {
        foo: `foo`,
    },
});
