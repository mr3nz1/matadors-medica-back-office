import Image from "next/image";
import Page from "./pages";
import About from "./pages/about";
import Contact from "./pages/contact";
import Footer from "../components/footer";


export default function Home() {
  return (
  <>
  <Page />
  <About/>
  <Contact/>
  <Footer/>
  </>
  );
}
