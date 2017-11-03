import envalid from 'envalid';

const config = envalid.cleanEnv(process.env, {
    NATS_HOST: envalid.host({ devDefault: `nats` }),
    NATS_PORT: envalid.port({ devDefault: 4222 }),

    NATS_USER: envalid.str(),
    NATS_PASSWORD: envalid.str(),
    NATS_PROTOBUF_ENABLED: envalid.bool({ default: false }),
});

export default config;
