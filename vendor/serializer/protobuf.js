import logger from 'vendor/logger/index';
import protobufjs from 'protobufjs';

const protobuf = function () {
    return {
        serialize(payload) {
            logger.debug(`Protobuf.serialize()`);
            return new Promise((resolve, reject) => {
                protobufjs.load(`vendor/serializer/message.proto`)
                    .then((root) => {
                        const CrawlMessage = root.lookupType(`crawl.CrawlMessage`);

                        // Verify the payload if necessary (i.e. when possibly
                        // incomplete or invalid)
                        const errMsg = CrawlMessage.verify(payload);
                        if (errMsg) { throw Error(errMsg); }

                        // Create a new message
                        const rawMessage = CrawlMessage.create(payload);
                        const buffer = CrawlMessage.encode(rawMessage).finish();

                        resolve(buffer);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        deSerialize(buffer) {
            logger.debug(`Protobuf.deSerialize() - buffer size:${buffer.length}`);
            return new Promise((resolve, reject) => {
                protobufjs.load(`vendor/serializer/message.proto`)
                    .then((root) => {
                        const CrawlMessage = root.lookupType(`crawl.CrawlMessage`);
                        const message = CrawlMessage.decode(buffer);
                        resolve(message);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
    };
};

export default protobuf();
