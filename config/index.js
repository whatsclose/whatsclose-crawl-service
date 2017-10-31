import serviceConfig from './crawl-service-worker';
import commonConfig from './components/common';
import loggerConfig from './components/logger';
import natsConfig from './components/nats';

const config = Object.assign({}, serviceConfig, commonConfig, loggerConfig, natsConfig);

export default config;
