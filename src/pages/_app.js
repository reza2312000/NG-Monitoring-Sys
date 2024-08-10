import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";
import { StateBasketContextProvider } from "@/context/StateBasketContext";
import { ToggleFunctionContextProvider } from "@/context/ToggleFunctionContext";
import { DataControllerContextProvider } from "@/context/DataControllerContext";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <StateBasketContextProvider>
        <DataControllerContextProvider>
          <ToggleFunctionContextProvider>
            <Navbar />
            <Component {...pageProps} />
          </ToggleFunctionContextProvider>
        </DataControllerContextProvider>
      </StateBasketContextProvider>
    </SessionProvider>
  );
}
