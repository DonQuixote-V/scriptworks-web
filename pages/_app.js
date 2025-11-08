import "../styles/globals.css";
import Header from "../components/Header";
import HeaderAdmin from "../components/HeaderAdmin";
import Footer from "../components/Footer";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isAdminPage = router.pathname.startsWith("/admin");

  return (
    <>
      {/* ✅ ตรวจว่าอยู่หน้า admin ไหม */}
      {isAdminPage ? <HeaderAdmin /> : <Header />}

      <AnimatePresence mode="wait">
        <motion.main
          key={router.route}
          className={`min-h-screen bg-gray-900 text-white px-4 ${
            isAdminPage ? "pt-24" : "pt-28"
          }`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <Component {...pageProps} />
        </motion.main>
      </AnimatePresence>

      {/* ❌ ไม่มี Footer ในหน้า admin */}
      {!isAdminPage && <Footer />}
    </>
  );
}
