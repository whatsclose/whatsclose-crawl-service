import logger from 'vendor/logger/index';
import co from 'co';
import amqp from 'vendor/amqp/index';
import protobuf from 'protobufjs';


const payload = {
    id: `1`,
    message: `Hello World from PROTO-World`,
};

protobuf.load(`vendor/protobuf/message.proto`)
    .then((root) => {
        const CrawlMessage = root.lookupType(`crawl.CrawlMessage`);

        // Verify the payload if necessary (i.e. when possibly incomplete or invalid)
        const errMsg = CrawlMessage.verify(payload);
        if (errMsg) { throw Error(errMsg); }

        // Create a new message
        const message = CrawlMessage.create(payload);

        const buffer = CrawlMessage.encode(message).finish();

        return amqp.publish(amqp.CHANNEL.foo, buffer);
    })
    .then(log){
        logger.debug(`final result = ${log}`);
    }
    .catch((error) => {
        // oops, mom don't buy it
        logger.error.log(`LoadProto error : ${error}`);
        // output: 'mom is not happy'
    });


// co(function* serializeMessage(payload) {
//     const root = yield protobuf.load(`vendor/protobuf/message.proto`);

//     const CrawlMessage = root.lookupType(`crawl.CrawlMessage`);


//     // Verify the payload if necessary (i.e. when possibly incomplete or invalid)
//     const errMsg = CrawlMessage.verify(payload);
//     if (errMsg) { throw Error(errMsg); }

//     // Create a new message
//     const message = CrawlMessage.create(payload);

//     const buffer = CrawlMessage.encode(message).finish();

//     // logger.debug(`Connecting`);
//     // amqp.connect();

//     // logger.debug(`Publishing`);
//     // amqp.publish(amqp.CHANNEL.foo, buffer);

//     // logger.debug(`Subscribing`);
//     // amqp.subscribe(amqp.CHANNEL.foo, (msg) => {
//     //     const decodedMessage = CrawlMessage.decode(msg);
//     //     logger.info(`Received a message: ${JSON.stringify(decodedMessage)}`);
//     // });
//     //
//     return `done`;


//     // .catch((error) => {
//     //     // oops, mom don't buy it
//     //     logger.error.log(`LoadProto error : ${error}`);
//     //     // output: 'mom is not happy'
//     // });
// }).catch(err => logger.error(`Protobuf error : ${err}`));

// logger.debug(`result=${result}`);

// const tmp = loadProto();
// logger.debug(`00`);
// let { value, done } = tmp.next();
// logger.debug(`01 value1=${JSON.stringify(Promise.resolve(value))} done=${done}`);

// ({ value, done } = tmp.next());
// logger.debug(`02 value2=${JSON.stringify(value)} done=${done}`);

// logger.debug(`03...`);


/* function loadProto() {
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

loadProto(); */


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
