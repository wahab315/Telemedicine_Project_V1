import { getApiBaseUrl } from "@core/config/env";
import { ApiClientError } from "@core/http/api-error";
import { attachAuthInterceptor } from "@core/http/auth-interceptor";
import { toApiError } from "@core/http/error-interceptor";
import axios from "axios";

const apiBaseUrl = getApiBaseUrl();
const isNgrokApi = /ngrok(-free)?\.(app|dev|io)/i.test(apiBaseUrl);

export const httpClient = axios.create({
  baseURL: apiBaseUrl,
  timeout: 30_000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(isNgrokApi ? { "ngrok-skip-browser-warning": "true" } : {})
  }
});

httpClient.interceptors.request.use(attachAuthInterceptor);

httpClient.interceptors.response.use(
  response => response,
  error => {
    const apiClientError = new ApiClientError(toApiError(error));
    return Promise.reject(apiClientError);
  }
);
