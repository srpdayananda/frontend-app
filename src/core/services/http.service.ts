import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import config from "../../config";
import { AUTH_ACCESS_TOKEN } from "../../shared/constants/auth";

export class HttpService {
  private instance: AxiosInstance | undefined;
  private options: AxiosRequestConfig;

  constructor() {
    this.options = {
      baseURL: config.apiBaseUrl,
      headers: { "Content-Type": "application/json" },
    };
  }

  private setInstance(): void {
    if (!this.instance) {
      this.instance = axios.create(this.options);
      this.instance.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
          const token = localStorage.getItem(AUTH_ACCESS_TOKEN);
          console.log("Token being used:", token); // Debugging
          config.headers.Authorization = token ? `Bearer ${token}` : "";
          config.withCredentials = true;
          return config;
        }
      );
      this.instance.interceptors.response.use((response: AxiosResponse) => {
        if (response.headers["authorization"]) {
          localStorage.setItem(
            AUTH_ACCESS_TOKEN,
            response.headers["authorization"]
          );
        }
        return response;
      });
    }
  }

  getInstance(): AxiosInstance {
    if (!this.instance) {
      this.setInstance();
    }
    return this.instance!;
  }
}
