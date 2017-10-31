import envalid from 'envalid';

const config = envalid.cleanEnv(process.env, {
    NODE_ENV: envalid.str({ choices: [`development`, `production`, `test`, `provision`] }),
});

export default config;
