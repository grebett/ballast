import { ApisauceInstance, create, ApiResponse } from 'apisauce';
import { getGeneralApiProblem } from './api-problem';
import { DEFAULT_API_CONFIG } from './api-config';
// import * as Types from './api.types';

const config = DEFAULT_API_CONFIG;

type Api = {
  api: ApisauceInstance | null;
  setup: () => void;
};

export const apiSauce: Api = {
  api: null,
  setup: function () {
    this.api = create({
      baseURL: config.url,
      timeout: config.timeout,
      headers: {
        Accept: 'application/json',
      },
    });
  },
};
