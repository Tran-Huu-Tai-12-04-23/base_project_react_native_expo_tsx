export interface IEnvConfig {
    host: string,
    apikey: string,
    hostAuth: string,
    hostMedia: string,
    appSecret: {
        android: string,
        ios: string
    }
}
export interface IAppEnv {
    release: IEnvConfig;
    debug: IEnvConfig;
}
export const ENV_BUIL_DAPP = {
    production: "release",
    development: "debug",
}