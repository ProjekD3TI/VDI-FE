interface AppConfig {
  API_BASE_URL: string;
  REVERB_APP_KEY: string;
  REVERB_HOST: string;
  REVERB_PORT: string;
  REVERB_PORT_WSS: string;
  REVERB_SCHEME: string;
}

interface Window {
  __APP_CONFIG__: AppConfig;
}

