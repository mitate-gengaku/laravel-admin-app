import "@/styles/globals.css";
import { Theme } from "@radix-ui/themes";
import { Toaster } from "sonner";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Theme accentColor="sky" grayColor="gray" radius="small">
      <Component {...pageProps} />
      <Toaster position="top-right" expand={false} richColors closeButton />
    </Theme>
  );
}
