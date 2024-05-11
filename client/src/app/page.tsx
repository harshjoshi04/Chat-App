import Home from "@/pages/Home/Home";
import ModalProvider from "@/provider/ModalProvider";

export default function page() {
  return (
    <>
      <Home />
      <ModalProvider />
    </>
  );
}
