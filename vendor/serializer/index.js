import config from 'config/index';
import protobuf from './protobuf';
import straight from './straight';

const serializer = function () {
    if (config.NATS_PROTOBUF_ENABLED) {
        return protobuf;
    }
    return straight;
};

export default serializer();
