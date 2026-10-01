"use client";

import { AppToaster } from "@core/providers/app-toaster";
import { queryClient } from "@core/providers/query-client";
import { SessionProvider } from "@core/providers/session-provider";
import { store } from "@core/store";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";

/**
 * @param {Object} props
 * @param {import("react").ReactNode} props.children
 * @param {import("react").ReactNode} [props.overlays]
 */
export function AppProviders({ children, overlays }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          {children}
          {overlays}
        </SessionProvider>
        <AppToaster />
        {process.env.NODE_ENV === "development" ? (
          <ReactQueryDevtools initialIsOpen={false} />
        ) : null}
      </QueryClientProvider>
    </Provider>
  );
}
