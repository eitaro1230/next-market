import Footer from "@/components/footer";
import Header from "@/components/header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="container">
      <Header></Header>
      <Component {...pageProps} />
      <Footer></Footer>
    </div>
  );
}
