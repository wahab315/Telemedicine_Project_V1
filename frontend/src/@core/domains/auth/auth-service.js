import { env } from "@core/config/env";
import { authEndpoints } from "@core/domains/auth/auth-endpoints";
import { mapLoginResponseDataToSessionUser } from "@core/domains/auth/auth-mapper";
import { ApiClientError } from "@core/http/api-error";
import { httpClient } from "@core/http/client";

const INVALID_CREDENTIALS_MESSAGE = "Invalid email or password.";
const UNABLE_TO_REACH_SERVER_MESSAGE =
  "Unable to reach the server. Check your connection and try again.";
const DEFAULT_FORGOT_PASSWORD_ERROR =
  "Unable to send reset link. Please try again.";
const DEFAULT_VERIFY_TOKEN_ERROR = "This reset link is invalid or has expired.";
const DEFAULT_RESET_PASSWORD_ERROR =
  "Unable to update password. Please try again.";
const MOCK_AUTH_EMAIL = "you@example.com";

/**
 * @typedef {Object} LoginRequestDto
 * @property {string} email
 * @property {string} password
 */

/**
 * @typedef {Object} ForgotPasswordRequestDto
 * @property {string} email
 */

/**
 * @typedef {Object} VerifyResetPasswordTokenRequestDto
 * @property {string} token
 */

/**
 * @typedef {Object} ResetPasswordRequestDto
 * @property {string} token
 * @property {string} password
 * @property {string} confirmPassword
 */

/**
 * @typedef {Object} LoginResultOk
 * @property {true} ok
 * @property {import("@core/models/session-user").SessionUser} user
 * @property {string} token
 */

/**
 * @typedef {Object} LoginResultFail
 * @property {false} ok
 * @property {"invalid_credentials"|"request_failed"} code
 * @property {string} message
 */

/** @typedef {LoginResultOk|LoginResultFail} LoginResult */

/**
 * @typedef {Object} AuthRequestResultOk
 * @property {true} ok
 */

/**
 * @typedef {Object} AuthRequestResultFail
 * @property {false} ok
 * @property {"validation"|"invalid_token"|"request_failed"} code
 * @property {string} message
 */

/** @typedef {AuthRequestResultOk|AuthRequestResultFail} AuthRequestResult */

/**
 * @typedef {Object} ResetPasswordVerifyDataDto
 * @property {string} [email]
 */

/**
 * @typedef {Object} ResetPasswordVerifyResultOk
 * @property {true} ok
 * @property {string} message
 * @property {ResetPasswordVerifyDataDto} data
 */

/**
 * @typedef {Object} ResetPasswordVerifyResultFail
 * @property {false} ok
 * @property {ResetPasswordVerifyErrorCode} code
 * @property {string} message
 * @property {ResetPasswordVerifyDataDto} data
 */

/** @typedef {ResetPasswordVerifyResultOk|ResetPasswordVerifyResultFail} ResetPasswordVerifyResult */

/** @typedef {ResetPasswordVerifyErrorCode} ResetPasswordResultFailCode */

/**
 * @typedef {Object} ResetPasswordResultOk
 * @property {true} ok
 */

/**
 * @typedef {Object} ResetPasswordResultFail
 * @property {false} ok
 * @property {ResetPasswordVerifyErrorCode} code
 * @property {string} message
 */

/** @typedef {ResetPasswordResultOk|ResetPasswordResultFail} ResetPasswordResult */

/** @typedef {"invalid_reset_token"|"reset_token_used"|"reset_token_expired"|"validation"|"invalid_request_body"|"internal_server_error"|"request_failed"} ResetPasswordVerifyErrorCode */

function loginFailureFromPayload(data) {
  if (data === null || typeof data !== "object") {
    return null;
  }

  const record = data;
  if (
    record.success !== false ||
    record.error === null ||
    typeof record.error !== "object"
  ) {
    return null;
  }

  const apiError = record.error;
  const message =
    typeof apiError.message === "string" && apiError.message.trim()
      ? apiError.message.trim()
      : INVALID_CREDENTIALS_MESSAGE;

  if (apiError.code === "invalid_credentials") {
    return { code: "invalid_credentials", message };
  }

  return { code: "request_failed", message };
}

/** @param {ApiClientError} error */
function loginFailureMessage(error) {
  const fromPayload = loginFailureFromPayload(error.apiError.details);
  if (fromPayload) {
    return fromPayload;
  }

  if (
    error.apiError.code === "unauthorized" ||
    error.apiError.code === "validation" ||
    error.apiError.status === 401 ||
    error.apiError.status === 422
  ) {
    return {
      code: "invalid_credentials",
      message: error.apiError.message || INVALID_CREDENTIALS_MESSAGE
    };
  }

  if (error.apiError.code === "network" || error.apiError.code === "timeout") {
    return {
      code: "request_failed",
      message: UNABLE_TO_REACH_SERVER_MESSAGE
    };
  }

  return {
    code: "request_failed",
    message: error.apiError.message || "Sign in failed. Please try again."
  };
}

/** @param {unknown} data @param {string} fallbackMessage */
function authActionFailureFromPayload(data, fallbackMessage) {
  if (data === null || typeof data !== "object") {
    return null;
  }

  const record = data;
  if (record.success !== false) {
    return null;
  }

  const apiError =
    record.error !== null && typeof record.error === "object"
      ? record.error
      : null;

  const message =
    typeof record.message === "string" && record.message.trim()
      ? record.message.trim()
      : typeof apiError?.message === "string" && apiError.message.trim()
        ? apiError.message.trim()
        : fallbackMessage;

  const errorCode =
    typeof apiError?.code === "string" ? apiError.code : undefined;

  if (
    errorCode === "invalid_token" ||
    errorCode === "token_expired" ||
    errorCode === "expired_token"
  ) {
    return { code: "invalid_token", message };
  }

  if (errorCode === "validation") {
    return { code: "validation", message };
  }

  return { code: "request_failed", message };
}

/** @param {ApiClientError} error @param {string} fallbackMessage */
function authActionFailureMessage(error, fallbackMessage) {
  const fromPayload = authActionFailureFromPayload(
    error.apiError.details,
    fallbackMessage
  );
  if (fromPayload) {
    return fromPayload;
  }

  if (error.apiError.code === "validation" || error.apiError.status === 422) {
    return {
      code: "validation",
      message: error.apiError.message || fallbackMessage
    };
  }

  if (
    error.apiError.code === "unauthorized" ||
    error.apiError.status === 401 ||
    error.apiError.status === 404
  ) {
    return {
      code: "invalid_token",
      message: error.apiError.message || fallbackMessage
    };
  }

  if (error.apiError.code === "network" || error.apiError.code === "timeout") {
    return {
      code: "request_failed",
      message: UNABLE_TO_REACH_SERVER_MESSAGE
    };
  }

  return {
    code: "request_failed",
    message: error.apiError.message || fallbackMessage
  };
}

/** @param {string} endpoint @param {Record<string, unknown>} payload @param {string} fallbackMessage */
async function postAuthAction(endpoint, payload, fallbackMessage) {
  try {
    const response = await httpClient.post(endpoint, payload);
    const body = response.data;

    if (!body.success) {
      const failure = authActionFailureFromPayload(body, fallbackMessage) ?? {
        code: "request_failed",
        message: fallbackMessage
      };

      return { ok: false, ...failure };
    }

    return { ok: true };
  } catch (error) {
    if (error instanceof ApiClientError) {
      const failure = authActionFailureMessage(error, fallbackMessage);
      return { ok: false, ...failure };
    }

    return {
      ok: false,
      code: "request_failed",
      message: fallbackMessage
    };
  }
}

function mapResetPasswordVerifyData(data) {
  if (data === null || typeof data !== "object") {
    return {};
  }

  const record = data;
  const email = typeof record.email === "string" ? record.email.trim() : "";

  return email ? { email } : {};
}

/** @param {unknown} data @param {string} fallbackMessage */
function resetPasswordVerifyFailureFromPayload(data, fallbackMessage) {
  if (data === null || typeof data !== "object") {
    return null;
  }

  const record = data;
  if (record.success !== false) {
    return null;
  }

  const apiError =
    record.error !== null && typeof record.error === "object"
      ? record.error
      : null;

  const message =
    typeof record.message === "string" && record.message.trim()
      ? record.message.trim()
      : typeof apiError?.message === "string" && apiError.message.trim()
        ? apiError.message.trim()
        : fallbackMessage;

  const errorCode =
    typeof apiError?.code === "string" ? apiError.code : undefined;
  const dataPayload = mapResetPasswordVerifyData(record.data);

  if (errorCode === "invalid_reset_token") {
    return { code: "invalid_reset_token", message, data: dataPayload };
  }
  if (errorCode === "reset_token_used") {
    return { code: "reset_token_used", message, data: dataPayload };
  }
  if (errorCode === "reset_token_expired") {
    return { code: "reset_token_expired", message, data: dataPayload };
  }
  if (errorCode === "validation_error" || errorCode === "validation") {
    return { code: "validation", message, data: dataPayload };
  }
  if (errorCode === "invalid_request_body") {
    return { code: "invalid_request_body", message, data: dataPayload };
  }
  if (errorCode === "internal_server_error") {
    return { code: "internal_server_error", message, data: dataPayload };
  }
  if (
    errorCode === "invalid_token" ||
    errorCode === "token_expired" ||
    errorCode === "expired_token"
  ) {
    return { code: "invalid_reset_token", message, data: dataPayload };
  }

  return { code: "request_failed", message, data: dataPayload };
}

/** @param {ApiClientError} error @param {string} fallbackMessage */
function resetPasswordVerifyFailureMessage(error, fallbackMessage) {
  const fromPayload = resetPasswordVerifyFailureFromPayload(
    error.apiError.details,
    fallbackMessage
  );
  if (fromPayload) {
    return fromPayload;
  }

  if (error.apiError.code === "validation" || error.apiError.status === 422) {
    return {
      code: "validation",
      message: error.apiError.message || fallbackMessage,
      data: {}
    };
  }

  if (
    error.apiError.code === "unauthorized" ||
    error.apiError.status === 401 ||
    error.apiError.status === 404
  ) {
    return {
      code: "invalid_reset_token",
      message: error.apiError.message || fallbackMessage,
      data: {}
    };
  }

  if (error.apiError.code === "network" || error.apiError.code === "timeout") {
    return {
      code: "request_failed",
      message: UNABLE_TO_REACH_SERVER_MESSAGE,
      data: {}
    };
  }

  return {
    code: "request_failed",
    message: error.apiError.message || fallbackMessage,
    data: {}
  };
}

/** @param {LoginRequestDto} input */
export async function login(input) {
  if (env.useMockApi) {
    const email = input.email.trim();
    const password = input.password;

    if (!email || !password) {
      return {
        ok: false,
        code: "invalid_credentials",
        message: INVALID_CREDENTIALS_MESSAGE
      };
    }

    const user = mapLoginResponseDataToSessionUser({
      token: "mock-token",
      user: {
        id: "mock-user",
        email,
        role: "patient",
        displayName: email.split("@")[0] || "User"
      }
    });

    if (!user) {
      return {
        ok: false,
        code: "request_failed",
        message: "Sign in failed due to an unexpected server response."
      };
    }

    return { ok: true, user, token: "mock-token" };
  }

  try {
    const response = await httpClient.post(authEndpoints.login, {
      email: input.email.trim(),
      password: input.password
    });

    const payload = response.data;
    if (!payload.success) {
      const failure = loginFailureFromPayload(payload) ?? {
        code: "invalid_credentials",
        message: INVALID_CREDENTIALS_MESSAGE
      };

      return { ok: false, ...failure };
    }

    const user = mapLoginResponseDataToSessionUser(payload.data);
    if (!user) {
      return {
        ok: false,
        code: "request_failed",
        message: "Sign in failed due to an unexpected server response."
      };
    }

    return {
      ok: true,
      user,
      token: payload.data.token
    };
  } catch (error) {
    if (error instanceof ApiClientError) {
      const failure = loginFailureMessage(error);
      return { ok: false, ...failure };
    }

    return {
      ok: false,
      code: "request_failed",
      message: "Sign in failed. Please try again."
    };
  }
}

/** @param {ForgotPasswordRequestDto} input */
export async function forgotPassword(input) {
  if (env.useMockApi) {
    if (!input.email.trim()) {
      return {
        ok: false,
        code: "validation",
        message: "Enter a valid email"
      };
    }

    return { ok: true };
  }

  return postAuthAction(
    authEndpoints.forgotPassword,
    { email: input.email.trim() },
    DEFAULT_FORGOT_PASSWORD_ERROR
  );
}

/** @param {VerifyResetPasswordTokenRequestDto} input */
export async function verifyResetPasswordToken(input) {
  if (env.useMockApi) {
    const token = input.token.trim().toLowerCase();

    if (!token) {
      return {
        ok: false,
        code: "validation",
        message: "token: Token is empty.",
        data: {}
      };
    }

    if (token === "used") {
      return {
        ok: false,
        code: "reset_token_used",
        message: "This reset link has already been used.",
        data: { email: MOCK_AUTH_EMAIL }
      };
    }

    if (token === "expired") {
      return {
        ok: false,
        code: "reset_token_expired",
        message: "This reset link has expired.",
        data: { email: MOCK_AUTH_EMAIL }
      };
    }

    if (token === "invalid") {
      return {
        ok: false,
        code: "invalid_reset_token",
        message: "Invalid reset link.",
        data: { email: MOCK_AUTH_EMAIL }
      };
    }

    return {
      ok: true,
      message: "Reset token is valid.",
      data: { email: MOCK_AUTH_EMAIL }
    };
  }

  try {
    const response = await httpClient.post(authEndpoints.resetPasswordVerify, {
      token: input.token
    });

    const body = response.data;
    if (!body.success) {
      const failure = resetPasswordVerifyFailureFromPayload(
        body,
        DEFAULT_VERIFY_TOKEN_ERROR
      ) ?? {
        code: "request_failed",
        message: DEFAULT_VERIFY_TOKEN_ERROR,
        data: {}
      };

      return { ok: false, ...failure };
    }

    return {
      ok: true,
      message:
        typeof body.message === "string" && body.message.trim()
          ? body.message.trim()
          : "Reset token is valid.",
      data: mapResetPasswordVerifyData(body.data)
    };
  } catch (error) {
    if (error instanceof ApiClientError) {
      const failure = resetPasswordVerifyFailureMessage(
        error,
        DEFAULT_VERIFY_TOKEN_ERROR
      );
      return { ok: false, ...failure };
    }

    return {
      ok: false,
      code: "request_failed",
      message: DEFAULT_VERIFY_TOKEN_ERROR,
      data: {}
    };
  }
}

/** @param {ResetPasswordRequestDto} input */
export async function resetPassword(input) {
  if (env.useMockApi) {
    const token = input.token.trim().toLowerCase();

    if (!token) {
      return {
        ok: false,
        code: "validation",
        message: "token: Token is empty."
      };
    }

    if (token === "used") {
      return {
        ok: false,
        code: "reset_token_used",
        message: "This reset link has already been used."
      };
    }

    if (token === "expired") {
      return {
        ok: false,
        code: "reset_token_expired",
        message: "This reset link has expired."
      };
    }

    if (token === "invalid") {
      return {
        ok: false,
        code: "invalid_reset_token",
        message: "Invalid reset link."
      };
    }

    if (input.password !== input.confirmPassword) {
      return {
        ok: false,
        code: "validation",
        message: "Passwords must match"
      };
    }

    return { ok: true };
  }

  try {
    const response = await httpClient.post(authEndpoints.resetPassword, {
      token: input.token,
      password: input.password,
      confirmPassword: input.confirmPassword
    });

    const body = response.data;
    if (!body.success) {
      const failure = resetPasswordVerifyFailureFromPayload(
        body,
        DEFAULT_RESET_PASSWORD_ERROR
      ) ?? {
        code: "request_failed",
        message: DEFAULT_RESET_PASSWORD_ERROR,
        data: {}
      };

      return {
        ok: false,
        code: failure.code,
        message: failure.message
      };
    }

    return { ok: true };
  } catch (error) {
    if (error instanceof ApiClientError) {
      const failure = resetPasswordVerifyFailureMessage(
        error,
        DEFAULT_RESET_PASSWORD_ERROR
      );
      return {
        ok: false,
        code: failure.code,
        message: failure.message
      };
    }

    return {
      ok: false,
      code: "request_failed",
      message: DEFAULT_RESET_PASSWORD_ERROR
    };
  }
}
