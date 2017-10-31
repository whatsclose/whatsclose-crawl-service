import logger from 'vendor/logger/index';
import amqp from 'vendor/amqp/index';
import protobuf from 'protobufjs';

/* function* loadProto() {
    const root = yield protobuf.load(`vendor/protobuf/message.proto`);

    const payload = {
        id: `1`,
        message: `Hello World from PROTO-World`,
    };

    logger.debug(`TEST FGE : ${JSON.stringify(root)}`);


    const CrawlMessage = root.lookupType(`crawl.CrawlMessage`);


    // Verify the payload if necessary (i.e. when possibly incomplete or invalid)
    const errMsg = CrawlMessage.verify(payload);
    if (errMsg) { throw Error(errMsg); }

    // Create a new message
    const message = CrawlMessage.create(payload);

    const buffer = CrawlMessage.encode(message).finish();

    logger.debug(`Connecting`);
    amqp.connect();

    logger.debug(`Publishing`);
    amqp.publish(amqp.CHANNEL.foo, buffer);

    logger.debug(`Subscribing`);
    amqp.subscribe(amqp.CHANNEL.foo, (msg) => {
        const decodedMessage = CrawlMessage.decode(msg);
        logger.info(`Received a message: ${JSON.stringify(decodedMessage)}`);
    });
    return `done`;


    // .catch((error) => {
    //     // oops, mom don't buy it
    //     logger.error.log(`LoadProto error : ${error}`);
    //     // output: 'mom is not happy'
    // });
}

const tmp = loadProto();

logger.debug(`01...${JSON.stringify(tmp.next())}`);
logger.debug(`02...${JSON.stringify(tmp.next())}`);
logger.debug(`03...`); */

function loadProto() {
    protobuf.load(`vendor/protobuf/message.proto`)
        .then((root) => {
            const payload = {
                id: `1`,
                message: `Hello World from PROTO-World`,
            };

            const CrawlMessage = root.lookupType(`crawl.CrawlMessage`);

            // Verify the payload if necessary (i.e. when possibly incomplete or invalid)
            const errMsg = CrawlMessage.verify(payload);
            if (errMsg) { throw Error(errMsg); }

            // Create a new message
            const message = CrawlMessage.create(payload);

            const buffer = CrawlMessage.encode(message).finish();

            logger.debug(`Connecting`);
            amqp.connect();

            logger.debug(`Publishing`);
            amqp.publish(amqp.CHANNEL.foo, buffer);

            logger.debug(`Subscribing`);
            amqp.subscribe(amqp.CHANNEL.foo, (msg) => {
                const decodedMessage = CrawlMessage.decode(msg);
                logger.info(`Received a message: ${JSON.stringify(decodedMessage)}`);
            });
            return `done`;
        })
        .catch((error) => {
            // oops, mom don't buy it
            logger.error.log(`LoadProto error : ${error}`);
            // output: 'mom is not happy'
        });
}

loadProto();


/* process.on(`SIGINT`, () => {
    logger.debug(`SIGINT Gracefully closing queue`);
    amqp.disconnect();
    process.exit();
});

process.on(`SIGTERM`, () => {
    logger.debug(`SIGTERM Gracefully closing queue`);
    amqp.disconnect();
    process.exit();
}); */
