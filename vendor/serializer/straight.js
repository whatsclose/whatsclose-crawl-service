import logger from 'vendor/logger/index';

const straight = function () {
    return {
        serialize(payload) {
            logger.debug(`Straight.serialize()`);
            return new Promise((resolve) => {
                const buffer = new Buffer.from(JSON.stringify(payload));
                resolve(buffer);
            });
        },
        deSerialize(buffer) {
            logger.debug(`Straight.deSerialize() - buffer size:${buffer.length}`);
            return new Promise((resolve) => {
                const msg = JSON.parse(buffer.toString());
                resolve(msg);
            });
        },
    };
};

export default straight();
