import { Outlet } from "react-router-dom";
import Navbar from "../screen/Navbar";
import Footer from "../screen/Footer";
import { ToastProvider } from "./providers/toast-provider";

export default function Boilerplate() {
  return (
    <section className="boilerplate">
      <Navbar />
      <Outlet />
      <Footer />
      <ToastProvider />
    </section>
  );
}
