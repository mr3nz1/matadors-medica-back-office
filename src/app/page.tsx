import Image from "next/image";
import Page from "./pages";
import About from "./pages/About";
import Contact from "./pages/Contact";
export default function Home() {
  return (
  <>
  <Page />
  <About/>
  <Contact/>
  </>
  );
}
