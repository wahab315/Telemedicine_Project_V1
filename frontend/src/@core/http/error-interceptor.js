/** @typedef {"network"|"timeout"|"unauthorized"|"forbidden"|"not_found"|"validation"|"server"|"unknown"} ApiErrorCode */

/**
 * @typedef {Object} ApiError
 * @property {ApiErrorCode} code
 * @property {string} message
 * @property {number} [status]
 * @property {unknown} [details]
 */

function statusToCode(status) {
  if (status === undefined) {
    return "network";
  }
  if (status === 401) {
    return "unauthorized";
  }
  if (status === 403) {
    return "forbidden";
  }
  if (status === 404) {
    return "not_found";
  }
  if (status === 422) {
    return "validation";
  }
  if (status >= 500) {
    return "server";
  }
  return "unknown";
}

function messageFromPayload(data, fallback) {
  if (data === null || typeof data !== "object") {
    return fallback;
  }

  const record = data;

  if (typeof record.message === "string" && record.message.trim()) {
    return record.message.trim();
  }

  if (record.error !== null && typeof record.error === "object") {
    const nestedError = record.error;
    if (typeof nestedError.message === "string" && nestedError.message.trim()) {
      return nestedError.message.trim();
    }
  }

  return fallback;
}

/** @param {import("axios").AxiosError} error */
export function toApiError(error) {
  const status = error.response?.status;
  const code = error.code === "ECONNABORTED" ? "timeout" : statusToCode(status);
  const message = messageFromPayload(
    error.response?.data,
    error.message || "Request failed."
  );

  return {
    code,
    message,
    status,
    details: error.response?.data
  };
}
