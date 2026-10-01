"use client";

import { authKeys } from "@core/domains/auth/auth-keys";
import {
  forgotPassword,
  login,
  resetPassword,
  verifyResetPasswordToken
} from "@core/domains/auth/auth-service";
import {
  getAuthToken,
  saveAuthToken,
  saveSessionUser
} from "@core/session/session-storage";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: authKeys.login(),
    mutationFn: async input => login(input),
    onSuccess: async result => {
      if (!result.ok) {
        return;
      }

      saveAuthToken(result.token);
      saveSessionUser(result.user);
      queryClient.removeQueries({ queryKey: authKeys.session() });
    }
  });
}

export function useForgotPasswordMutation() {
  return useMutation({
    mutationKey: authKeys.forgotPassword(),
    mutationFn: async input => forgotPassword(input)
  });
}

export function useVerifyResetPasswordTokenMutation() {
  return useMutation({
    mutationKey: authKeys.resetPasswordVerify(),
    mutationFn: async input => verifyResetPasswordToken(input)
  });
}

export function useResetPasswordMutation() {
  return useMutation({
    mutationKey: authKeys.resetPassword(),
    mutationFn: async input => resetPassword(input)
  });
}

/** @param {import("@tanstack/react-query").QueryClient} queryClient */
export function clearClientAuthQueries(queryClient) {
  queryClient.removeQueries({ queryKey: authKeys.all });
}

export function useAuthSessionEnabled() {
  return typeof window !== "undefined" ? Boolean(getAuthToken()) : false;
}
