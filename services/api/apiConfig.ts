const API_URL = 'http://10.0.0.14:3000/api';

export interface ApiConfig {
  url: string;
  timeout: number;
}

export const DEFAULT_API_CONFIG: ApiConfig = {
  url: API_URL,
  timeout: 10000,
};
