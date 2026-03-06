import "@/src/styles/index.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "../context/AuthContext";
import ContextProvider from "../context/ContextProvider";


if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}


export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ContextProvider>
        <Component {...pageProps} />
        <ToastContainer position="top-right" autoClose={3000} />
      </ContextProvider>
    </AuthProvider>
  );
}
