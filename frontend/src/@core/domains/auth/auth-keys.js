export const authKeys = {
  all: ["auth"],
  session: () => [...authKeys.all, "session"],
  login: () => [...authKeys.all, "login"],
  forgotPassword: () => [...authKeys.all, "forgot-password"],
  resetPasswordVerify: () => [...authKeys.all, "reset-password-verify"],
  resetPassword: () => [...authKeys.all, "reset-password"]
};
