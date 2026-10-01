function normalizeBaseUrl(value) {
  return value.trim().replace(/\/+$/, "");
}

const apiBaseUrl = normalizeBaseUrl(process.env.NEXT_PUBLIC_API_BASE_URL ?? "");
const useMockApi = process.env.NEXT_PUBLIC_USE_MOCK_API === "true";

export const env = {
  apiBaseUrl,
  useMockApi
};

export function getApiBaseUrl() {
  return env.apiBaseUrl;
}
