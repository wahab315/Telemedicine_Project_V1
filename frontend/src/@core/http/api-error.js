export class ApiClientError extends Error {
  constructor(apiError) {
    super(apiError.message);
    this.name = "ApiClientError";
    this.apiError = apiError;
  }
}

export function isApiError(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  return typeof value.code === "string" && typeof value.message === "string";
}
