interface IConfig {
    apiBaseUrl: string;
  }
  const config: IConfig = {
    apiBaseUrl: import.meta.env.VITE_APP_API_BASE_URL || '',
  };
  
  export default config;
  