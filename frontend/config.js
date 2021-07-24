import getConfig from "next/config";

const {publicRuntimeConfig} = getConfig()

export const API = publicRuntimeConfig.PRODUCTION ? 'https://seoblog.com/':'http://127.0.0.1:8000/api';
export const APP_NAME = publicRuntimeConfig.APP_NAME;